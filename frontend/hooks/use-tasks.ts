import { BACKEND_URL, del, post, put,get } from "@/lib/api"

export const useTasks = () => {

    const getTasks = async (filters:string, page:string, limit:string, sortField:string, sortDirection:string) => {
        const params = new URLSearchParams();
        if (filters) params.append("filters", filters);
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (sortField) params.append("sortBy", sortField);
        if (sortDirection) params.append("order", sortDirection);
        const url = `${BACKEND_URL}/tasks?${params.toString()}`;

        return await get(url)
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