import Image from 'next/image'
import NavBar from '../../../../components/NavBar'
import Calendar from 'react-calendar'
import "./Calendar.css"
import TurnoCard from '../../../../components/turno/TurnoCard';
import { Card } from '@mui/material';


export default function Home() {

  const now = new Date();
  const maxima_fecha = new Date();
  maxima_fecha.setMonth(now.getMonth() + 2)

  const turnos = [{horario:"10:00",id:1},{horario:"10:20",id:2},{horario:"11:10",id:3},{horario:"11:30",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3},{horario:"11:50",id:3}]; //este arreglo va a tener los turnos de x medico

  function fetchear(){

  };

  return (
    <main className="min-h-screen">
      <div>asd</div>
    </main>
  )
}
