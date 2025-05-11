import { BACKEND_URL, get } from "@/lib/api"

export const useUser = () => {

    const getMe = async () => {
        return await get(`${BACKEND_URL}/user/me`)
    }

    return  {
        getMe
    }
}