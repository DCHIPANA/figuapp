import type { AlbumData } from './album_mundial_2026'

// Re-exportamos los tipos para que el virtual sea compatible
export type { AlbumSticker, AlbumSection, AlbumData } from './album_mundial_2026'

// ── Helper: crea stickers de equipo usando los n del físico ───────────────────
// startN      = mismo startN que el físico (escudo en esa posición)
// playerNs    = array de n exactos del físico para cada jugador seleccionado
// playerNames = nombres en el mismo orden que playerNs
function makeVirtualTeam(
    startN: number,
    shieldLabel: string,
    players: Array<{ n: number; name: string }>
) {
    return [
        // Escudo: mismo n que el físico
        { n: startN, label: shieldLabel, type: 'shield' as const, shortLabel: 'Escudo' },
        // Jugadores: usan los n exactos del físico
        ...players.map(p => ({
            n: p.n,
            label: p.name,
            type: 'normal' as const,
            shortLabel: p.name.split(/\s+/).filter(Boolean).slice(-1)[0] || p.name
        }))
    ]
}

export const VIRTUAL_PREFIX_MAP: Record<string, string> = {
    intro: 'WC2026',
    mex: 'MEX',
    rsa: 'RSA',
    kor: 'KOR',
    cze: 'CZE',
    can: 'CAN',
    bih: 'BIH',
    qat: 'QAT',
    sui: 'SUI',
    bra: 'BRA',
    mar: 'MAR',
    hai: 'HAI',
    sco: 'SCO',
    usa: 'USA',
    par: 'PAR',
    aus: 'AUS',
    tur: 'TUR',
    ger: 'GER',
    cuw: 'CUW',
    civ: 'CIV',
    ecu: 'ECU',
    ned: 'NED',
    jpn: 'JPN',
    swe: 'SWE',
    tun: 'TUN',
    bel: 'BEL',
    egy: 'EGY',
    irn: 'IRN',
    nzl: 'NZL',
    esp: 'ESP',
    cpv: 'CPV',
    ksa: 'KSA',
    uru: 'URU',
    fra: 'FRA',
    sen: 'SEN',
    irq: 'IRQ',
    nor: 'NOR',
    arg: 'ARG',
    alg: 'ALG',
    aut: 'AUT',
    jor: 'JOR',
    por: 'POR',
    cod: 'COD',
    uzb: 'UZB',
    col: 'COL',
    eng: 'ENG',
    cro: 'CRO',
    gha: 'GHA',
    pan: 'PAN',
    stadiums: 'STD',
    fan: 'FAN',
    logro: 'LOGRO',
    coca: 'COCA',
}

export const ALBUM_MUNDIAL_2026_VIRTUAL: AlbumData = {
    id: 'mundial2026_virtual',
    name: 'FIFA World Cup 2026 Digital',
    total: 850,
    coverEmoji: '📱',

    sections: [

        // ── INTRODUCCIÓN (mismos n del físico: 0–8) ───────────────────────
        // El físico no tiene intro con n=0..8, son exclusivos del virtual.
        // Usamos imgKey INTRO_V_0 etc. (no colisiona)
        {
            id: 'intro',
            name: 'Introducción',
            emoji: '🏆',
            type: 'special',
            stickers: [
                { n: 0, label: 'Logo PANINI', type: 'special', shortLabel: 'PANINI' },
                { n: 1, label: 'Trofeo FIFA 1', type: 'special', shortLabel: 'Trofeo 1' },
                { n: 2, label: 'Trofeo FIFA 2', type: 'special', shortLabel: 'Trofeo 2' },
                { n: 3, label: 'Mascotas Oficiales', type: 'special', shortLabel: 'Mascotas' },
                { n: 4, label: 'Logo Copa Mundial', type: 'special', shortLabel: 'Logo' },
                { n: 5, label: 'Pelota Oficial', type: 'special', shortLabel: 'Pelota' },
                { n: 6, label: 'Logo Canadá', type: 'special', shortLabel: 'Logo CAN' },
                { n: 7, label: 'Logo México', type: 'special', shortLabel: 'Logo MEX' },
                { n: 8, label: 'Logo USA', type: 'special', shortLabel: 'Logo USA' },
            ]
        },

        // ─────────────────────────────────────────────────────────────────────
        // SELECCIONES — n idénticos al físico para compartir imágenes
        // Físico: makeTeam(startN) → escudo=startN, equipo=startN+1, j1=startN+2...
        // Virtual: escudo=startN, jugadores con sus n exactos del físico
        // ─────────────────────────────────────────────────────────────────────

        // ── México (físico: 9=escudo, 10=equipo, 11-28=jugadores) ────────────
        {
            id: 'mex', name: 'México', emoji: '🇲🇽', group: 'CONCACAF',
            stickers: makeVirtualTeam(9, 'Escudo México', [
                { n: 11, name: 'Luis Malagón' },
                { n: 12, name: 'Johan Vasquez' },
                { n: 14, name: 'Cesar Montes' },
                { n: 15, name: 'Jesus Gallardo' },
                { n: 16, name: 'Israel Reyes' },
                { n: 19, name: 'Edson Alvarez' },
                { n: 21, name: 'Marcel Ruiz' },
                { n: 23, name: 'Hirving Lozano' },
                { n: 25, name: 'Raúl Jiménez' },
                { n: 26, name: 'Alexis Vega' },
                { n: 27, name: 'Roberto Alvarado' },
            ])
        },

        // ── South Africa (físico: 29=escudo, 30=equipo, 31-48=jugadores) ────
        {
            id: 'rsa', name: 'South Africa', emoji: '🇿🇦', group: 'CAF',
            stickers: makeVirtualTeam(29, 'Escudo Sudáfrica', [
                { n: 31, name: 'Ronwen Williams' },
                { n: 33, name: 'Aubrey Modiba' },
                { n: 35, name: 'Mbekezeli Mbokazi' },
                { n: 37, name: 'Siyabonga Ngezana' },
                { n: 38, name: 'Khuliso Mudau' },
                { n: 40, name: 'Teboho Mokoena' },
                { n: 43, name: 'Yaya Sithole' },
                { n: 42, name: 'Bathusi Aubaas' },
                { n: 44, name: 'Sipho Mbule' },
                { n: 45, name: 'Lyle Foster' },
                { n: 48, name: 'Oswin Appollis' },
            ])
        },

        // ── Corea del Sur (físico: 49=escudo, 50=equipo, 51-68=jugadores) ───
        {
            id: 'kor', name: 'Corea del Sur', emoji: '🇰🇷', group: 'AFC',
            stickers: makeVirtualTeam(49, 'Escudo Corea del Sur', [
                { n: 51, name: 'Hyeon-woo Jo' },
                { n: 53, name: 'Min-jae Kim' },
                { n: 54, name: 'Yu-min Cho' },
                { n: 55, name: 'Young-woo Seol' },
                { n: 59, name: 'Jae-sung Lee' },
                { n: 60, name: 'In-beom Hwang' },
                { n: 61, name: 'Kang-in Lee' },
                { n: 63, name: 'Jens Castrop' },
                { n: 66, name: 'Heung-min Son' },
                { n: 67, name: 'Hee-chan Hwang' },
                { n: 68, name: 'Hyeon-Gyu Oh' },
            ])
        },

        // ── Rep. Checa (físico: 69=escudo, 70=equipo, 71-88=jugadores) ──────
        {
            id: 'cze', name: 'Rep. Checa', emoji: '🇨🇿', group: 'UEFA',
            stickers: makeVirtualTeam(69, 'Escudo Rep. Checa', [
                { n: 71, name: 'Matej Kovar' },
                { n: 73, name: 'Ladislav Krejci' },
                { n: 74, name: 'Vladimir Coufal' },
                { n: 75, name: 'Jaroslav Zeleny' },
                { n: 79, name: 'Lukas Provod' },
                { n: 80, name: 'Lukas Cerv' },
                { n: 81, name: 'Tomas Soucek' },
                { n: 82, name: 'Pavel Sulc' },
                { n: 86, name: 'Vaclav Cerny' },
                { n: 87, name: 'Adam Hlozek' },
                { n: 88, name: 'Patrik Schick' },
            ])
        },

        // ── Canadá (físico: 89=escudo, 90=equipo, 91-108=jugadores) ─────────
        {
            id: 'can', name: 'Canadá', emoji: '🇨🇦', group: 'CONCACAF',
            stickers: makeVirtualTeam(89, 'Escudo Canadá', [
                { n: 91, name: 'Dayne St.Clair' },
                { n: 92, name: 'Alphonso Davies' },
                { n: 95, name: 'Richie Laryea' },
                { n: 96, name: 'Derek Cornelius' },
                { n: 99, name: 'Stephen Eustáquio' },
                { n: 100, name: 'Ismaël Koné' },
                { n: 102, name: 'Jacob Shaffelburg' },
                { n: 104, name: 'Niko Sigur' },
                { n: 105, name: 'Tajon Buchanan' },
                { n: 107, name: 'Cyle Larin' },
                { n: 108, name: 'Jonathan David' },
            ])
        },

        // ── Bosnia (físico: 109=escudo, 110=equipo, 111-128=jugadores) ──────
        {
            id: 'bih', name: 'Bosnia y Herzegovina', emoji: '🇧🇦', group: 'UEFA',
            stickers: makeVirtualTeam(109, 'Escudo Bosnia', [
                { n: 111, name: 'Nikola Vasilj' },
                { n: 112, name: 'Amer Dedic' },
                { n: 113, name: 'Sead Kolasinac' },
                { n: 114, name: 'Tarik Muharemovic' },
                { n: 116, name: 'Nikola Katic' },
                { n: 118, name: 'Benjamin Tahirovic' },
                { n: 120, name: 'Ivan Sunjic' },
                { n: 125, name: 'Ermedin Demirovic' },
                { n: 123, name: 'Esmir Bajraktarevic' },
                { n: 126, name: 'Edin Dzeko' },
                { n: 124, name: 'Amar Memic' },
            ])
        },

        // ── Qatar (físico: 129=escudo, 130=equipo, 131-148=jugadores) ───────
        {
            id: 'qat', name: 'Qatar', emoji: '🇶🇦', group: 'AFC',
            stickers: makeVirtualTeam(129, 'Escudo Qatar', [
                { n: 131, name: 'Meshaal Barsham' },
                { n: 132, name: 'Sultan Abrake' },
                { n: 135, name: 'Boualem Khoukhi' },
                { n: 136, name: 'Pedro Miguel' },
                { n: 138, name: 'Mohamed Al-Mannai' },
                { n: 139, name: 'Karim Boudiaf' },
                { n: 140, name: 'Assim Madibo' },
                { n: 145, name: 'Edmilson Junior' },
                { n: 146, name: 'Akram Hassan Afif' },
                { n: 147, name: 'Ahmed Al Ganehi' },
                { n: 148, name: 'Almoez Ali' },
            ])
        },

        // ── Suiza (físico: 149=escudo, 150=equipo, 151-168=jugadores) ───────
        {
            id: 'sui', name: 'Suiza', emoji: '🇨🇭', group: 'UEFA',
            stickers: makeVirtualTeam(149, 'Escudo Suiza', [
                { n: 151, name: 'Gregor Kobel' },
                { n: 153, name: 'Manuel Akanji' },
                { n: 154, name: 'Ricardo Rodriguez' },
                { n: 155, name: 'Nico Elvedi' },
                { n: 157, name: 'Silvan Widmer' },
                { n: 158, name: 'Granit Xhaka' },
                { n: 160, name: 'Remo Freuler' },
                { n: 161, name: 'Fabian Rieder' },
                { n: 165, name: 'Breel Embolo' },
                { n: 166, name: 'Ruben Vargas' },
                { n: 167, name: 'Dan Ndoye' },
            ])
        },

        // ── Brasil (físico: 169=escudo, 170=equipo, 171-188=jugadores) ──────
        {
            id: 'bra', name: 'Brasil', emoji: '🇧🇷', group: 'CONMEBOL',
            stickers: makeVirtualTeam(169, 'Escudo Brasil', [
                { n: 171, name: 'Alisson' },
                { n: 173, name: 'Marquinhos' },
                { n: 174, name: 'Éder Militão' },
                { n: 175, name: 'Gabriel Magalhães' },
                { n: 179, name: 'Casemiro' },
                { n: 180, name: 'Bruno Guimarães' },
                { n: 182, name: 'Vinicius Júnior' },
                { n: 183, name: 'Rodrygo' },
                { n: 185, name: 'Matheus Cunha' },
                { n: 187, name: 'Raphinha' },
                { n: 188, name: 'Estévão' },
            ])
        },

        // ── Marruecos (físico: 189=escudo, 190=equipo, 191-208=jugadores) ───
        {
            id: 'mar', name: 'Marruecos', emoji: '🇲🇦', group: 'CAF',
            stickers: makeVirtualTeam(189, 'Escudo Marruecos', [
                { n: 191, name: 'Yassine Bounou' },
                { n: 193, name: 'Achraf Hakimi' },
                { n: 194, name: 'Noussair Mazraoui' },
                { n: 195, name: 'Nayef Aguerd' },
                { n: 196, name: 'Romain Saïss' },
                { n: 199, name: 'Sofyan Amrabat' },
                { n: 201, name: 'Eliesse Ben Seghir' },
                { n: 202, name: 'Bilal El Khannouss' },
                { n: 203, name: 'Ismael Saibari' },
                { n: 204, name: 'Youssef En-Nesyri' },
                { n: 207, name: 'Brahim Diaz' },
            ])
        },

        // ── Haití (físico: 209=escudo, 210=equipo, 211-228=jugadores) ───────
        {
            id: 'hai', name: 'Haití', emoji: '🇭🇹', group: 'CONCACAF',
            stickers: makeVirtualTeam(209, 'Escudo Haití', [
                { n: 211, name: 'Johny Placide' },
                { n: 212, name: 'Carlens Arcus' },
                { n: 215, name: 'Ricardo Adé' },
                { n: 216, name: 'Duke Lacroix' },
                { n: 219, name: 'Leverton Pierre' },
                { n: 220, name: 'Danley Jean Jacques' },
                { n: 221, name: 'Jean-Ricner Bellegarde' },
                { n: 224, name: 'Josue Casimir' },
                { n: 225, name: 'Ruben Providence' },
                { n: 226, name: 'Duckens Nazon' },
                { n: 228, name: 'Frantzdy Pierrot' },
            ])
        },

        // ── Escocia (físico: 229=escudo, 230=equipo, 231-248=jugadores) ─────
        {
            id: 'sco', name: 'Escocia', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'UEFA',
            stickers: makeVirtualTeam(229, 'Escudo Escocia', [
                { n: 231, name: 'Angus Gunn' },
                { n: 234, name: 'Aaron Hickey' },
                { n: 235, name: 'Andrew Robertson' },
                { n: 237, name: 'John Souttar' },
                { n: 239, name: 'Grant Hanley' },
                { n: 240, name: 'Scott McTominay' },
                { n: 242, name: 'Lewis Ferguson' },
                { n: 243, name: 'Ryan Christie' },
                { n: 245, name: 'John McGinn' },
                { n: 247, name: 'Che Adams' },
                { n: 248, name: 'Ben Gannon-Doak' },
            ])
        },

        // ── USA (físico: 249=escudo, 250=equipo, 251-268=jugadores) ─────────
        {
            id: 'usa', name: 'USA', emoji: '🇺🇸', group: 'CONCACAF',
            stickers: makeVirtualTeam(249, 'Escudo USA', [
                { n: 251, name: 'Matt Freese' },
                { n: 252, name: 'Chris Richards' },
                { n: 253, name: 'Tim Ream' },
                { n: 254, name: 'Mark McKenzie' },
                { n: 257, name: 'Tyler Adams' },
                { n: 259, name: 'Weston McKennie' },
                { n: 261, name: 'Timothy Weah' },
                { n: 263, name: 'Malik Tillman' },
                { n: 264, name: 'Christian Pulisic' },
                { n: 265, name: 'Brenden Aaronson' },
                { n: 268, name: 'Folarin Balogun' },
            ])
        },

        // ── Paraguay (físico: 269=escudo, 270=equipo, 271-288=jugadores) ────
        {
            id: 'par', name: 'Paraguay', emoji: '🇵🇾', group: 'CONMEBOL',
            stickers: makeVirtualTeam(269, 'Escudo Paraguay', [
                { n: 272, name: 'Orlando Gill' },
                { n: 273, name: 'Gustavo Gomez' },
                { n: 275, name: 'Juan José Cáceres' },
                { n: 276, name: 'Omar Alderete' },
                { n: 277, name: 'Junior Alonso' },
                { n: 279, name: 'Diego Gomez' },
                { n: 281, name: 'Andres Cubas' },
                { n: 283, name: 'Julio Enciso' },
                { n: 285, name: 'Miguel Almirón' },
                { n: 286, name: 'Ramon Sosa' },
                { n: 288, name: 'Antonio Sanabria' },
            ])
        },

        // ── Australia (físico: 289=escudo, 290=equipo, 291-308=jugadores) ───
        {
            id: 'aus', name: 'Australia', emoji: '🇦🇺', group: 'AFC',
            stickers: makeVirtualTeam(289, 'Escudo Australia', [
                { n: 291, name: 'Mathew Ryan' },
                { n: 293, name: 'Harry Souttar' },
                { n: 296, name: 'Aziz Behich' },
                { n: 297, name: 'Cameron Burgess' },
                { n: 298, name: 'Lewis Miller' },
                { n: 300, name: 'Jackson Irvine' },
                { n: 301, name: 'Riley McGree' },
                { n: 302, name: "Aiden O'Neill" },
                { n: 303, name: 'Connor Metcalfe' },
                { n: 306, name: 'Kusini Yengi' },
                { n: 307, name: 'Nestory Irankunda' },
            ])
        },

        // ── Türkiye (físico: 309=escudo, 310=equipo, 311-328=jugadores) ─────
        {
            id: 'tur', name: 'Türkiye', emoji: '🇹🇷', group: 'UEFA',
            stickers: makeVirtualTeam(309, 'Escudo Türkiye', [
                { n: 311, name: 'Ugurcan Cakir' },
                { n: 312, name: 'Mert Muldur' },
                { n: 314, name: 'Abdulkerim Bardakci' },
                { n: 316, name: 'Merih Demiral' },
                { n: 317, name: 'Ferdi Kadioglu' },
                { n: 320, name: 'Hakan Calhanoglu' },
                { n: 321, name: 'Orkun Kokcu' },
                { n: 322, name: 'Arda Guler' },
                { n: 325, name: 'Can Uzun' },
                { n: 327, name: 'Kerem Akturkoglu' },
                { n: 328, name: 'Kenan Yildiz' },
            ])
        },

        // ── Alemania (físico: 329=escudo, 330=equipo, 331-348=jugadores) ────
        {
            id: 'ger', name: 'Alemania', emoji: '🇩🇪', group: 'UEFA',
            stickers: makeVirtualTeam(329, 'Escudo Alemania', [
                { n: 331, name: 'Marc-André ter Stegen' },
                { n: 335, name: 'Antonio Rüdiger' },
                { n: 332, name: 'Jonathan Tah' },
                { n: 333, name: 'David Raum' },
                { n: 340, name: 'Florian Wirtz' },
                { n: 339, name: 'Joshua Kimmich' },
                { n: 342, name: 'Leon Goretzka' },
                { n: 343, name: 'Jamal Musiala' },
                { n: 344, name: 'Serge Gnabry' },
                { n: 345, name: 'Kai Havertz' },
                { n: 348, name: 'Nick Woltemade' },
            ])
        },

        // ── Curaçao (físico: 349=escudo, 350=equipo, 351-368=jugadores) ─────
        {
            id: 'cuw', name: 'Curaçao', emoji: '🇨🇼', group: 'CONCACAF',
            stickers: makeVirtualTeam(349, 'Escudo Curaçao', [
                { n: 351, name: 'Eloy Room' },
                { n: 352, name: 'Armando Obispo' },
                { n: 353, name: 'Sherel Floranus' },
                { n: 356, name: 'Roshon Van Eijma' },
                { n: 357, name: 'Shurandy Sambo' },
                { n: 358, name: 'Livano Comenencia' },
                { n: 360, name: 'Juninho Bacuna' },
                { n: 361, name: 'Leandro Bacuna' },
                { n: 363, name: 'Kenji Gorre' },
                { n: 365, name: 'Jurgen Locadia' },
                { n: 368, name: 'Sontje Hansen' },
            ])
        },

        // ── Costa de Marfil (físico: 369=escudo, 370=equipo, 371-388) ───────
        {
            id: 'civ', name: 'Costa de Marfil', emoji: '🇨🇮', group: 'CAF',
            stickers: makeVirtualTeam(369, 'Escudo Costa de Marfil', [
                { n: 371, name: 'Yahia Fofana' },
                { n: 372, name: 'Ghislain Konan' },
                { n: 373, name: 'Wilfried Singo' },
                { n: 375, name: 'Evan Ndicka' },
                { n: 376, name: 'Willy Boly' },
                { n: 379, name: 'Franck Kessie' },
                { n: 380, name: 'Seko Fofana' },
                { n: 381, name: 'Ibrahim Sangare' },
                { n: 384, name: 'Sébastien Haller' },
                { n: 385, name: 'Simon Adingra' },
                { n: 387, name: 'Evann Guessand' },
            ])
        },

        // ── Ecuador (físico: 389=escudo, 390=equipo, 391-408=jugadores) ─────
        {
            id: 'ecu', name: 'Ecuador', emoji: '🇪🇨', group: 'CONMEBOL',
            stickers: makeVirtualTeam(389, 'Escudo Ecuador', [
                { n: 391, name: 'Hernán Galíndez' },
                { n: 393, name: 'Piero Hincapié' },
                { n: 394, name: 'Pervis Estupiñán' },
                { n: 395, name: 'Willian Pacho' },
                { n: 396, name: 'Ángelo Preciado' },
                { n: 400, name: 'Kendry Páez' },
                { n: 398, name: 'Moisés Caicedo' },
                { n: 399, name: 'Alan Franco' },
                { n: 401, name: 'Pedro Vite' },
                { n: 404, name: 'Gonzalo Plata' },
                { n: 408, name: 'Enner Valencia' },
            ])
        },

        // ── Países Bajos (físico: 409=escudo, 410=equipo, 411-428) ──────────
        {
            id: 'ned', name: 'Países Bajos', emoji: '🇳🇱', group: 'UEFA',
            stickers: makeVirtualTeam(409, 'Escudo Países Bajos', [
                { n: 411, name: 'Bart Verbruggen' },
                { n: 412, name: 'Virgil van Dijk' },
                { n: 413, name: 'Micky van de Ven' },
                { n: 415, name: 'Denzel Dumfries' },
                { n: 419, name: 'Tijjani Reijnders' },
                { n: 420, name: 'Ryan Gravenberch' },
                { n: 422, name: 'Frenkie de Jong' },
                { n: 423, name: 'Xavi Simons' },
                { n: 425, name: 'Memphis Depay' },
                { n: 426, name: 'Donyell Malen' },
                { n: 428, name: 'Cody Gakpo' },
            ])
        },

        // ── Japón (físico: 429=escudo, 430=equipo, 431-448=jugadores) ───────
        {
            id: 'jpn', name: 'Japón', emoji: '🇯🇵', group: 'AFC',
            stickers: makeVirtualTeam(429, 'Escudo Japón', [
                { n: 431, name: 'Zion Suzuki' },
                { n: 436, name: 'Tsuyoshi Watanabe' },
                { n: 437, name: 'Kaishu Sano' },
                { n: 439, name: 'Ao Tanaka' },
                { n: 440, name: 'Daichi Kamada' },
                { n: 442, name: 'Ritsu Doan' },
                { n: 443, name: 'Keito Nakamura' },
                { n: 444, name: 'Takumi Minamino' },
                { n: 441, name: 'Takefusa Kubo' },
                { n: 445, name: 'Shuto Machino' },
                { n: 448, name: 'Ayase Ueda' },
            ])
        },

        // ── Suecia (físico: 449=escudo, 450=equipo, 451-468=jugadores) ──────
        {
            id: 'swe', name: 'Suecia', emoji: '🇸🇪', group: 'UEFA',
            stickers: makeVirtualTeam(449, 'Escudo Suecia', [
                { n: 451, name: 'Victor Johansson' },
                { n: 452, name: 'Isak Hien' },
                { n: 454, name: 'Emil Holm' },
                { n: 455, name: 'Victor Nilsson Lindelöf' },
                { n: 457, name: 'Lucas Bergvall' },
                { n: 460, name: 'Yasin Ayari' },
                { n: 462, name: 'Daniel Svensson' },
                { n: 465, name: 'Dejan Kulusevski' },
                { n: 466, name: 'Anthony Elanga' },
                { n: 467, name: 'Alexander Isak' },
                { n: 468, name: 'Viktor Gyökeres' },
            ])
        },

        // ── Túnez (físico: 469=escudo, 470=equipo, 471-488=jugadores) ───────
        {
            id: 'tun', name: 'Túnez', emoji: '🇹🇳', group: 'CAF',
            stickers: makeVirtualTeam(469, 'Escudo Túnez', [
                { n: 472, name: 'Aymen Dahmen' },
                { n: 474, name: 'Montassar Talbi' },
                { n: 475, name: 'Yassine Meriah' },
                { n: 476, name: 'Ali Abdi' },
                { n: 480, name: 'Ferjani Sassi' },
                { n: 478, name: 'Ellyes Skhiri' },
                { n: 479, name: 'Aissa Laidouni' },
                { n: 482, name: 'Hannibal Mejbri' },
                { n: 488, name: 'Naim Sliti' },
                { n: 483, name: 'Elias Achouri' },
                { n: 485, name: 'Hazem Mastouri' },
            ])
        },

        // ── Bélgica (físico: 489=escudo, 490=equipo, 491-508=jugadores) ─────
        {
            id: 'bel', name: 'Bélgica', emoji: '🇧🇪', group: 'UEFA',
            stickers: makeVirtualTeam(489, 'Escudo Bélgica', [
                { n: 491, name: 'Thibaut Courtois' },
                { n: 492, name: 'Arthur Theate' },
                { n: 493, name: 'Timothy Castagne' },
                { n: 496, name: 'Maxim De Cuyper' },
                { n: 498, name: 'Youri Tielemans' },
                { n: 503, name: 'Kevin De Bruyne' },
                { n: 499, name: 'Amadou Onana' },
                { n: 504, name: 'Jérémy Doku' },
                { n: 505, name: 'Charles De Ketelaere' },
                { n: 506, name: 'Leandro Trossard' },
                { n: 508, name: 'Romelu Lukaku' },
            ])
        },

        // ── Egipto (físico: 509=escudo, 510=equipo, 511-528=jugadores) ──────
        {
            id: 'egy', name: 'Egipto', emoji: '🇪🇬', group: 'CAF',
            stickers: makeVirtualTeam(509, 'Escudo Egipto', [
                { n: 511, name: 'Mohamed El Shenawy' },
                { n: 512, name: 'Mohamed Hany' },
                { n: 514, name: 'Yasser Ibrahim' },
                { n: 516, name: 'Ramy Rabia' },
                { n: 519, name: 'Marwan Attia' },
                { n: 520, name: 'Zizo' },
                { n: 521, name: 'Hamdy Fathy' },
                { n: 528, name: 'Omar Marmoush' },
                { n: 525, name: 'Mohamed Salah' },
                { n: 526, name: 'Mostafa Mohamed' },
                { n: 527, name: 'Trezeguet' },
            ])
        },

        // ── Irán (físico: 529=escudo, 530=equipo, 531-548=jugadores) ────────
        {
            id: 'irn', name: 'Irán', emoji: '🇮🇷', group: 'AFC',
            stickers: makeVirtualTeam(529, 'Escudo Irán', [
                { n: 531, name: 'Alireza Beiranvand' },
                { n: 535, name: 'Shojae Khalilzadeh' },
                { n: 534, name: 'Milad Mohammadi' },
                { n: 536, name: 'Ramin Rezaeian' },
                { n: 537, name: 'Hossein Kanaani' },
                { n: 540, name: 'Saeed Ezatolahi' },
                { n: 541, name: 'Saman Ghoddos' },
                { n: 544, name: 'Mohammad Mohebi' },
                { n: 546, name: 'Mehdi Taremi' },
                { n: 545, name: 'Sardar Azmoun' },
                { n: 547, name: 'Alireza Jahanbakhsh' },
            ])
        },

        // ── Nueva Zelanda (físico: 549=escudo, 550=equipo, 551-568) ─────────
        {
            id: 'nzl', name: 'Nueva Zelanda', emoji: '🇳🇿', group: 'OFC',
            stickers: makeVirtualTeam(549, 'Escudo Nueva Zelanda', [
                { n: 551, name: 'Max Crocombe' },
                { n: 553, name: 'Michael Boxall' },
                { n: 554, name: 'Liberato Cacace' },
                { n: 555, name: 'Tim Payne' },
                { n: 558, name: 'Finn Surman' },
                { n: 563, name: 'Marko Stamenic' },
                { n: 559, name: 'Joe Bell' },
                { n: 560, name: 'Sarpreet Singh' },
                { n: 562, name: 'Matthew Garbett' },
                { n: 565, name: 'Chris Wood' },
                { n: 566, name: 'Elijah Just' },
            ])
        },

        // ── España (físico: 569=escudo, 570=equipo, 571-588=jugadores) ──────
        {
            id: 'esp', name: 'España', emoji: '🇪🇸', group: 'UEFA',
            stickers: makeVirtualTeam(569, 'Escudo España', [
                { n: 571, name: 'Unai Simón' },
                { n: 572, name: 'Robin Le Normand' },
                { n: 574, name: 'Dean Huijsen' },
                { n: 577, name: 'Marc Cucurella' },
                { n: 579, name: 'Rodri' },
                { n: 578, name: 'Martín Zubimendi' },
                { n: 580, name: 'Pedri' },
                { n: 581, name: 'Fabián Ruiz' },
                { n: 583, name: 'Lamine Yamal' },
                { n: 585, name: 'Nico Williams' },
                { n: 588, name: 'Mikel Oyarzabal' },
            ])
        },

        // ── Cabo Verde (físico: 589=escudo, 590=equipo, 591-608) ────────────
        {
            id: 'cpv', name: 'Cabo Verde', emoji: '🇨🇻', group: 'CAF',
            stickers: makeVirtualTeam(589, 'Escudo Cabo Verde', [
                { n: 591, name: 'Vozinha' },
                { n: 592, name: 'Logan Costa' },
                { n: 593, name: 'Pico' },
                { n: 595, name: 'Steven Moreira' },
                { n: 597, name: 'Joao Paulo' },
                { n: 599, name: 'Kevin Pina' },
                { n: 601, name: 'Jamiro Monteiro' },
                { n: 598, name: 'Yannick Semedo' },
                { n: 605, name: 'Ryan Mendes' },
                { n: 604, name: 'Jovane Cabral' },
                { n: 606, name: 'Dailon Livramento' },
            ])
        },

        // ── Arabia Saudita (físico: 609=escudo, 610=equipo, 611-628) ────────
        {
            id: 'ksa', name: 'Arabia Saudita', emoji: '🇸🇦', group: 'AFC',
            stickers: makeVirtualTeam(609, 'Escudo Arabia Saudita', [
                { n: 611, name: 'Nawaf Alaqidi' },
                { n: 617, name: 'Hassan Altambakti' },
                { n: 615, name: 'Jihad Thakri' },
                { n: 613, name: 'Saud Abdulhamid' },
                { n: 621, name: 'Nasser Aldawsari' },
                { n: 620, name: 'Abdullah Alkhaibari' },
                { n: 618, name: 'Musab Aljuwayr' },
                { n: 626, name: 'Feras Akbrikan' },
                { n: 624, name: 'Salem Aldawsari' },
                { n: 622, name: 'Saleh Abu Alshamat' },
                { n: 627, name: 'Saleh Alshehri' },
            ])
        },

        // ── Uruguay (físico: 629=escudo, 630=equipo, 631-648=jugadores) ─────
        {
            id: 'uru', name: 'Uruguay', emoji: '🇺🇾', group: 'CONMEBOL',
            stickers: makeVirtualTeam(629, 'Escudo Uruguay', [
                { n: 631, name: 'Sergio Rochet' },
                { n: 634, name: 'José María Giménez' },
                { n: 633, name: 'Ronald Araujo' },
                { n: 635, name: 'Sebastian Caceres' },
                { n: 636, name: 'Mathias Olivera' },
                { n: 638, name: 'Nahitan Nandez' },
                { n: 639, name: 'Federico Valverde' },
                { n: 641, name: 'Rodrigo Bentancur' },
                { n: 642, name: 'Manuel Ugarte' },
                { n: 648, name: 'Facundo Pellistri' },
                { n: 645, name: 'Darwin Núñez' },
            ])
        },

        // ── Francia (físico: 649=escudo, 650=equipo, 651-668=jugadores) ─────
        {
            id: 'fra', name: 'Francia', emoji: '🇫🇷', group: 'UEFA',
            stickers: makeVirtualTeam(649, 'Escudo Francia', [
                { n: 651, name: 'Mike Maignan' },
                { n: 653, name: 'William Saliba' },
                { n: 654, name: 'Jules Koundé' },
                { n: 652, name: 'Theo Hernández' },
                { n: 658, name: 'Aurélien Tchouaméni' },
                { n: 659, name: 'Eduardo Camavinga' },
                { n: 663, name: 'Ousmane Dembélé' },
                { n: 668, name: 'Kylian Mbappé' },
                { n: 664, name: 'Bradley Barcola' },
                { n: 665, name: 'Désiré Doué' },
                { n: 667, name: 'Hugo Ekitike' },
            ])
        },

        // ── Senegal (físico: 669=escudo, 670=equipo, 671-688=jugadores) ─────
        {
            id: 'sen', name: 'Senegal', emoji: '🇸🇳', group: 'CAF',
            stickers: makeVirtualTeam(669, 'Escudo Senegal', [
                { n: 671, name: 'Édouard Mendy' },
                { n: 677, name: 'Kalidou Koulibaly' },
                { n: 673, name: 'Moussa Niakhaté' },
                { n: 676, name: 'El Hadji Malick Diouf' },
                { n: 678, name: 'Idrissa Gana Gueye' },
                { n: 679, name: 'Pape Matar Sarr' },
                { n: 683, name: 'Sadio Mané' },
                { n: 686, name: 'Iliman Ndiaye' },
                { n: 688, name: 'Krepin Diatta' },
                { n: 684, name: 'Ismaïla Sarr' },
                { n: 687, name: 'Nicolas Jackson' },
            ])
        },

        // ── Iraq (físico: 689=escudo, 690=equipo, 691-708=jugadores) ────────
        {
            id: 'irq', name: 'Iraq', emoji: '🇮🇶', group: 'AFC',
            stickers: makeVirtualTeam(689, 'Escudo Iraq', [
                { n: 691, name: 'Jalal Hassan' },
                { n: 693, name: 'Hussein Ali' },
                { n: 694, name: 'Akam Hashem' },
                { n: 695, name: 'Merchas Doski' },
                { n: 696, name: 'Zaid Tahseen' },
                { n: 698, name: 'Zidane Iqbal' },
                { n: 699, name: 'Amir Al-Ammari' },
                { n: 700, name: 'Ibrahim Bayesh' },
                { n: 701, name: 'Ali Jasim' },
                { n: 703, name: 'Aimar Sher' },
                { n: 708, name: 'Mohanad Ali' },
            ])
        },

        // ── Noruega (físico: 709=escudo, 710=equipo, 711-728=jugadores) ─────
        {
            id: 'nor', name: 'Noruega', emoji: '🇳🇴', group: 'UEFA',
            stickers: makeVirtualTeam(709, 'Escudo Noruega', [
                { n: 711, name: 'Orjan Nyland' },
                { n: 712, name: 'Julian Ryerson' },
                { n: 714, name: 'Kristoffer Vassbakk Ajer' },
                { n: 716, name: 'David Møller Wolfe' },
                { n: 719, name: 'Martin Ødegaard' },
                { n: 720, name: 'Sander Berge' },
                { n: 722, name: 'Patrick Berg' },
                { n: 723, name: 'Erling Haaland' },
                { n: 727, name: 'Antonio Nusa' },
                { n: 728, name: 'Oscar Bobb' },
                { n: 724, name: 'Alexander Sørloth' },
            ])
        },

        // ── Argentina (físico: 729=escudo, 730=equipo, 731-748=jugadores) ───
        {
            id: 'arg', name: 'Argentina', emoji: '🇦🇷', group: 'CONMEBOL',
            stickers: makeVirtualTeam(729, 'Escudo Argentina', [
                { n: 731, name: 'Emiliano Martínez' },
                { n: 732, name: 'Nahuel Molina' },
                { n: 733, name: 'Cristian Romero' },
                { n: 734, name: 'Nicolás Otamendi' },
                { n: 737, name: 'Enzo Fernández' },
                { n: 738, name: 'Alexis Mac Allister' },
                { n: 739, name: 'Rodrigo De Paul' },
                { n: 747, name: 'Julián Álvarez' },
                { n: 745, name: 'Lionel Messi' },
                { n: 748, name: 'Giuliano Simeone' },
                { n: 746, name: 'Lautaro Martínez' },
            ])
        },

        // ── Argelia (físico: 749=escudo, 750=equipo, 751-768=jugadores) ─────
        {
            id: 'alg', name: 'Argelia', emoji: '🇩🇿', group: 'CAF',
            stickers: makeVirtualTeam(749, 'Escudo Argelia', [
                { n: 751, name: 'Alexis Guendouz' },
                { n: 754, name: 'Rayan Aït-Nouri' },
                { n: 752, name: 'Ramy Bensebaini' },
                { n: 753, name: 'Youcef Atal' },
                { n: 756, name: 'Aïssa Mandi' },
                { n: 761, name: 'Nabil Bentaleb' },
                { n: 763, name: 'Riyad Mahrez' },
                { n: 764, name: 'Said Benrahma' },
                { n: 766, name: 'Amine Gouiri' },
                { n: 768, name: 'Mohammed Amoura' },
                { n: 767, name: 'Baghdad Bounedjah' },
            ])
        },

        // ── Austria (físico: 769=escudo, 770=equipo, 771-788=jugadores) ─────
        {
            id: 'aut', name: 'Austria', emoji: '🇦🇹', group: 'UEFA',
            stickers: makeVirtualTeam(769, 'Escudo Austria', [
                { n: 771, name: 'Alexander Schlager' },
                { n: 773, name: 'David Alaba' },
                { n: 774, name: 'Kevin Danso' },
                { n: 775, name: 'Philipp Lienhart' },
                { n: 781, name: 'Konrad Laimer' },
                { n: 783, name: 'Nicolas Seiwald' },
                { n: 780, name: 'Marcel Sabitzer' },
                { n: 782, name: 'Florian Grillitsch' },
                { n: 788, name: 'Marko Arnautović' },
                { n: 786, name: 'Christoph Baumgartner' },
                { n: 787, name: 'Michael Gregoritsch' },
            ])
        },

        // ── Jordania (físico: 789=escudo, 790=equipo, 791-808=jugadores) ────
        {
            id: 'jor', name: 'Jordania', emoji: '🇯🇴', group: 'AFC',
            stickers: makeVirtualTeam(789, 'Escudo Jordania', [
                { n: 791, name: 'Yazeed Abulaila' },
                { n: 793, name: 'Mohammad Abu Hashish' },
                { n: 794, name: 'Yazan Al-Arab' },
                { n: 795, name: 'Abdallah Nasib' },
                { n: 798, name: 'Ibrahim Saadeh' },
                { n: 799, name: 'Nizar Al-Rashdan' },
                { n: 800, name: 'Noor Al-Rawabdeh' },
                { n: 804, name: 'Yazan Al-Naimat' },
                { n: 803, name: 'Musa Al-Taamari' },
                { n: 805, name: 'Mahmoud Al-Mardi' },
                { n: 806, name: 'Ali Olwan' },
            ])
        },

        // ── Portugal (físico: 809=escudo, 810=equipo, 811-828=jugadores) ────
        {
            id: 'por', name: 'Portugal', emoji: '🇵🇹', group: 'UEFA',
            stickers: makeVirtualTeam(809, 'Escudo Portugal', [
                { n: 811, name: 'Diogo Costa' },
                { n: 813, name: 'Rúben Dias' },
                { n: 816, name: 'Nuno Mendes' },
                { n: 821, name: 'Vitinha' },
                { n: 818, name: 'Bernardo Silva' },
                { n: 819, name: 'Bruno Fernandes' },
                { n: 820, name: 'Rúben Neves' },
                { n: 823, name: 'Cristiano Ronaldo' },
                { n: 825, name: 'João Félix' },
                { n: 827, name: 'Pedro Neto' },
                { n: 828, name: 'Rafael Leão' },
            ])
        },

        // ── Congo DR (físico: 829=escudo, 830=equipo, 831-848=jugadores) ────
        {
            id: 'cod', name: 'Congo DR', emoji: '🇨🇩', group: 'CAF',
            stickers: makeVirtualTeam(829, 'Escudo Congo DR', [
                { n: 831, name: 'Lionel Mpasi-Nzau' },
                { n: 832, name: 'Aaron Wan-Bissaka' },
                { n: 833, name: 'Axel Tuanzebe' },
                { n: 834, name: 'Arthur Masuaku' },
                { n: 835, name: 'Chancel Mbemba' },
                { n: 838, name: "Ngal'ayel Mukau" },
                { n: 840, name: 'Samuel Moutoussamy' },
                { n: 841, name: 'Noah Sadiki' },
                { n: 842, name: 'Theo Bongonda' },
                { n: 844, name: 'Yoane Wissa' },
                { n: 847, name: 'Cédric Bakambu' },
            ])
        },

        // ── Uzbekistán (físico: 849=escudo, 850=equipo, 851-868=jugadores) ──
        {
            id: 'uzb', name: 'Uzbekistán', emoji: '🇺🇿', group: 'AFC',
            stickers: makeVirtualTeam(849, 'Escudo Uzbekistán', [
                { n: 851, name: 'Utkir Yusupov' },
                { n: 858, name: 'Abdukodir Khusanov' },
                { n: 852, name: 'Farrukh Savfiev' },
                { n: 853, name: 'Sherzod Nasrullaev' },
                { n: 855, name: 'Husniddin Aliqulov' },
                { n: 856, name: 'Rustamjon Ashurmatov' },
                { n: 857, name: 'Khojiakbar Alijonov' },
                { n: 859, name: 'Odiljon Hamrobekov' },
                { n: 860, name: 'Otabek Shukurov' },
                { n: 864, name: 'Eldor Shomurodov' },
                { n: 868, name: 'Abbosbek Fayzullaev' },
            ])
        },

        // ── Colombia (físico: 869=escudo, 870=equipo, 871-888=jugadores) ────
        {
            id: 'col', name: 'Colombia', emoji: '🇨🇴', group: 'CONMEBOL',
            stickers: makeVirtualTeam(869, 'Escudo Colombia', [
                { n: 871, name: 'Camilo Vargas' },
                { n: 873, name: 'Dávinson Sánchez' },
                { n: 874, name: 'Yerry Mina' },
                { n: 875, name: 'Daniel Muñoz' },
                { n: 882, name: 'James Rodríguez' },
                { n: 879, name: 'Jefferson Lerma' },
                { n: 881, name: 'Richard Ríos' },
                { n: 883, name: 'Juan Fernando Quintero' },
                { n: 888, name: 'Luis Díaz' },
                { n: 885, name: 'Jhon Arias' },
                { n: 887, name: 'Luis Suárez' },
            ])
        },

        // ── Inglaterra (físico: 889=escudo, 890=equipo, 891-908=jugadores) ──
        {
            id: 'eng', name: 'Inglaterra', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'UEFA',
            stickers: makeVirtualTeam(889, 'Escudo Inglaterra', [
                { n: 891, name: 'Jordan Pickford' },
                { n: 896, name: 'Reece James' },
                { n: 892, name: 'John Stones' },
                { n: 900, name: 'Jude Bellingham' },
                { n: 899, name: 'Declan Rice' },
                { n: 898, name: 'Jordan Henderson' },
                { n: 904, name: 'Phil Foden' },
                { n: 906, name: 'Harry Kane' },
                { n: 905, name: 'Bukayo Saka' },
                { n: 901, name: 'Cole Palmer' },
                { n: 907, name: 'Marcus Rashford' },
            ])
        },

        // ── Croacia (físico: 909=escudo, 910=equipo, 911-928=jugadores) ─────
        {
            id: 'cro', name: 'Croacia', emoji: '🇭🇷', group: 'UEFA',
            stickers: makeVirtualTeam(909, 'Escudo Croacia', [
                { n: 911, name: 'Dominik Livaković' },
                { n: 912, name: 'Duje Ćaleta-Car' },
                { n: 913, name: 'Joško Gvardiol' },
                { n: 914, name: 'Josip Stanisic' },
                { n: 924, name: 'Ivan Perišić' },
                { n: 918, name: 'Luka Modrić' },
                { n: 919, name: 'Mateo Kovačić' },
                { n: 921, name: 'Lovro Majer' },
                { n: 922, name: 'Mario Pašalić' },
                { n: 926, name: 'Ante Budimir' },
                { n: 927, name: 'Andrej Kramarić' },
            ])
        },

        // ── Ghana (físico: 929=escudo, 930=equipo, 931-948=jugadores) ───────
        {
            id: 'gha', name: 'Ghana', emoji: '🇬🇭', group: 'CAF',
            stickers: makeVirtualTeam(929, 'Escudo Ghana', [
                { n: 931, name: 'Lawrence Ati Zigi' },
                { n: 934, name: 'Alidu Seidu' },
                { n: 935, name: 'Alexander Djiku' },
                { n: 936, name: 'Gideon Mensah' },
                { n: 937, name: 'Caleb Yirenkyi' },
                { n: 939, name: 'Thomas Partey' },
                { n: 938, name: 'Abdul Issahaku Fatawu' },
                { n: 942, name: 'Mohammed Kudus' },
                { n: 941, name: 'Kamaldeen Sulemana' },
                { n: 944, name: 'Jordan Ayew' },
                { n: 948, name: 'Antoine Semenyo' },
            ])
        },

        // ── Panamá (físico: 949=escudo, 950=equipo, 951-968=jugadores) ──────
        {
            id: 'pan', name: 'Panamá', emoji: '🇵🇦', group: 'CONCACAF',
            stickers: makeVirtualTeam(949, 'Escudo Panamá', [
                { n: 951, name: 'Orlando Mosquera' },
                { n: 955, name: 'Michael Amir Murillo' },
                { n: 954, name: 'Andres Andrade' },
                { n: 953, name: 'Fidel Escobar' },
                { n: 960, name: 'Aníbal Godoy' },
                { n: 959, name: 'Cristian Martinez' },
                { n: 961, name: 'Adalberto Carrasquilla' },
                { n: 962, name: 'Édgar Bárcenas' },
                { n: 965, name: 'Jose Fajardo' },
                { n: 964, name: 'Ismael Díaz' },
                { n: 967, name: 'Jose Luiz Rodriguez' },
            ])
        },

        // ── COCA-COLA (mismos n que el físico → mismas fotos) ────────────────
        {
            id: 'coca',
            name: 'Coca-Cola',
            emoji: '🥤',
            type: 'coca',
            stickers: [
                { n: 1081, label: 'Lamine Yamal — Coca-Cola', type: 'coca', shortLabel: 'Yamal CC' },
                { n: 1082, label: 'Joshua Kimmich — Coca-Cola', type: 'coca', shortLabel: 'Kimmich CC' },
                { n: 1083, label: 'Harry Kane — Coca-Cola', type: 'coca', shortLabel: 'Kane CC' },
                { n: 1084, label: 'Santiago Giménez — Coca-Cola', type: 'coca', shortLabel: 'Giménez CC' },
                { n: 1085, label: 'Joško Gvardiol — Coca-Cola', type: 'coca', shortLabel: 'Gvardiol CC' },
                { n: 1086, label: 'Federico Valverde — Coca-Cola', type: 'coca', shortLabel: 'Valverde CC' },
                { n: 1087, label: 'Jefferson Lerma — Coca-Cola', type: 'coca', shortLabel: 'Lerma CC' },
                { n: 1088, label: 'Enner Valencia — Coca-Cola', type: 'coca', shortLabel: 'Valencia CC' },
                { n: 1089, label: 'Gabriel Magalhães — Coca-Cola', type: 'coca', shortLabel: 'Magalhães CC' },
                { n: 1090, label: 'Virgil van Dijk — Coca-Cola', type: 'coca', shortLabel: 'Van Dijk CC' },
                { n: 1091, label: 'Alphonso Davies — Coca-Cola', type: 'coca', shortLabel: 'Davies CC' },
                { n: 1092, label: 'Emiliano Martínez — Coca-Cola', type: 'coca', shortLabel: 'Martínez CC' },
                { n: 1093, label: 'Raúl Jiménez — Coca-Cola', type: 'coca', shortLabel: 'Jiménez CC' },
                { n: 1094, label: 'Lautaro Martínez — Coca-Cola', type: 'coca', shortLabel: 'Lautaro CC' },
            ]
        },

        // ── ESTADIOS (n exclusivos del virtual, no colisionan) ───────────────
        {
            id: 'stadiums',
            name: 'Estadios',
            emoji: '🏟️',
            type: 'special',
            stickers: [
                { n: 5001, label: 'LINC Financial Field — Philadelphia', type: 'special', shortLabel: 'Philadelphia' },
                { n: 5002, label: 'NRG Stadium — Houston', type: 'special', shortLabel: 'Houston' },
                { n: 5003, label: 'Mercedes-Benz Stadium — Atlanta', type: 'special', shortLabel: 'Atlanta' },
                { n: 5004, label: 'Estadio Azteca — Ciudad de México', type: 'special', shortLabel: 'Azteca' },
                { n: 5005, label: 'SoFi Stadium — Los Ángeles', type: 'special', shortLabel: 'Los Ángeles' },
                { n: 5006, label: 'Arrowhead Stadium — Kansas City', type: 'special', shortLabel: 'Kansas City' },
                { n: 5007, label: 'AT&T Stadium — Dallas', type: 'special', shortLabel: 'Dallas' },
                { n: 5008, label: 'Gillette Stadium — Boston', type: 'special', shortLabel: 'Boston' },
                { n: 5009, label: 'Hard Rock Stadium — Miami', type: 'special', shortLabel: 'Miami' },
                { n: 5010, label: 'Estadio BBVA — Monterrey', type: 'special', shortLabel: 'Monterrey' },
                { n: 5011, label: 'BC Place — Vancouver', type: 'special', shortLabel: 'Vancouver' },
                { n: 5012, label: 'Lumen Field — Seattle', type: 'special', shortLabel: 'Seattle' },
                { n: 5013, label: 'BMO Field — Toronto', type: 'special', shortLabel: 'Toronto' },
                { n: 5014, label: 'MetLife Stadium — New York / New Jersey', type: 'special', shortLabel: 'New York' },
                { n: 5015, label: "Levi's Stadium — San Francisco", type: 'special', shortLabel: 'San Francisco' },
                { n: 5016, label: 'Estadio Akron — Guadalajara', type: 'special', shortLabel: 'Guadalajara' },
            ]
        },

        // ── FAN STICKERS (n exclusivos 6001+) ────────────────────────────────
        {
            id: 'fan',
            name: 'Fan Stickers',
            emoji: '✨',
            type: 'special',
            stickers: [
                { n: 6001, label: 'Fan Sticker México', type: 'special', shortLabel: 'Fan MEX' },
                { n: 6002, label: 'Fan Sticker Sudáfrica', type: 'special', shortLabel: 'Fan RSA' },
                { n: 6003, label: 'Fan Sticker Corea del Sur', type: 'special', shortLabel: 'Fan KOR' },
                { n: 6004, label: 'Fan Sticker Rep. Checa', type: 'special', shortLabel: 'Fan CZE' },
                { n: 6005, label: 'Fan Sticker Canadá', type: 'special', shortLabel: 'Fan CAN' },
                { n: 6006, label: 'Fan Sticker Bosnia', type: 'special', shortLabel: 'Fan BIH' },
                { n: 6007, label: 'Fan Sticker Qatar', type: 'special', shortLabel: 'Fan QAT' },
                { n: 6008, label: 'Fan Sticker Suiza', type: 'special', shortLabel: 'Fan SUI' },
                { n: 6009, label: 'Fan Sticker Brasil', type: 'special', shortLabel: 'Fan BRA' },
                { n: 6010, label: 'Fan Sticker Marruecos', type: 'special', shortLabel: 'Fan MAR' },
                { n: 6011, label: 'Fan Sticker Haití', type: 'special', shortLabel: 'Fan HAI' },
                { n: 6012, label: 'Fan Sticker Escocia', type: 'special', shortLabel: 'Fan SCO' },
                { n: 6013, label: 'Fan Sticker USA', type: 'special', shortLabel: 'Fan USA' },
                { n: 6014, label: 'Fan Sticker Paraguay', type: 'special', shortLabel: 'Fan PAR' },
                { n: 6015, label: 'Fan Sticker Australia', type: 'special', shortLabel: 'Fan AUS' },
                { n: 6016, label: 'Fan Sticker Türkiye', type: 'special', shortLabel: 'Fan TUR' },
                { n: 6017, label: 'Fan Sticker Alemania', type: 'special', shortLabel: 'Fan GER' },
                { n: 6018, label: 'Fan Sticker Curaçao', type: 'special', shortLabel: 'Fan CUW' },
                { n: 6019, label: 'Fan Sticker Costa de Marfil', type: 'special', shortLabel: 'Fan CIV' },
                { n: 6020, label: 'Fan Sticker Ecuador', type: 'special', shortLabel: 'Fan ECU' },
                { n: 6021, label: 'Fan Sticker Países Bajos', type: 'special', shortLabel: 'Fan NED' },
                { n: 6022, label: 'Fan Sticker Japón', type: 'special', shortLabel: 'Fan JPN' },
                { n: 6023, label: 'Fan Sticker Suecia', type: 'special', shortLabel: 'Fan SWE' },
                { n: 6024, label: 'Fan Sticker Túnez', type: 'special', shortLabel: 'Fan TUN' },
                { n: 6025, label: 'Fan Sticker Bélgica', type: 'special', shortLabel: 'Fan BEL' },
                { n: 6026, label: 'Fan Sticker Egipto', type: 'special', shortLabel: 'Fan EGY' },
                { n: 6027, label: 'Fan Sticker Irán', type: 'special', shortLabel: 'Fan IRN' },
                { n: 6028, label: 'Fan Sticker Nueva Zelanda', type: 'special', shortLabel: 'Fan NZL' },
                { n: 6029, label: 'Fan Sticker España', type: 'special', shortLabel: 'Fan ESP' },
                { n: 6030, label: 'Fan Sticker Cabo Verde', type: 'special', shortLabel: 'Fan CPV' },
                { n: 6031, label: 'Fan Sticker Arabia Saudita', type: 'special', shortLabel: 'Fan KSA' },
                { n: 6032, label: 'Fan Sticker Uruguay', type: 'special', shortLabel: 'Fan URU' },
                { n: 6033, label: 'Fan Sticker Francia', type: 'special', shortLabel: 'Fan FRA' },
                { n: 6034, label: 'Fan Sticker Senegal', type: 'special', shortLabel: 'Fan SEN' },
                { n: 6035, label: 'Fan Sticker Iraq', type: 'special', shortLabel: 'Fan IRQ' },
                { n: 6036, label: 'Fan Sticker Noruega', type: 'special', shortLabel: 'Fan NOR' },
                { n: 6037, label: 'Fan Sticker Argentina', type: 'special', shortLabel: 'Fan ARG' },
                { n: 6038, label: 'Fan Sticker Argelia', type: 'special', shortLabel: 'Fan ALG' },
                { n: 6039, label: 'Fan Sticker Austria', type: 'special', shortLabel: 'Fan AUT' },
                { n: 6040, label: 'Fan Sticker Jordania', type: 'special', shortLabel: 'Fan JOR' },
                { n: 6041, label: 'Fan Sticker Portugal', type: 'special', shortLabel: 'Fan POR' },
                { n: 6042, label: 'Fan Sticker Congo DR', type: 'special', shortLabel: 'Fan COD' },
                { n: 6043, label: 'Fan Sticker Uzbekistán', type: 'special', shortLabel: 'Fan UZB' },
                { n: 6044, label: 'Fan Sticker Colombia', type: 'special', shortLabel: 'Fan COL' },
                { n: 6045, label: 'Fan Sticker Inglaterra', type: 'special', shortLabel: 'Fan ENG' },
                { n: 6046, label: 'Fan Sticker Ghana', type: 'special', shortLabel: 'Fan GHA' },
                { n: 6047, label: 'Fan Sticker Panamá', type: 'special', shortLabel: 'Fan PAN' },
            ]
        },

        // ── LOGROS (n exclusivos 7001+) ──────────────────────────────────────
        {
            id: 'logro',
            name: 'Logros',
            emoji: '🎖️',
            type: 'special',
            stickers: [
                { n: 7001, label: 'Novato del álbum', type: 'special', shortLabel: 'Novato' },
                { n: 7002, label: 'Experto del álbum', type: 'special', shortLabel: 'Experto' },
                { n: 7003, label: 'Campeón del álbum', type: 'special', shortLabel: 'Campeón' },
                { n: 7004, label: '12 equipos completados', type: 'special', shortLabel: '12 equipos' },
                { n: 7005, label: '24 equipos completados', type: 'special', shortLabel: '24 equipos' },
                { n: 7006, label: '36 equipos completados', type: 'special', shortLabel: '36 equipos' },
                { n: 7007, label: 'Primer reto', type: 'special', shortLabel: 'Primer reto' },
                { n: 7008, label: '3 retos completados', type: 'special', shortLabel: '3 retos' },
                { n: 7009, label: '5 retos completados', type: 'special', shortLabel: '5 retos' },
                { n: 7010, label: '16 capitanes', type: 'special', shortLabel: '16 capitanes' },
                { n: 7011, label: '32 capitanes', type: 'special', shortLabel: '32 capitanes' },
                { n: 7012, label: '48 capitanes', type: 'special', shortLabel: '48 capitanes' },
                { n: 7013, label: 'Intercambio de novato', type: 'special', shortLabel: 'Cambio novato' },
                { n: 7014, label: 'Intercambio de experto', type: 'special', shortLabel: 'Cambio experto' },
                { n: 7015, label: 'Intercambio de campeón', type: 'special', shortLabel: 'Cambio campeón' },
                { n: 7016, label: '1 campeón del mundo anterior', type: 'special', shortLabel: '1 ganador' },
                { n: 7017, label: '2 campeones anteriores', type: 'special', shortLabel: '2 ganadores' },
                { n: 7018, label: '3 campeones anteriores', type: 'special', shortLabel: '3 ganadores' },
                { n: 7019, label: '1 producto Coca-Cola', type: 'special', shortLabel: '1 Coca-Cola' },
                { n: 7020, label: '10 productos Coca-Cola', type: 'special', shortLabel: '10 Coca-Cola' },
                { n: 7021, label: '25 productos Coca-Cola', type: 'special', shortLabel: '25 Coca-Cola' },
            ]
        },
    ]
}