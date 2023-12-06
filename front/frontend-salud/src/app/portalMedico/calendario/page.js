"use client"
import React from 'react'

import PacienteCard from '@/components/Calendario/PacienteCard'
import Calendar from 'react-calendar'
import "./Calendar.css"
import { useState } from 'react';
import { useSession } from 'next-auth/react'; // Import useSession hook
import {useEffect } from 'react';

export default function mostrarTurnosMedico() {
    const now = new Date();
    const maxima_fecha = new Date();
    maxima_fecha.setMonth(now.getMonth() + 2)
    const [selectedDate, setSelectedDate] = useState(null);
    const [data, setData] = useState(null);
    //sesion
    const { data: session } = useSession(); // useSession hook to get the current user
    const [token, setToken] = useState([])
    
 

    useEffect(() => {
      let user = session?.user
      let token = user && user.token ? user.token : "no-token-for-fichasmedicasfiltradas"
      setToken(token)
    }, [session])
/*
    const handle = ((dia,mes) =>{
      mes += 1;
      fetch(`/api/portalmedico/calendario?dia=${dia}&mes=${mes}`,{
          method: 'POST',
          body: JSON.stringify({token: token})
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
*/
    const handle = ((dia,mes) =>{
  
            mes+=1;
            console.log("dia");
            console.log(dia);
            console.log(mes);
            fetch(`/api/portalmedico/calendario?dia=${dia}&mes=${mes}`,{
                method: 'POST',
                body: JSON.stringify({token: token})
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

      <main className='flex-1 flex'>
        <div className='flex-1 flex justify-center items-center'>
          <div className='flex w-5/6 h-[50vh] justify-center items-center'>
            <Calendar
              minDate={now}
              maxDate={maxima_fecha}
              onClickDay={(day) =>{
                setSelectedDate(day)
                const selectedDay = day.getDate();
                const selectedMonth = day.getMonth();
                handle(selectedDay,selectedMonth)}}
            />
          </div>
        </div>
        <div className='flex-1 flex items-center'>
          <div className='flex h-[50vh] w-full justify-center items-center rounded-3xl bg-cyan-400 text-2xl m-5'>
            <div className="flex h-5/6 w-11/12  overflow-y-auto">
              <ul className='flex flex-col w-full text-center'>
                  {data &&
                    data.map((turno) => {
                      return (
                          <PacienteCard
                            key={turno.id}
                            id={turno.id}
                            horario={turno.date}
                            paciente={turno.paciente !== null ? turno.paciente.nombre + " " + turno.paciente.apellido : "Libre"}
                          />
                      );
                    })
                  }
              </ul>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}