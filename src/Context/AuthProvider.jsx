import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { auth } from '../Firebase/Firebase-init'

function AuthProvider({children}) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log(user)

    console.log(loading, user)

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
        return signInWithPopup(auth, provider); // both arguments are required
      };
    const logOut = () => {
        return signOut(auth)
    }

    // github login...........
    const gitprovider = new GithubAuthProvider()
    const github =()=>{
        return signInWithPopup(auth,gitprovider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
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
        github
    }

   return <AuthContext value={authData}>
        {children}</AuthContext>
}

export default AuthProvider
