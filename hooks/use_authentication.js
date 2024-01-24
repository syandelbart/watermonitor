// useAuthentication.js
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

export default function useAuthentication() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        console.log("uid", uid);
        setCurrentUser(user);
      } else {
        // User is signed out
        console.log("user is logged out");
        setCurrentUser(null);
      }
    });
    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return {
    user: currentUser,
  };
}
