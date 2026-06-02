import { computed, reactive, ref } from 'vue'
import { LocalStorage } from 'quasar'
import { ALBUM_MUNDIAL_2026, type AlbumData, type AlbumSection, type AlbumSticker } from 'src/data/album_mundial_2026'
import { ALBUM_MUNDIAL_2026_VIRTUAL, VIRTUAL_PREFIX_MAP } from 'src/data/album_mundial_2026_virtual'
import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export type StickerState = 'missing' | 'owned' | 'repeated'

export interface AlbumRef {
    id: string
    name: string
}

export interface UserProfile {
    id: string
    name: string
    albums: AlbumRef[]
    createdAt?: string
}

export interface StickerPack {
    owned: number[]
    repeated: number[]
    updatedAt?: string
}

export interface PublicUserProfile {
    id: string
    name: string
    albums: AlbumRef[]
    currentAlbumId?: string
    owned?: number[]
    repeated?: number[]
    updatedAt?: string
}

export interface TradeRecord {
    id: string
    from: string
    fromName: string
    to: string
    toName?: string
    albumId: string
    offered: number[]
    wanted: number[]
    status: 'pending' | 'accepted' | 'rejected' | 'confirmed' | 'cancelled'
    createdAt: string
    respondedAt?: string
    confirmedAt?: string
}

export interface TradeInput {
    toUserId: string
    offered: number[]
    wanted: number[]
}

export interface NotificationRecord {
    id: string
    to_user_id: string
    type: 'trade_request' | 'trade_accepted' | 'trade_rejected' | 'trade_confirmed' | 'trade_cancelled'
    title: string
    message: string
    payload?: Record<string, unknown>
    read: boolean
    created_at: string
}

interface ServerUserData {
    user_id?: string
    id?: string
    name?: string
    current_album_id?: string
    owned?: number[]
    repeated?: number[]
    updated_at?: string
}
interface ServerTradeData {
    id: string
    from: string
    from_name?: string
    to: string
    to_name?: string
    album_id?: string
    offered?: number[]
    wanted?: number[]
    status: TradeRecord['status']
    created_at?: string
    responded_at?: string
    confirmed_at?: string
}

interface ServerStickerPack {
    owned?: number[]
    repeated?: number[]
    updated_at?: string
}

const DEFAULT_ALBUM_ID = 'mundial2026'
const DEFAULT_ALBUM_NAME = 'Mundial 2026'

// ── Tiempo mínimo entre sincronizaciones al servidor (ms) ──────────────────
const SYNC_DEBOUNCE_MS = 3000

export const STICKER_TYPES = {
    normal: { label: 'Normal', value: 1, color: 'grey' },
    shield: { label: 'Escudo', value: 1, color: 'blue-grey' },
    group_photo: { label: 'Foto grupal', value: 2, color: 'blue' },
    special: { label: 'Especial', value: 3, color: 'orange' },
    extra_base: { label: 'Extra Base', value: 4, color: 'purple' },
    extra_bronze: { label: 'Extra Bronce', value: 6, color: 'brown' },
    extra_silver: { label: 'Extra Plata', value: 10, color: 'blue-grey' },
    extra_gold: { label: 'Extra Oro', value: 25, color: 'amber' },
    coca: { label: 'Coca-Cola', value: 3, color: 'red' }
} as const

export const TRADE_RATIOS = [
    { from: 'Normal', to: 'Normal', ratio: '1:1', description: 'Cambio directo' },
    { from: 'Especial', to: 'Normales', ratio: '1:3', description: '1 especial = 3 normales' },
    { from: 'Extra Base', to: 'Normales', ratio: '1:4', description: 'Poco común' },
    { from: 'Extra Bronce', to: 'Extra Base', ratio: '1:2', description: '' },
    { from: 'Extra Plata', to: 'Normales', ratio: '1:10', description: 'Muy codiciada' },
    { from: 'Extra Oro', to: 'Normales', ratio: '1:25', description: 'Rarísima — negocia bien' }
] as const

// ── Helpers de almacenamiento local ───────────────────────────────────────────
function getStorageItem<T>(key: string): T | null {
    return LocalStorage.getItem(key) as unknown as T | null
}
function getStorageArray<T>(key: string): T[] {
    const v = LocalStorage.getItem(key)
    return Array.isArray(v) ? (v as T[]) : []
}
function normalizeAlbumRefs(albums: unknown): AlbumRef[] {
    if (!Array.isArray(albums)) return []

    return albums
        .map((item): AlbumRef | null => {
            if (typeof item === 'string') {
                return { id: item, name: item }
            }

            if (
                item &&
                typeof item === 'object' &&
                'id' in item &&
                'name' in item &&
                typeof (item as { id: unknown }).id === 'string' &&
                typeof (item as { name: unknown }).name === 'string'
            ) {
                return {
                    id: (item as { id: string }).id,
                    name: (item as { name: string }).name,
                }
            }

            return null
        })
        .filter((item): item is AlbumRef => item !== null)
}

// ── Store principal ───────────────────────────────────────────────────────────
export const useAlbumStore = defineStore('album', () => {

    // ── Estado reactivo ────────────────────────────────────────────────────────
    const user = ref<UserProfile | null>(null)
    const currentAlbumId = ref<string>(DEFAULT_ALBUM_ID)
    const owned = reactive(new Set<number>())
    const repeated = reactive(new Set<number>())
    const allUsers = ref<PublicUserProfile[]>([])
    const trades = ref<TradeRecord[]>([])
    const loading = ref(false)
    const initialized = ref(false)
    const serverOnline = ref(true)   // false si el servidor no responde
    const notifications = ref<NotificationRecord[]>([])

    // ── Computed ───────────────────────────────────────────────────────────────
    // const currentAlbum = computed<AlbumData>(() => ALBUM_MUNDIAL_2026)
    const currentAlbum = computed<AlbumData>(() => {
        if (currentAlbumId.value === 'mundial2026_virtual') return ALBUM_MUNDIAL_2026_VIRTUAL
        return ALBUM_MUNDIAL_2026
    })

    const totalStickers = computed(() =>
        currentAlbum.value.sections.reduce(
            (acc: number, s: AlbumSection) => acc + s.stickers.length, 0
        )
    )

    const ownedCount = computed(() => owned.size)
    const repeatedCount = computed(() => repeated.size)
    const missingCount = computed(() => totalStickers.value - owned.size)

    const completionPct = computed(() =>
        totalStickers.value ? Math.round((owned.size / totalStickers.value) * 100) : 0
    )

    const repeatedList = computed(() => [...repeated])

    const missingList = computed(() => {
        const all = currentAlbum.value.sections.flatMap((s: AlbumSection) =>
            s.stickers.map((st: AlbumSticker) => st.n)
        )
        return all.filter((n: number) => !owned.has(n))
    })

    const myPendingTrades = computed(() =>
        trades.value.filter(t => t.to === user.value?.id && t.status === 'pending')
    )

    const storageKey = computed(() =>
        `figus_${user.value?.id ?? 'guest'}_${currentAlbumId.value}`
    )

    const sectionProgress = computed(() => (sectionId: string) => {
        const section = currentAlbum.value.sections.find(s => s.id === sectionId)
        if (!section) return { owned: 0, total: 0, pct: 0 }
        const ownedInSection = section.stickers.filter(st => owned.has(st.n)).length
        const total = section.stickers.length
        return { owned: ownedInSection, total, pct: total ? Math.round((ownedInSection / total) * 100) : 0 }
    })

    // ── Almacenamiento LOCAL ───────────────────────────────────────────────────

    function loadStickers() {
        const data = getStorageItem<StickerPack>(storageKey.value)
        owned.clear()
        repeated.clear()
        if (!data) return
        for (const n of data.owned ?? []) owned.add(n)
        for (const n of data.repeated ?? []) repeated.add(n)
    }

    function saveStickersLocal() {
        LocalStorage.set(storageKey.value, {
            owned: [...owned],
            repeated: [...repeated],
            updatedAt: new Date().toISOString()
        } satisfies StickerPack)
    }

    // ── Sincronización con SERVIDOR ────────────────────────────────────────────
    // Timer para no spamear el servidor en cada tap de figurita
    let syncTimer: ReturnType<typeof setTimeout> | null = null

    function scheduleSyncToServer() {
        if (syncTimer) clearTimeout(syncTimer)
        syncTimer = setTimeout(() => {
            void syncStickersToServer()
        }, SYNC_DEBOUNCE_MS)
    }

    async function syncStickersToServer() {
        if (!user.value) return
        try {
            await api.post('?action=save_stickers', {
                user_id: user.value.id,
                album_id: currentAlbumId.value,
                owned: [...owned],
                repeated: [...repeated]
            })
            serverOnline.value = true
        } catch {
            serverOnline.value = false
        }
    }

    async function loadUsersFromServer() {
        try {
            const res = await api.get<{ success: boolean; data: PublicUserProfile[] }>(
                `?action=all_stickers&album_id=${currentAlbumId.value}`
            )
            if (res.data.success && Array.isArray(res.data.data)) {
                const serverUsers = res.data.data.map((u: ServerUserData) => ({
                    id: u.user_id ?? u.id,
                    name: u.name ?? '',
                    albums: user.value?.albums ?? [{ id: currentAlbumId.value, name: DEFAULT_ALBUM_NAME }],
                    currentAlbumId: u.current_album_id ?? currentAlbumId.value,
                    owned: u.owned ?? [],
                    repeated: u.repeated ?? [],
                    updatedAt: u.updated_at ?? null
                } as PublicUserProfile))

                allUsers.value = serverUsers
                LocalStorage.set('figus_all_users', serverUsers)
                serverOnline.value = true
            }
        } catch {
            serverOnline.value = false
            allUsers.value = getStorageArray<PublicUserProfile>('figus_all_users')
        }
    }
    async function loadNotificationsFromServer() {
        if (!user.value) return
        try {
            const res = await api.get<{ success: boolean; data: NotificationRecord[] }>(
                `?action=notifications&user_id=${user.value.id}`
            )
            if (res.data.success && Array.isArray(res.data.data)) {
                notifications.value = res.data.data
                serverOnline.value = true
            }
        } catch {
            serverOnline.value = false
        }
    }

    async function loadTradesFromServer() {
        if (!user.value) return

        try {
            const res = await api.get<{
                success: boolean
                data: ServerTradeData[]
            }>(`?action=trades&user_id=${user.value.id}`)

            if (res.data.success && Array.isArray(res.data.data)) {

                const mappedTrades: TradeRecord[] = res.data.data.map((t) => {
                    const trade: TradeRecord = {
                        id: t.id,
                        from: t.from,
                        fromName: t.from_name ?? '',
                        to: t.to,
                        toName: t.to_name ?? '',
                        albumId: t.album_id ?? currentAlbumId.value,
                        offered: Array.isArray(t.offered) ? t.offered : [],
                        wanted: Array.isArray(t.wanted) ? t.wanted : [],
                        status: t.status,
                        createdAt: t.created_at ?? new Date().toISOString()
                    }

                    if (t.responded_at) {
                        trade.respondedAt = t.responded_at
                    }

                    if (t.confirmed_at) {
                        trade.confirmedAt = t.confirmed_at
                    }

                    return trade
                })

                trades.value = mappedTrades
                LocalStorage.set('figus_trades', mappedTrades)
                serverOnline.value = true
            }
        } catch (error) {
            console.error('Error cargando intercambios:', error)

            serverOnline.value = false
            trades.value = getStorageArray<TradeRecord>('figus_trades')
        }
    }

    // ── updatePublicProfile: local + servidor ──────────────────────────────────
    function updatePublicProfileLocal() {
        if (!user.value) return

        const users = getStorageArray<PublicUserProfile>('figus_all_users')
        const albums = user.value.albums?.length
            ? user.value.albums
            : [{ id: currentAlbumId.value, name: DEFAULT_ALBUM_NAME }]

        const profile: PublicUserProfile = {
            id: user.value.id,
            name: user.value.name,
            albums,
            currentAlbumId: currentAlbumId.value,
            owned: [...owned],
            repeated: [...repeated],
            updatedAt: new Date().toISOString()
        }

        const idx = users.findIndex(u => u.id === user.value?.id)
        if (idx >= 0) users[idx] = profile
        else users.push(profile)

        LocalStorage.set('figus_all_users', users)
        allUsers.value = users
    }

    function saveStickers() {
        saveStickersLocal()
        updatePublicProfileLocal()
        scheduleSyncToServer()   // ← sube al servidor después de 3s de inactividad
    }

    // ── Inicialización ─────────────────────────────────────────────────────────
    function loadFromStorage() {
        const userData = getStorageItem<UserProfile>('figus_user')
        const storedTrades = getStorageArray<TradeRecord>('figus_trades')
        const storedUsers = getStorageArray<PublicUserProfile>('figus_all_users')

        if (userData) {
            user.value = userData
            currentAlbumId.value = userData.albums?.[0]?.id ?? DEFAULT_ALBUM_ID
            loadStickers()
        }

        if (storedTrades.length > 0) trades.value = storedTrades
        if (storedUsers.length > 0) allUsers.value = storedUsers

        initialized.value = true
    }

    // ── Auth ───────────────────────────────────────────────────────────────────
    async function registerOrLogin(name: string, albumId = DEFAULT_ALBUM_ID) {
        const safeName = name.trim()
        if (!safeName) return null

        // Intentar en servidor primero
        try {
            const res = await api.post<{ success: boolean; data: UserProfile }>(
                '?action=register',
                { name: safeName, album_id: albumId, album_name: DEFAULT_ALBUM_NAME }
            )
            if (res.data.success && res.data.data) {
                user.value = res.data.data
                serverOnline.value = true
            } else {
                throw new Error('Server returned error')
            }
        } catch {
            // Servidor no disponible: registro solo local
            serverOnline.value = false
            const users = getStorageArray<PublicUserProfile>('figus_all_users')
            const existing = users.find(u => u.name.toLowerCase() === safeName.toLowerCase())

            if (existing) {
                user.value = {
                    id: existing.id,
                    name: existing.name,
                    albums: existing.albums?.length
                        ? existing.albums
                        : [{ id: albumId, name: DEFAULT_ALBUM_NAME }]
                }
            } else {
                user.value = {
                    id: `u_${Date.now()}`,
                    name: safeName,
                    albums: [{ id: albumId, name: DEFAULT_ALBUM_NAME }],
                    createdAt: new Date().toISOString()
                }
            }
        }

        currentAlbumId.value = albumId
        LocalStorage.set('figus_user', user.value)
        loadStickers()
        updatePublicProfileLocal()
        // Subir figuritas actuales al servidor
        void syncStickersToServer()

        return user.value
    }

    function addAlbum(albumId: string, albumName: string) {
        const currentUser = user.value
        if (!currentUser) return

        if (!Array.isArray(currentUser.albums)) {
            currentUser.albums = []
        }

        const normalized = normalizeAlbumRefs(currentUser.albums)
        if (normalized.some(a => a.id === albumId)) return

        normalized.push({ id: albumId, name: albumName })
        currentUser.albums = normalized

        LocalStorage.set('figus_user', currentUser)
        updatePublicProfileLocal()
    }

    function switchAlbum(albumId: string) {
        currentAlbumId.value = albumId
        loadStickers()
    }

    function logout() {
        user.value = null
        currentAlbumId.value = DEFAULT_ALBUM_ID
        owned.clear()
        repeated.clear()
        LocalStorage.remove('figus_user')
    }

    // ── Figuritas ──────────────────────────────────────────────────────────────
    function getStickerState(n: number): StickerState {
        if (repeated.has(n)) return 'repeated'
        if (owned.has(n)) return 'owned'
        return 'missing'
    }

    function toggleSticker(n: number) {
        if (!owned.has(n)) {
            owned.add(n)
            repeated.delete(n)
        } else if (!repeated.has(n)) {
            repeated.add(n)
        } else {
            owned.delete(n)
            repeated.delete(n)
        }
        saveStickers()
    }

    function setStickerState(n: number, state: StickerState) {
        if (state === 'missing') {
            owned.delete(n)
            repeated.delete(n)
        } else if (state === 'owned') {
            owned.add(n)
            repeated.delete(n)
        } else {
            owned.add(n)
            repeated.add(n)
        }
        saveStickers()
    }

    function markRange(from: number, to: number, state: StickerState) {
        for (let n = from; n <= to; n++) setStickerState(n, state)
    }

    // ── Intercambios ───────────────────────────────────────────────────────────
    async function proposeTrade({ toUserId, offered, wanted }: TradeInput) {
        if (!user.value) return null
        if (toUserId === user.value.id) return null

        const toUser = allUsers.value.find(u => u.id === toUserId)

        try {
            const res = await api.post<{ success: boolean; data: TradeRecord }>(
                '?action=trade_request',
                {
                    from_user_id: user.value.id,
                    to_user_id: toUserId,
                    album_id: currentAlbumId.value,
                    offered,
                    wanted
                }
            )
            if (res.data.success) {
                trades.value.push(res.data.data)
                LocalStorage.set('figus_trades', trades.value)
                return res.data.data
            }
        } catch {
            // Sin servidor: guardar local
        }

        // Fallback local
        const trade: TradeRecord = {
            id: `t_${Date.now()}`,
            from: user.value.id,
            fromName: user.value.name,
            to: toUserId,
            toName: toUser?.name ?? 'Coleccionista',
            albumId: currentAlbumId.value,
            offered,
            wanted,
            status: 'pending',
            createdAt: new Date().toISOString()
        }
        trades.value.push(trade)
        LocalStorage.set('figus_trades', trades.value)
        return trade
    }

    function respondTrade(tradeId: string, accept: boolean) {
        const trade = trades.value.find(item => item.id === tradeId)
        if (!trade) return

        trade.status = accept ? 'accepted' : 'rejected'
        trade.respondedAt = new Date().toISOString()
        LocalStorage.set('figus_trades', trades.value)
    }

    function confirmTrade(tradeId: string) {
        const trade = trades.value.find(item => item.id === tradeId)
        if (!trade || trade.status !== 'accepted') return

        const iAmFrom = trade.from === user.value?.id

        if (iAmFrom) {
            trade.offered.forEach(n => { repeated.delete(n); if (!repeated.has(n)) owned.delete(n) })
            trade.wanted.forEach(n => { owned.add(n); repeated.delete(n) })
        } else {
            trade.wanted.forEach(n => { repeated.delete(n); if (!repeated.has(n)) owned.delete(n) })
            trade.offered.forEach(n => { owned.add(n); repeated.delete(n) })
        }

        trade.status = 'confirmed'
        trade.confirmedAt = new Date().toISOString()
        saveStickers()
        LocalStorage.set('figus_trades', trades.value)
    }

    function deleteTrade(tradeId: string) {
        trades.value = trades.value.filter(t => t.id !== tradeId)
        LocalStorage.set('figus_trades', trades.value)
    }

    function getOtherUserData(userId: string) {
        return allUsers.value.find(u => u.id === userId) ?? null
    }
    async function respondTradeServer(tradeId: string, accept: boolean) {
        if (!user.value) return false
        try {
            const res = await api.post('?action=trade_respond', {
                trade_id: tradeId,
                status: accept ? 'accepted' : 'rejected',
                user_id: user.value.id
            })
            return !!res.data.success
        } catch {
            return false
        }
    }

    async function finalizeTradeServer(tradeId: string, confirmed: boolean) {
        if (!user.value) return false
        try {
            const res = await api.post('?action=trade_finalize', {
                trade_id: tradeId,
                status: confirmed ? 'confirmed' : 'cancelled',
                user_id: user.value.id
            })
            return !!res.data.success
        } catch {
            return false
        }
    }

    async function cancelTradeServer(tradeId: string) {
        if (!user.value) return false
        try {
            const res = await api.post('?action=trade_cancel', {
                trade_id: tradeId,
                user_id: user.value.id
            })
            return !!res.data.success
        } catch {
            return false
        }
    }

    async function deleteTradeServer(tradeId: string) {
        if (!user.value) return false
        try {
            const res = await api.post('?action=trade_delete', {
                trade_id: tradeId,
                user_id: user.value.id
            })
            return !!res.data.success
        } catch {
            return false
        }
    }

    async function loadOwnStickersFromServer() {
        if (!user.value) return false

        try {
            const res = await api.get<{ success: boolean; data: ServerStickerPack }>(
                `?action=get_stickers&user_id=${user.value.id}&album_id=${currentAlbumId.value}`
            )

            if (res.data.success && res.data.data) {
                owned.clear()
                repeated.clear()

                for (const n of res.data.data.owned ?? []) owned.add(n)
                for (const n of res.data.data.repeated ?? []) repeated.add(n)

                saveStickersLocal()
                updatePublicProfileLocal()
                return true
            }
        } catch {
            serverOnline.value = false
        }

        return false
    }

    // ── Refrescar datos del servidor manualmente ───────────────────────────────
    async function refreshFromServer() {
        await Promise.allSettled([
            loadUsersFromServer(),
            loadTradesFromServer(),
            loadNotificationsFromServer(),
        ])
    }

    return {
        // Estado
        user, currentAlbumId, owned, repeated, allUsers, trades,
        loading, initialized, serverOnline,
        // Computed
        currentAlbum, totalStickers, ownedCount, repeatedCount,
        missingCount, completionPct, repeatedList, missingList,
        myPendingTrades, storageKey, sectionProgress, notifications,
        // Acciones
        loadFromStorage, loadStickers, saveStickers,
        updatePublicProfileLocal, registerOrLogin,
        addAlbum, switchAlbum, logout,
        getStickerState, toggleSticker, setStickerState, markRange,
        proposeTrade, respondTrade, getOtherUserData,
        refreshFromServer, syncStickersToServer, confirmTrade,
        deleteTrade, respondTradeServer, finalizeTradeServer, loadNotificationsFromServer,
        cancelTradeServer, deleteTradeServer, loadOwnStickersFromServer
    }
})

export function getStickerImgKey(sectionId: string, n: number, albumId?: string): string {
    if (albumId === 'mundial2026_virtual') {
        const prefix = VIRTUAL_PREFIX_MAP[sectionId] ?? sectionId.toUpperCase().substring(0, 3) + '_V'
        return `${prefix}_${n}`
    }
    // lógica original del físico
    const PREFIX_MAP: Record<string, string> = {
        intro: 'WC2026', sedes: 'STD',
        arg: 'ARG', bra: 'BRA', uru: 'URU', col: 'COL', ecu: 'ECU', per: 'PER',
        chi: 'CHI', ven: 'VEN', par: 'PAR', bol: 'BOL', usa: 'USA', mex: 'MEX',
        can: 'CAN', crc: 'CRC', jam: 'JAM', pan: 'PAN', hon: 'HON', slv: 'SLV',
        tto: 'TTO', esp: 'ESP', fra: 'FRA', ger: 'GER', por: 'POR', eng: 'ENG',
        ita: 'ITA', ned: 'NED', bel: 'BEL', cro: 'CRO', sui: 'SUI', mar: 'MAR',
        sen: 'SEN', egy: 'EGY', nga: 'NGA', gha: 'GHA', cmr: 'CMR', jpn: 'JPN',
        kor: 'KOR', aus: 'AUS', irn: 'IRN', ksa: 'KSA', nzl: 'NZL', nor: 'NOR',
        aut: 'AUT', gre: 'GRE', rou: 'ROU', cze: 'CZE', hun: 'HUN', sco: 'SCO',
        extra: 'EXTRA', coca: 'COCA'
    } // sin cambios
    const prefix = PREFIX_MAP[sectionId] ?? sectionId.toUpperCase().substring(0, 3)
    return `${prefix}_${n}`
}

export function enrichAlbumWithImgKeys(album: AlbumData): AlbumData {
    album.sections.forEach(section => {
        section.stickers.forEach(sticker => {
            if (!sticker.imgKey) sticker.imgKey = getStickerImgKey(section.id, sticker.n)
        })
    })
    return album
}
