"use client";
import Header from '@/components/Estructura/Header';
import Footer from '@/components/Estructura/Footer';
import React, { useState } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
import { Login } from "@/components/login/login";
import { Register } from "@/components/registro/registro";

export default function Home() {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }
    return (
        <div>
            <Header />
            <main className='flex-1 flex justify-center items-center'>
                <div></div>
                <div className="App">
                {
                     currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
                }
                </div>
                <div></div>
            </main>
            <Footer />
        </div>     
    )
}
