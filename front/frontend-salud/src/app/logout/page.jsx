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
        <div className='flex flex-col min-h-screen item-center justify-center w-full'>
            <div className='flex justify-center'>
                <h1 className='text-3xl bg-white mb-4 p-2 rounded-[20px] font-bold' >¿Quieres cerrar sesion?</h1>
            </div>
            <div className='flex justify-center'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring focus:ring-blue-300' onClick={handleLogout}>Log Out</button>

            </div>
        </div>
    );
};

export default LogoutPage;
