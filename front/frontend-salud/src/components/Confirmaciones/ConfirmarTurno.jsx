"use client"
import React, { useState } from 'react';

const ConfirmarTurno = () => {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const mostrarDivDeConfirmacion = () => {
    setMostrarConfirmacion(true);
  };

  const ocultarDivDeConfirmacion = () => {
    setMostrarConfirmacion(false);
  };

  return (
    <div className="relative">
      <button className="text-black text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold" onClick={mostrarDivDeConfirmacion}>Mostrar Confirmación</button>
      
      {mostrarConfirmacion && (
        <div className="fixed flex justify-center items-center top-0 left-0 w-full min-h-screen bg-black/50 text-5xl text-white z-10">
          <div className="flex flex-col w-1/2">
            <div className="w-full h-full rounded-[30px] px-20 py-10 bg-[#ecffff]">
              <div className="flex flex-col justify-center text-black font-bold ">¿Desea confirmar el turno?</div>
              <div className="text-black text-center text-4xl font-semibold my-4">
                Viernes 26 de octubre de 2023
                <br />
                a las 8:30 hs.
              </div>
              <div className="flex flex-col text-black text-center font-bold gap-y-2"> Confirmar datos:
                <div className='flex'>
                  <div className="flex justify-end w-1/6 text-black text-center text-4xl font-semibold mr-5">Telefono:</div>
                  <div className="flex w-2/3 justify-center items-center rounded-full border-4 border-black text-[#818181] text-center text-xl font-medium ">
                    222 4444 333
                  </div>
                </div>
                <div className='flex'>
                  <div className="flex justify-end w-1/6 text-black text-center text-4xl font-semibold mr-5">Email:</div>
                  <div className="flex w-2/3 justify-center items-center rounded-full border-4 border-black text-[#818181] text-center text-xl font-medium">
                    ejemplo@mail.com
                  </div>
                </div>
              </div>
              <div className='flex justify-between mt-10'>
                <button onClick={ocultarDivDeConfirmacion}>
                  <img src="/btnCancelar.svg" alt="Boton Cancelar turno" />
                </button>
                <button onClick={ocultarDivDeConfirmacion}> 
                  <img src="/btnConfirmar.svg" alt="Boton Confirmar turno" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmarTurno;