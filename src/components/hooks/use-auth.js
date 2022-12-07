import { useSelector } from "react-redux";

export function useAuth(){

    // const saved = localStorage.getItem("email");
    const {email, token, id}=useSelector(state=>state.user)
    
    return{
        isAuth: !!email,
        email,
        token,
        id,
    };
    
}

