export const changeTitle = (title) => {
    return document.title = title
}
export const validateApiKey = async (apiKey) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${apiKey}`)
    return response.status !== 401
}

export const setApiKey = (apiKey) => {
    return localStorage.setItem("api_key", JSON.stringify(apiKey))
}