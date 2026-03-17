import axiosInstance from "../axiosInstance";

export const addReport = async (appointmentId, data) => {
    const res = await axiosInstance.post(`/reports/${appointmentId}`,data );
    console.log(res)
    return res;
}