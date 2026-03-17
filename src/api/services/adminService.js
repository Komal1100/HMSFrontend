import axiosInstance from "../axiosInstance"

export const getClinicInfor = async ()=>{
    const res = await axiosInstance.get("/admin/clinic")

    return res.data
}

export const getUsers = async ()=>{
    const res = await axiosInstance.get("/admin/users")

    return res.data
}

export const addUser = async (data)=>{
    const res = await axiosInstance.post("/admin/users" , data)
    
    return res
}

