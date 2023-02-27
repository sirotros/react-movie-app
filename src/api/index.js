
import axios from "axios";
import { tmdbApiBaseUrl } from "../utils/config";
const key = JSON.parse(localStorage.getItem("api_key"))

export const api = axios.create({
    baseURL: tmdbApiBaseUrl,
    params: {
        api_key: key,
    }
})

const requestManager = () => {
    const language = localStorage.getItem('i18nextLng');
    const popularMovies = async () => {
        try {
            const response = await api.get("movie/popular", { params: { language } })
            return {
                data: response.data
            }
        } catch (err) {
            return { error: err }
        }
    }

    const nowPlaying = async (page) => {
        try {
            const response = await api.get("movie/now_playing", { params: { language, page: page } })
            return {
                data: response.data
            }
        } catch (err) {
            return { error: err }
        }
    }

    const topRatedMovies = async () => {
        try {
            const response = await api.get("movie/top_rated", { params: { language } })
            return {
                data: response.data
            }
        } catch (err) {
            return { error: err }
        }
    }

    const detailMovies = async (id) => {
        try {
            const response = await api.get("movie/" + id, { params: { language } })
            return {
                data: response.data
            }
        } catch (err) {
            return { error: err }
        }
    }

    const profileDetail = async (id) => {
        try {
            const response = await api.get("person/" + id, { params: { language } })
            return {
                data: response.data
            }
        } catch (err) {
            return { error: err }
        }
    }

    const movieTeam = async (id) => {
        try {
            const response = await api.get("movie/" + id + "/credits")
            return {
                data: response.data
            }
        } catch (err) {
            return { error: err }
        }
    }
    const getProfileImage = async (id) => {
        try {
            const response = await api.get("person/" + id + "/images")
            return {
                data: response.data
            }
        } catch (err) {
            return { error: err }
        }
    }
    const search = async (title) => {
        try {
            const response = await api.get("search/company", { params: { language, query: title } })
            return {
                data: response.data
            }
        } catch (err) {
            return { error: err }
        }
    }
    return { popularMovies, nowPlaying, topRatedMovies, detailMovies, profileDetail, movieTeam, search, getProfileImage }
}
export default requestManager;  