import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

// The hook useAuth returns a boolean indicating whether the user is authenticated.
const useAuth = (): boolean => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Read the 'loggedIn' cookie; assumes 'true' is stored as a string.
        const loggedIn = Cookies.get('loggedIn') === 'true';
        setIsAuthenticated(loggedIn);
    }, []);

    return isAuthenticated;
}

export default useAuth;
