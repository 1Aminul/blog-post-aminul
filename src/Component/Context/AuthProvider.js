import { useQuery } from '@tanstack/react-query';
import React, { createContext, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, 
    signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import { useEffect } from 'react';
import app from '../firebase.config';


const auth = getAuth(app)
export const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const profileUpdate = (name, url)=>{
        setLoading(true)
        return updateProfile(auth.currentUser,{
            displayName: name, photoURL: url
        })
    }
    const LogIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const LogOut = ()=>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false)
        })
        return ()=> unsubscribe();
        
    }, [])


    const {data: users = []} = useQuery({
        queryKey: ["users"],
        queryFn: async ()=>{
            const res = await fetch(`https://blog-server-jade.vercel.app/user`);
            const data = await res.json();
            return data;
        }
    })
    console.log(users)
  
    const authinfo = {
        createUser, LogIn, LogOut, profileUpdate, user, loading, users
    }
    return (
        <AuthContext.Provider value= {authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;