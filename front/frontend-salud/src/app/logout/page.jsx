"use client"
// pages/logout.jsx
import { useEffect } from 'react';
//import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';

const LogoutPage = () => {
    //const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {
            // Call the signOut function to log the user out
            await signOut();
            // Redirect the user to the login page
            //router.push('/login');
            window.location.href = '/';
        };

        // Call the logout function when the component mounts
        handleLogout();
    }, []); // [router]

    return (
        <div>
            <CartelDescripcion mensaje="Ha cerrado sesion." />
        </div>
    );
};

export default LogoutPage;
