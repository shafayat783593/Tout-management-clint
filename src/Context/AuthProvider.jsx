import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { auth } from '../Firebase/Firebase-init'
import axios from 'axios'

function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log(user)




    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUser = updatedData => {
        return updateProfile(auth.currentUser, updatedData)
    }

    const provider = new GoogleAuthProvider()



    const googleLogin = () => {
        return signInWithPopup(auth, provider);
    };
    const logOut = () => {
        return signOut(auth)
    }

    // github login...........
    const gitprovider = new GithubAuthProvider()
    const github = () => {
        return signInWithPopup(auth, gitprovider)
    }
    // forget passwordd................
    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log(currentUser?.email)

            if (currentUser?.email) {
                axios.post("https://tour-management-server-ashen.vercel.app/jwt", {
                    email: currentUser?.email
                }).then(res => {

                })
            }
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        loading,
        setLoading,
        updateUser,
        googleLogin,
        github,
        forgetPassword
    }

    return <AuthContext value={authData}>
        {children}
    </AuthContext>
}

export default AuthProvider
