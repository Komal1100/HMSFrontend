import axiosInstance from "../axiosInstance"

export const addAppointment = async (data) => {
    console.log(data, "pos")
    const res = await axiosInstance.post("/appointments", data)

    return res
}

export const getAppointment = async () => {
    const res = await axiosInstance.get("/appointments/my")

    return res.data
}


export const getAppoById = async (id) => {
    const res = await axiosInstance.get(`/appointments/${id}`);

    return res.data
};


const getTodayDate = () => new Date().toISOString().split('T')[0];

export const getAppointmentForR = async (date = getTodayDate()) => {
    const res = await axiosInstance.get("/queue", {
        params: { date }
    });

    return res.data;
}

export const getAppointmentForD = async () => {
    const res = await axiosInstance.get("/doctor/queue");

    return res.data;
}

export const updateAppo = async (id , data) => {
    const res = await axiosInstance.patch(`/queue/${id}`,data );
    console.log(res)
    return res;
}