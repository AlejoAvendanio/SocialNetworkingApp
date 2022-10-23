import {createContext, useContext, useState, useEffect} from "react"
import {auth} from '../firebase/config'
import { createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useDispatch } from "react-redux";
import { postUser } from '../Redux/actions'

const userAuthContext = createContext();

export function UserAuthContextProvider({children}) {
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    function signUp(username, email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function googleLogIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider)
    }
    function logIn(email, password) {
        
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            const tuser = currentUser;
            if (tuser && (tuser.metadata.creationTime == tuser.metadata.lastSignInTime)) {
                console.log('creating user')
                const userconfig = {
                    email:'',
                    name:tuser.displayName,
                    image:'https://avatars.githubusercontent.com/u/16511727?v=4',
                }
    
                userconfig.email = tuser.email
                if (tuser.name != null) userconfig.name = tuser.displayName;
                if (tuser.photoURL != null) userconfig.image = tuser.photoURL;
    
                dispatch(postUser(userconfig, tuser.accessToken))
            }
            
            setUser(currentUser);
        })
        return () => {
            unsubscribe();
        }
    },[]);
    return <userAuthContext.Provider value={{user, signUp, logIn, googleLogIn}}>{children}</userAuthContext.Provider>
    
}

export function useUserAuth() {
    return useContext(userAuthContext)
}