import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoutes =  () =>{
    const navigate = useNavigate();
    useEffect(()=>{
        const id: string | null = localStorage.getItem('id');
        if(!id){
            navigate('/login');
        }
    },[])
    return <Outlet/>
}
 