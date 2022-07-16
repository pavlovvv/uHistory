import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://uhistoryapi.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const API = {
    signAPI: {
        signUp: (email: string, password: string, name: string, type: string) => {
            return instance.post(`auth/signup`, { email, password, name, type })
                .then(response => response)
        },

        auth: (email: string, password: string) => {
            return instance.post(`auth/login`, { email, password })
                .then(response => response)
        },

        getOwnInfo: () => {
            return instance.get(`auth/checkMyOwnInfo`)
                .then(response => response)
        },

        logOut: () => {
            return instance.delete(`auth/logout`)
                .then(response => response)
        },

        continueWithGoogle: (email: string | null, name: string | null) => {
            return instance.post(`auth/continueWithGoogle`, {email, name})
                .then(response => response)
        },

        updateCurrency: (currency: string) => {
            return instance.put(`auth/updateCurrency`, {currency})
                .then(response => response)
        }
    }
}