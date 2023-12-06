const PacienteCard = (props) => {
    const aux = props.horario;
    const paciente = props.paciente;
    //const aux = props.horario.split("T")[1].split(":");
    const minutosFormateados = (aux.getMinutes() === 0) ? "00" : aux.getMinutes();

    const hora = aux.getHours() +  ":"  + minutosFormateados;
    
    const buttonStyle = {
        backgroundColor: paciente !== "Libre" ? "#4CAF50" : "#699BE8",
    };

    return (
        <li className=" parche m-1 bg-[#699BE8] text-black font-bold cursor-pointer px-5 py-2.5 rounded-[5px] border-[3px] border-black hover:bg-[#446380] active:bg-[#699BC9]" style={buttonStyle}> 
                {hora} - {paciente}
        </li>
    );
};
  
  
  export default PacienteCard;