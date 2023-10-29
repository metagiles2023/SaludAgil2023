"use client"
import NavBar from '@/components/NavBar/NavBar'
import Header from '@/components/Estructura/Header'
import Footer from '@/components/Estructura/Footer'
import TurnoCard from '@/components/Turno/TurnoCardReservar';
import Calendar from 'react-calendar'
import "./Calendar.css"
import { useState,useEffect } from 'react';

export default function turnosdisponibles() {
    const now = new Date();
    const maxima_fecha = new Date();
    maxima_fecha.setMonth(now.getMonth() + 2)

    const [selectedDate, setSelectedDate] = useState(null);
    const [data, setData] = useState(null);

   const handle = ((dia,mes,user) =>{
        mes += 1;
        
        fetch(`/api/turnosdisponibles?dia=${dia}&mes=${mes}`,{
          method: 'GET',
        })
        .then(async (res) => {
          const data = await res.json();
          console.log(data);
          setData(data);
        })
    })


  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='flex m-10'>
          <Calendar
            minDate={now}
            maxDate={maxima_fecha}
            onClickDay={(day) =>{
              setSelectedDate(day)
              const selectedDay = day.getDate();
              const selectedMonth = day.getMonth();
              handle(selectedDay,selectedMonth,1)}}
          />
          <div>
          { data &&
            data.map((turno) => {
              return <TurnoCard key={turno.id} id={turno.id} horario={turno.date}/>
            })
            
          }
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}