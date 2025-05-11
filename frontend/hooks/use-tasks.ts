import { BACKEND_URL, del, post, put,get } from "@/lib/api"

export const useTasks = () => {

    const getTasks = async () => {
        return await get(`${BACKEND_URL}/tasks`)
    }

    const createTask = async (title:string, description:string) => {
        return await post(`${BACKEND_URL}/tasks`,JSON.stringify({title,description}))
    }
    const updateTask = async (id:number,title:string, description:string, status:string) => {
        return await put(`${BACKEND_URL}/tasks/${id}`,JSON.stringify({title,description,status}))
    }
    const deleteTask = async (id:number) => {
        return await del(`${BACKEND_URL}/tasks/${id}`,JSON.stringify({}))
    }

    return  {
        getTasks,
        createTask,
        updateTask,
        deleteTask,

    }
}