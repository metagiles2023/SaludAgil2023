"use client";

import React, { useEffect, useState } from 'react';
import { Login } from "@/components/login/login";
import { Register } from "@/components/registro/registro";


export default function Home() {
    const [currentForm, setCurrentForm] = useState('login');
    
    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }
    
    return (
        <div>
            <main className='flex-1 flex justify-center items-center'>
                <div></div>
                <div className="App">
                {
                     currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
                }
                </div>
                <div></div>
            </main>
        </div>     
    )
}
