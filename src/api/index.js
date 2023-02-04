import axios from "axios";
import { tmdbApiKey, tmdbApiBaseUrl } from "../utils/config";

export const api = axios.create({
    baseURL: tmdbApiBaseUrl,
})

const requestManager = () => {
    const language = localStorage.getItem('i18nextLng');
    const popularMovies = async () => {
        try {
            const response = await api.get("movie/popular?api_key=" + tmdbApiKey + "&language=" + language)
            return {
                data: response.data
            }
        } catch (err) {
            return { error: err }
        }
    }

    const nowPlaying = async (page) => {
        try {
            const response = await api.get("movie/now_playing?api_key=" + tmdbApiKey + "&language=" + language + "&page=" + page)
            return {
                data: response.data
            }
        } catch (err) {
            return { error: err }
        }
    }

    const topRatedMovies = async () => {
        try {
            const response = await api.get("movie/top_rated?api_key=" + tmdbApiKey + "&language=" + language)
            return {
                data: response.data
            }
        } catch (err) {
            return { error: err }
        }
    }

    const detailMovies = async (id) => {
        try {
            const response = await api.get("movie/" + id + "?api_key=" + tmdbApiKey + "&language=" + language)
            return {
                data: response.data
            }
        } catch (err) {
            return { error: err }
        }
    }

    const profileDetail = async (id) => {
        try {
            const response = await api.get("person/" + id + "?api_key=" + tmdbApiKey + "&language=" + language)
            return {
                data: response.data
            }
        } catch (err) {
            return { error: err }
        }
    }

    const movieTeam = async (id) => {
        try {
            const response = await api.get("movie/" + id + "/credits" + "?api_key=" + tmdbApiKey + "&language=" + language)
            return {
                data: response.data
            }
        } catch (err) {
            return { error: err }
        }
    }
    const getProfileImage = async (id) => {
        try {
            const response = await api.get("person/" + id + "/images" + "?api_key=" + tmdbApiKey)
            return {
                data: response.data
            }
        } catch (err) {
            return { error: err }
        }
    }
    const search = async (title) => {
        try {
            const response = await api.get("search/company?api_key=" + tmdbApiKey + "&language=" + language + "&query=" + title)
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