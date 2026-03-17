import axiosInstance from "../axiosInstance"

export const loginApi = async (data) => {

    const res = await axiosInstance.post("/auth/login", data)
    if (!res.data.error) {
        // const token = res.data.data.token;
        const token = res.data.token;
        localStorage.setItem('token', token);

        // const payload = JSON.parse(atob(token.split('.')[1]));

        // localStorage.setItem('user', JSON.stringify(payload));
        localStorage.setItem('user' , JSON.stringify(res.data.user))
    }
    return res
}
export const registerApi = (data) => {
    return axiosInstance.post("/users/regoster", data)
}

export const getUserData = () => {
    const data = localStorage.getItem('user');
    if (!data) return null;

    const parsedData = JSON.parse(data);
    console.log("User Data:", parsedData); 
    return parsedData;
}
export const getToken = () => {
    return localStorage.getItem("token")
}