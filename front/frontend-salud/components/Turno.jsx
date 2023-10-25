import "tailwindcss/tailwind.css";

const Turno = () => {
    return (
        <>
            <div className="relative w-[326px] h-[392px] bg-[#ebffff] shadow-[10px_20px_4px_#00000040] rounded-[30px] overflow-hidden">
                <div className="absolute bottom-0 w-[326px] h-[89px] bg-[#3ca9b2] border-t-[5px] border-black">
                    <img className="w-[46px] absolute h-[46px] left-[241px] top-[17px]" src="/btn_cancelar.svg" alt="cancelar"/>
                    <img className="w-10 absolute h-[46px] left-8 top-[17px]" src="/btn_recordatorio.svg" alt="recordatorio"/>
                </div>
                <div className="absolute w-[326px] h-[23px] font-bold text-black text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap left-0 top-[214px]">8:40</div>
                <div className="absolute w-[326px] h-[23px] font-bold text-black text-xl text-center tracking-[0] leading-[normal] left-0 top-[191px]">Jueves 26/10/2023</div>
                <div className="absolute w-[326px] h-8 font-bold text-black text-xl text-center tracking-[0] leading-[normal] left-0 top-[34px]">Especialidad</div>
                <div className="absolute w-[326px] h-[38px] font-bold text-black text-[32px] text-center tracking-[0] leading-[normal] left-0 top-[153px]">Fecha:</div>
                <div className="absolute w-[326px] font-bold text-black text-2xl text-center tracking-[0] leading-[normal] left-0 top-[66px]">Nombre Doctor o Doctora</div>
            </div>
        </>
    );
  };
  
  export default Turno;