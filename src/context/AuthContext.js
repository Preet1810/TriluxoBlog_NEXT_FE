import { useContext, createContext, useState, useEffect } from "react";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../fireBase";

const AuthContext=createContext();

export const AuthContextProvider=({ children }) => {
    const [user, setUser]=useState(null);

    const emailPasswordCreateUser=(data) => {
        try {
            const response=createUserWithEmailAndPassword(auth, data.email, data.password)
            console.log(response);
            return response
        } catch (error) {
            return error;
        }
    }

    const emailPasswordSignIn=(data) => {
        try {
            const response=signInWithEmailAndPassword(auth, data.email, data.password)
            return response
        } catch (error) {
            return error;
        }

    }

    const googleSignIn=() => {
        const provider=new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const logOut=() => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe=onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut, emailPasswordCreateUser, emailPasswordSignIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth=() => {
    return useContext(AuthContext);
};