"use client"
import Link from "next/link";
import NavBar from "../NavBar/NavBar";

const Header = () => {
    return (
        <>
            <div className="Header flex top-0 left-0 w-full h-20 items-center justify-between bg-[#0bb5c2] px-9">
                <div className="flex gap-5">
                    <Link  href="/turnos" className= "flex items-center">
                        <img src="/logo.png" alt="Logo" className="h-16"></img>                    
                        <h1 className="font-semibold text-5xl xl:text-6xl px-4"> SaludAgil</h1>
                    </Link>
                    <NavBar/>
                </div>
                <div className= "flex items-center">
                    <img className="px-8" src="/notificacion.svg" alt="Notificaciones"></img>
                    <img src="/usuario.svg" alt="Usuario"></img>
                </div>
            </div>
            <img className="fixed top-0 left-0 w-full h-screen object-cover -z-10" src="/fondo.png" alt="Fondo"></img>
        </>
    );
  };
  
  export default Header;