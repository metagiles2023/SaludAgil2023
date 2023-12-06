"use client"
import React from 'react'
import Header from '@/components/Estructura/Header'
import Footer from '@/components/Estructura/Footer'
import TurnoCard from '@/components/Turno/TurnoCardReservar';
import Calendar from 'react-calendar'
import "./Calendar.css"
import { useState,useEffect } from 'react';
import Popup from '@/components/Turno/Popup';
import { Alert, Snackbar,CircularProgress, LinearProgress } from '@mui/material';
import { useSession } from 'next-auth/react'; // Import useSession hook


export default function turnosdisponibles({params}) {
    //sesion
    const { data: session } = useSession(); // useSession hook to get the current user
    const [token, setToken] = useState([])

    const now = new Date();
    const maxima_fecha = new Date();
    maxima_fecha.setMonth(now.getMonth() + 2)
    const [openPopup,setOpenPopup] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [data, setData] = useState(null);
    const [openSnack, setOpenSnack] = useState(false);
    const [typeSnack, setTypeSnack] = useState("success");
    const [textSnack, setTextSnack] = useState("Turno reservado con exito!");
    const [loadingSnack, setLoadingSnack] = useState(true);
    const [idTurno,setIdTurno] = useState(0);
    const horizontal = 'center';
    const vertical = 'bottom';

    useEffect(() => {
      let user = session?.user
      let token = user && user.token ? user.token : "no-token-for-fichasmedicasfiltradas"
      setToken(token)
    }, [session])



   const handle = ((dia,mes,user) =>{
        mes += 1;
        let idMedico = params.id;
        fetch(`/api/turnosdisponibles?dia=${dia}&mes=${mes}&idMedico=${params.id}`,{
          method: 'GET',
        })
        .then(async (res) => {
          const data = await res.json();
          console.log(data);
          data && data.forEach && data.forEach(element => {
            element.date = new Date(element.date);
          });
          data.sort((a,b) => { return a.date - b.date})
          console.log(data);
          setData(data);
        })
    })

  const handlePopUpSubmit = (data) => {
    console.log("click en confirmar");
    console.log(data);
    setOpenPopup(false);
    handlePOST(data.idTurno,data.idUsuario,data.email,data.telefono);
    setOpenSnack(true);
  };

  const handlePOST = (idTurno,idUsuario,email,telefono) =>{
    const body = {"id": idTurno,"idUsuario": idUsuario,"email": email,"telefono":telefono};

    // fetch("/api/turnosdisponibles/reservar",{
    //     method: "POST",
    //     body: JSON.stringify(body)
    // })
    // .then(async (res) => {
    //     const data = await res.json();
    //     if(data == null){
    //       setTypeSnack("error");
    //       setTextSnack("No se pudo reservar el turno!");
    //       setTypeSnack("error");
    //       console.log("ERROR al reservar turno");
    //     }
    //     setLoadingSnack(false);
        
    // })
    fetch("/api/turnosdisponibles/reservar", {
        method: "POST",
        body: JSON.stringify({
           other: body,
           token: token})
    })
        .then(async (response) => {
            console.log('ha llegado la respuesta de la api del front');
            console.log(response);
            const data = await response.json();
            if (response.status >= 400) {
                setTypeSnack("error");
                setTextSnack("No se pudo reservar el turno!");
                setTypeSnack("error");
                console.log("ERROR al reservar turno: " + data.error);
            } else {
                setLoadingSnack(false);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};


  const handleTurnoCardClick = (data) => {
    setIdTurno(data.idTurno);
    setOpenPopup(true);
  };


  return (
    <div className='flex flex-col min-h-screen'>
      
      <main className='flex-1 flex'>
        <div className='flex-1 flex justify-center items-center'>
          <div className='flex w-2/3 h-2/3 justify-center items-center'>
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


        <div className=' flex-col justify-center flex-1 flex items-center m-5'>
              <div className='flex'>
                <h1 className='text-2xl font-bold text-black'>Horarios:</h1>
                
              </div>
          <div className='flex h-[50vh] w-full justify-center items-center rounded-3xl bg-cyan-400 text-2xl m-5'>
            <div className='flex flex-col'>
              <div className='flex-1 flex w-full h-full justify-center items-center rounded-3xl bg-cyan-400 text-2xl'>
                <div className='flex flex-wrap'>
                    { data &&
                      data.map((turno) => {
                        return <div className='w-1/8'>
                          <TurnoCard key={turno.id} id={turno.id} horario={turno.date}
                            onClick={handleTurnoCardClick}
                          />  
                        </div>
                      })
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
        <Popup
          openPopup = {openPopup}
          setOpenPopup = {setOpenPopup}
          idTurno = {idTurno}
          idUsuario = {2}
          onSubmit={handlePopUpSubmit}>
        </Popup>
        <Snackbar
          open={openSnack}
          autoHideDuration={4000}
          anchorOrigin={{vertical, horizontal}}
          key={vertical + horizontal}
          >
          {loadingSnack ? (
            <Alert severity="info">
              <LinearProgress />
              Reservando turno...
            </Alert>
          ) :
          (
          <Alert severity={typeSnack}>
            {textSnack}
          </Alert>)}
          
        </Snackbar>
      </main>
      
    </div>
  )
}