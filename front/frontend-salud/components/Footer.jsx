import "tailwindcss/tailwind.css";

const Footer = () => {
    return (
        <>
            <div className="w-full flex items-center bg-teal-500 py-4 absolute bottom-0 px-20">
                <div className="flex flex-grow basis-0 items-center">
                    <img src="/logo.png" alt="Logo" />
                    <a className="font-semibold text-sm px-4">
                        <h1>SALUD AGIL:</h1>
                        <h1>Estamos para brindar la mejor atención posible.</h1>
                    </a>
                </div>
                <div>
                    <div className="flex py-4">
                        <img src="/telefono.svg" alt="Telefono"></img>
                        <h1>2494 555 3322</h1>
                    </div>
                    <div className="flex py-4">
                        <img src="/mapa.svg" alt="UbicacionMapa"></img>
                        <h1>-37.323015577154074, -59.083448388477755</h1>
                    </div>
                </div>
                <div className="flex flex-grow basis-0 justify-end">
                    <h1>Desarrollado por el equipo de Metodos Agiles 2023.</h1>
                </div>
            </div>
        </>
    );
  };
  
  export default Footer;