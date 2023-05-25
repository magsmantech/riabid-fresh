import Axios from 'axios'

const axios = Axios.create({
    baseURL: "https://api.riabid.com/api/",
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    }
})

export default axios
