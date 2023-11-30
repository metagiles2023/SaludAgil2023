"use client"
import Header from '@/components/Estructura/Header'
import Footer from '@/components/Estructura/Footer'

export default function Home() {
    const userDataString = sessionStorage.getItem('userData')
    if (userDataString) {
        // Parse the JSON data
        const userData = JSON.parse(userDataString);

        // Now you can use userData in your component
        console.log('xd!')
        console.log(userData);
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className='flex-1 flex justify-center items-center'>
                </main>
                <Footer />
            </div>
        )
    } else {
        // No user data found in sessionStorage
        console.log('User data not found.');
        return (
            <div>
                <h1> Primero inicie sesion</h1>
            </div>
        )
    }
    
}
