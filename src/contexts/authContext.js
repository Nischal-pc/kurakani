import { createContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth as FirebaseAuth, db } from "../firebase";

export const AuthContext = createContext();

const initialState = {
    user: null,
    errors: []
}
export default function AuthContextProvider({ children }){
    const [auth, setAuth] = useState(initialState);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, "users");
                const usersSnapshot = await getDocs(usersCollection);
                const usersList = usersSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(usersList)
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers();
    }, []);

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
        <AuthContext.Provider value={{auth, users,  loginUser, createUser, logoutUser}}>

            {children}
        </AuthContext.Provider>
    )
}