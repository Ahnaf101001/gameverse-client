import { createContext, useContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import auth from "../firebase/firebase.init";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signInWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const logOut = () => {
    setIsAdmin(false);
    setLoading(true);
    return signOut(auth);
  };

  // Check admin status whenever user changes
  useEffect(() => {
    const checkAdmin = async (email) => {
      if (!email) {
        setIsAdmin(false);
        return;
      }
      try {
        const res = await fetch(`${SERVER}/admins/check?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        setIsAdmin(data.isAdmin || false);
      } catch {
        setIsAdmin(false);
      }
    };

    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      checkAdmin(currentUser?.email);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    isAdmin,
    createUser,
    signInUser,
    signInWithGoogle,
    signInWithGithub,
    logOut,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};

// convenience hook
export const useAuth = () => useContext(AuthContext);
