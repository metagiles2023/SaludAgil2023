import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
import Providers from '@/components/Providers'

import Header from '@/components/Estructura/Header';
import Footer from '@/components/Estructura/Footer';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SaludAgil',
  description: 'Desarrolado por el equipo de metodos agiles 2023',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head></head>
            <body className={inter.className}>
                <Providers>
                    <Header/>
                        {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
