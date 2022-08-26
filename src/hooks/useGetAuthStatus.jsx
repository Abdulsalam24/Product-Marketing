import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";

export default function useGetAuthStatus() {
  const [logged, setLogged] = useState(false);
  const [checkStatus, setcheckStatus] = useState(true);

  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLogged(true);
        }
        setcheckStatus(false);
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return { logged, checkStatus };
}
