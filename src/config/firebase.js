import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBRizWOAhEGJw3KFOBTo-psPP_IgSzmBqI",
  authDomain: "locoxo.firebaseapp.com",
  projectId: "locoxo",
  storageBucket: "locoxo.firebasestorage.app",
  messagingSenderId: "323899200472",
  appId: "1:323899200472:web:428d9823f9608c4f6bd8ad",
  measurementId: "G-KJCP7SCBCQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
