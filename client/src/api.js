import axios from "axios"

export default {
    films: {
        fetchAll: () => axios.get("/api/films").then(res => res.data.films),
        create: (film) => axios.post("/api/films", {film}).then(res => res.data.film)
    },
}