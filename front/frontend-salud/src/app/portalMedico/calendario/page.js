"use client"
import React from 'react'
import Header from '@/components/Estructura/Header'
import Footer from '@/components/Estructura/Footer'
import PacienteCard from '@/components/Calendario/PacienteCard'
import Calendar from 'react-calendar'
import "./Calendar.css"
import { useState } from 'react';

export default function mostrarTurnosMedico() {
    const now = new Date();
    const maxima_fecha = new Date();
    maxima_fecha.setMonth(now.getMonth() + 2)
    const [selectedDate, setSelectedDate] = useState(null);
    const [data, setData] = useState(null);

    const handle = ((dia,mes,user) =>{
            mes += 1;
            fetch(`/api/portalmedico?dia=${dia}&mes=${mes}&idMedico=${1}`,{
                method: 'GET',
              })
            .then(async (res) => {
            const data = await res.json();
            console.log(data);
            data.forEach(element => {
                element.date = new Date(element.date);
            });
            data.sort((a,b) => { return a.date - b.date})
            console.log(data);
            setData(data);
            })
            
    })

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 flex'>
        <div className='flex-1 flex justify-center items-center'>
          <div className='flex w-5/6 h-5/6 justify-center items-center'>
            <Calendar
              minDate={now}
              maxDate={maxima_fecha}
              onClickDay={(day) =>{
                setSelectedDate(day)
                const selectedDay = day.getDate();
                const selectedMonth = day.getMonth();
                handle(selectedDay,selectedMonth,1)}}
            />
          </div>
        </div>
        <div className='flex-1 flex items-center'>
          <div className='flex h-5/6'>
            <div className='flex flex-col'>
              <div>
                <h1 className='text-2xl font-bold text-black'>Horarios:</h1>
                <div className='flex gap-16'>
                  <div className="flex items-center py-5 gap-4">
                    <div className="text-black text-xl font-bold">Desde:</div>
                    <div className="flex w-full h-12 bg-[#ebffff] shadow-[0px_20px_4px_#00000040] rounded-[30px] justify-between items-center px-5">
                      <span className="font-medium text-gray-500 px-5">Seleccione un horario</span>
                      <img className="w-6" alt="Seleccionar" src="/down_arrow.svg" />
                    </div>
                    <img className="w-6" alt="Lupa" src="/search_icon.svg" />
                  </div>
                  <div className="flex items-center py-5 gap-4">
                    <div className="text-black text-xl font-bold">Hasta:</div>
                    <div className="flex w-full h-12 bg-[#ebffff] shadow-[0px_20px_4px_#00000040] rounded-[30px] justify-between items-center px-5">
                      <span className="font-medium text-gray-500 px-5">Seleccione un horario</span>
                      <img className="w-6" alt="Seleccionar" src="/down_arrow.svg" />
                    </div>
                    <img className="w-6" alt="Lupa" src="/search_icon.svg" />
                  </div>
                </div>
              </div>
              <div className='flex h-2/3 justify-center items-center rounded-3xl bg-cyan-400 text-2xl '>
                <div className="flex h-5/6 w-11/12 overflow-y-auto">
                  <div className='flex flex-col w-full text-center'>
                      {data &&
                        data.map((turno) => {
                          return (
                            <div className='w-1/8'>
                              <PacienteCard
                                key={turno.id}
                                id={turno.id}
                                horario={turno.date}
                                paciente={turno.paciente !== null ? turno.paciente.nombre + " " + turno.paciente.apellido : "Libre"}
                              />
                            </div>
                          );
                        })
                      }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}