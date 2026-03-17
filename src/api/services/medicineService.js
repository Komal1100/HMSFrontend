import axiosInstance from "../axiosInstance";

export const addMedicine = async (appointmentId, data) => {
    const res = await axiosInstance.post(`/prescriptions/${appointmentId}`,data );
    console.log(res)
    return res;
}