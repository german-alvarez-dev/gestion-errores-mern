import axios from 'axios'

class CoasterService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/coasters`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }


    getCoasters() {
        return this.api.get('/getAllCoasters')
    }

    getOneCoaster(coaster_id) {
        return this.api.get(`/getOneCoaster/${coaster_id}`)
    }

    saveCoaster(coasterData) {
        return this.api.post('/saveCoaster', coasterData)
    }
}

const coastersService = new CoasterService()

export default coastersService