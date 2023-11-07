import { useState } from "react";
import "./TurnoCardReservar.css"
import Popup from '@/components/Turno/Popup';

const TurnoCard = (props) => {
    const aux = props.horario;
    //const aux = props.horario.split("T")[1].split(":");
    const minutosFormateados = (aux.getMinutes() === 0) ? "00" : aux.getMinutes();

    const hora = aux.getHours() +  ":"  + minutosFormateados;
    
    
    const handleClick = () => {
        
        props.onClick({ idTurno: props.id, idUsuario: 2 });
      };

    return (
        <div className="m-3 my-button my-button:hover my-button:active" > 
            <button onClick={handleClick}>
                {hora}
            </button>

        </div>
    );
};
  
  
  export default TurnoCard;