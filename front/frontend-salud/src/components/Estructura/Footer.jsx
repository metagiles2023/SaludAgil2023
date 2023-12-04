"use client"

const Footer = () => {
    return (
      <div className="Footer w-full bg-[#0b636a] py-4 px-24">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" />
            <div className="font-semibold text-base xl:text-xl px-4">
              <h1>SALUD AGIL</h1>
              <h1>Estamos para brindar la mejor atención posible.</h1>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center py-2">
              <img src="/telefono.svg" alt="Telefono" className="mr-4 w-8" />
              <h1 className="text-base xl:text-xl">2494 555 3322</h1>
            </div>
            <div className="flex items-center py-2">
              <img src="/mapa.svg" alt="UbicacionMapa" className="mr-4 w-8" />
              <h1 className="text-base xl:text-xl">
                <a href="https://maps.app.goo.gl/fKXqn2S98bWKW7MS9">
                  Gimnasio Campus Universitario, UNICEN
                </a>
              </h1>
            </div>
          </div>
        </div>
            <div className="absolute right-0 text-xs">
              Desarrollado por el equipo de Metodos Agiles 2023.
            </div>
      </div>
    );
  };
  
  export default Footer;