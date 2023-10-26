const TurnoCard = (props) => {
    const aux = props.horario.split("T")[1].split(":");
    const hora = aux[0] +  ":"  +aux[1];

    const handle = (idTurno,idUsuario) =>{
        const body = {"id": idTurno,"idUsuario": idUsuario}
        console.log("reservando turno..." + "idTurno: " + idTurno);
        fetch("/api/turnosdisponibles/reservar",{
            method: "POST",
            body: JSON.stringify(body)
        })
    };

    return (
        <div className="m-10 ">
            <div className="bg-blue-500 p-5">
                <p>Hora: {hora}</p>
                <p>Id Turno: {props.id}</p>
            </div>
            
            <button onClick={() => {handle(props.id,2)}}>Reservar</button>
        </div>
    );
};
  
  
  export default TurnoCard;