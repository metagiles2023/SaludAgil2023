const Doctor = () => {
    return (
        <>
            <div className="bg-[#ebffff] shadow-[5px_5px_5px_rgba(0,0,0,0.2),10px_10px_10px_rgba(0,0,0,0.1)] bg-[100%_100%] h-[392px] relative w-[326px] rounded-[15%]">
                <img className="h-[146px] absolute w-[135px] left-24 top-[78px]" alt="Imagen del doctor" src="/doctor_vector.svg" />
                <div className="text-[#204240] text-xl font-bold h-[23px] tracking-[0] leading-[normal] absolute text-center w-[241px] left-[42px] top-[243px]">Nombre Doctor o Doctora</div>
                    <div className="h-[51px] absolute w-[134px] left-[97px] top-[305px]">
                        <div className="text-black text-xl font-bold h-[51px] tracking-[0] leading-[normal] absolute text-center w-[132px] left-0 top-0">
                            Ver turnos
                            <br />
                            disponibles
                        </div>
                    </div>
                </div>
        </>
    );
  };
  
  export default Doctor;