const Footer = () => {
    return (
        <>
            <div className="w-full flex items-center bg-[#0b636a] py-4 bottom-0 px-24 basis-0">
                <div className="flex flex-grow basis-0 items-center">
                    <img src="/logo.png" alt="Logo" />
                    <a className="font-semibold text-sm px-4">
                        <h1>SALUD AGIL</h1>
                        <h1>Estamos para brindar la mejor atención posible.</h1>
                    </a>
                </div>
                <div>
                    <div className="flex items-center py-2">
                        <img src="/telefono.svg" alt="Telefono" className="mr-4 w-8"/>
                        <h1>2494 555 3322</h1>
                    </div>
                    <div className="flex items-center py-2">
                    <img src="/mapa.svg" alt="UbicacionMapa" className="mr-4 w-8" /> 
                        <h1><a href="https://maps.app.goo.gl/fKXqn2S98bWKW7MS9">Gimnasio Campus Universitario, UNICEN</a></h1>
                    </div>
                </div>
            </div>
            <div className="flex justify-end absolute bottom-0 right-0">
                <h1 className="text-xs">Desarrollado por el equipo de Metodos Agiles 2023.</h1>
            </div>
        </>
    );
  };
  
  export default Footer;