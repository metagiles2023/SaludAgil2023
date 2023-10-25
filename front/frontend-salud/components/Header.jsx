import "tailwindcss/tailwind.css";
import Link from "next/link";

const Header = () => {
    return (
        <>
            <div className="w-full h-20 flex items-center justify-between bg-[#0bb5c2] px-9">
                <Link href="/turnos">
                    <div className= "flex items-center">
                        <img src="/logo.png" alt="Logo" className="h-16"></img>                    
                        <h1 className="font-semibold text-5xl px-4"> SaludAgil</h1>
                    </div>
                </Link>
                <div className= "flex items-center">
                    <img className="px-8" src="/notificacion.svg" alt="Notificaciones"></img>
                    <img src="/usuario.svg" alt="Usuario"></img>
                </div>
            </div>
            <img className="absolute bottom-0 w-full h-full -z-10" src="/fondo.png"></img>
        </>
    );
  };
  
  export default Header;