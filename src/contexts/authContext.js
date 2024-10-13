import { createContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth as FirebaseAuth } from "../firebase";

export const AuthContext = createContext();

const initialState = {
    user: null,
    errors: []
}
export default function AuthContextProvider({ children }){
    const [auth, setAuth] = useState(initialState);

    const loginUser = async(formData) => {
        try{
            signInWithEmailAndPassword(
                FirebaseAuth, formData.email, formData.password
            ).then(userCredential => {
                const user = userCredential.user;
                setAuth({user: user.providerData, errors: []});
            })
        }catch(error){
            setAuth(auth => ({
                ...auth,
                errors: [...auth.errors, error.message]
            }));
        }
    }

    const createUser = async () => {

    }

    const logoutUser = async() => {
        setAuth(initialState);
    }

    return(
        <AuthContext.Provider value={{auth,  loginUser, createUser, logoutUser}}>

            {children}
        </AuthContext.Provider>
    )
}