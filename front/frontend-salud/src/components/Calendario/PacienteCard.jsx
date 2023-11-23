const PacienteCard = (props) => {
    const aux = props.horario;
    const paciente = props.paciente;
    //const aux = props.horario.split("T")[1].split(":");
    const minutosFormateados = (aux.getMinutes() === 0) ? "00" : aux.getMinutes();

    const hora = aux.getHours() +  ":"  + minutosFormateados;
    
    return (
        <div className="m-2 bg-[#699BE8] text-[white] cursor-pointer px-5 py-2.5 rounded-[5px] border-[none] hover:bg-[#699BC9] active:bg-[#699BC9]" > 
            <button >
                {hora} - {paciente}
            </button>

        </div>
    );
};
  
  
  export default PacienteCard;