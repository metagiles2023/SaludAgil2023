import "tailwindcss/tailwind.css";

const Header = () => {
    return (
        <>
            <div className="w-full h-20 flex items-center justify-between bg-teal-500 px-9">
                <div className= "flex items-center">
                    <img src="/logo.png" alt="Logo" className="h-16"></img>                    
                    <a className="font-semibold text-5xl px-4"> SaludAgil</a>
                </div>
                <div className= "flex items-center">
                    <img className="px-8" src="/notificacion.svg" alt="Notificaciones"></img>
                    <img src="/usuario.svg" alt="Usuario"></img>
                </div>
            </div>
        </>
    );
  };
  
  export default Header;