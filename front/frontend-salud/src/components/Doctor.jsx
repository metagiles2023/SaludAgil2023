import Link from "next/link";

const Doctor = () => {
    return (
        <>
            <Link href="/turnos/reservarturnos/turnosdisponibles" className="flex flex-col justify-center items-center w-[300px] h-full bg-[#ebffff] shadow-[5px_5px_5px_rgba(0,0,0,0.2),10px_10px_10px_rgba(0,0,0,0.1)] rounded-[15%]">
                <img className="w-2/5 h-3/4 mt-10 mx-10 mb-3" alt="Imagen del doctor" src="/doctor_vector.svg" />
                <div className="text-[#204240] text-xl font-bold text-center mx-5">Nombre Doctor o Doctora</div>
                <div className="text-black text-xl font-bold text-center mb-5">
                    Ver turnos
                    <br />
                    disponibles
                </div>
            </Link>
        </>
    );
  };
  
  export default Doctor;