import { createContext, useContext, useEffect, useState } from "react";
import { getToken, getUserData } from "../api/services/authServices";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [loading , setLoading] = useState(true);
    useEffect(()=>{
        const token = getToken();
        if(token){
            try {
                const data =  getUserData()
                setUser(data)
            } catch (error) {
                localStorage.removeItem("token")
            }
        }
        setLoading(false)
    },[])

    const loginAuth = (userData) =>{
        setUser(userData)
    }

    const logoutAuth = ()=>{
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user , 
                                    loading , 
                                    loginAuth , 
                                    logoutAuth , 
                                    isAuthenticated : user!==null ,
                                    // Role define here
                                    isAdmin : user?.role==='admin',
                                    isPatient :  user?.role==='patient',
                                    isReceptionist:  user?.role==='receptionist',
                                    isDoctor: user?.role==='doctor'
                                    }}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = ()=>{
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used within AuthProvider")
    }

    return context;
}

