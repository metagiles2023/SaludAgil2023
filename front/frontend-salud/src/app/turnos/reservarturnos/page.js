'use client'
import Header from "@/components/Estructura/Header";
import Footer from "@/components/Estructura/Footer";
import AutoComplete from "@/components/Turno/AutoComplete";
import { useState } from 'react';
import MedicoCard from "@/components/Turno/MedicoCard";
export default function ReservarTurnos() {
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(null);
    const [medicos, setMedicos] = useState(null);
    const handleEspecialidadChange = (newValue) => {
      setEspecialidadSeleccionada(newValue);
      console.log(`Especialidad seleccionada: ${newValue}`);
      if(newValue != null){
          fetch(`/api/turnosdisponibles/medicos?especialidad=${newValue}`,{
            method: 'GET',
          })
          .then(async (res) => {
                const data = await res.json();
                console.log(data);
                setMedicos(data);
            });
      }
    };


    return (
        <>
            <div className="flex flex-col min-h-screen">
                
                <main className="flex-1 flex flex-col justify-center items-center ">
                    <div className="flex items-center py-4 md:py-8 lg:py-20 xl:py-28 2xl:py-32 gap-8">
                        <div className="text-black text-2xl font-bold">Especialidad:</div>
                            <AutoComplete
                                onEspecialidadChange={handleEspecialidadChange}
                            />
                        <div className="flex w-full h-12 bg-[#ebffff] shadow-[0px_20px_4px_#00000040] rounded-[30px] justify-between items-center px-5">
                        </div>
    
                    </div>
                    <div className="flex flex-1 justify-center ">
                      <div className="flex h-2/3 gap-10">
                        { medicos &&
                          medicos.map((medico) => {
                            return <div>
                              <MedicoCard
                                idUsuario={medico.idUsuario}
                                nombre={medico.nombre}
                                apellido={medico.apellido}
                              />  
                            </div>
                          })
                        }
                      </div>
                    </div>
                </main>
                
            </div>
        </>
    )
}
