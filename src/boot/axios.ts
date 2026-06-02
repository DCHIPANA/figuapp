import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

export const API_BASE = 'https://plataforma.inen.sld.pe/api/index.php'

const api = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
})

export default defineBoot(({ app }) => {
    app.config.globalProperties.$axios = axios
    app.config.globalProperties.$api = api
})

export { axios, api }