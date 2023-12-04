"use client"
// pages/logout.jsx
import { useEffect } from 'react';
//import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
import { useSession } from 'next-auth/react';
const LogoutPage = () => {
    const { data: session } = useSession();
    //const router = useRouter();

    const handleLogout = async () => {
        // Call the signOut function to log the user out
        const res = await fetch('/api/logout', {
            //Esta es la ruta que obtenes el usuario con sus credenciales
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                other: {
                    token: (session?.user?.token) ? session.user.token : "no-token"
                },
                token: (session?.user?.token) ? session.user.token : "no-token"
            }),
        });
        
        const resp = await res.json();
        console.log(resp)
        await signOut();
        // Redirect the user to the login page
        //router.push('/login');
        window.location.href = '/';
    };

    return (
        <div>
            <CartelDescripcion mensaje="Quiere cerrar sesion?" />
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default LogoutPage;
