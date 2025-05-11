import { BACKEND_URL, post } from "@/lib/api"

export const useAuthentication = () => {

    const login = async (email:string, password:string) => {
        return await post(`${BACKEND_URL}/auth/login`,JSON.stringify({email,password}))
    }

    const register = async (name:string, email:string, password:string) => {
        return await post(`${BACKEND_URL}/auth/register`,JSON.stringify({name, email,password}))
    }

    return  {
        login,
        register
    }
}