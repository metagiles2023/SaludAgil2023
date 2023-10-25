import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Doctor from "../../../../components/Doctor";

export default function ReservarTurnos() {
    return (
        <>
            <Header />
            <div className="w-full flex justify-center relative top-10">
                <div className="text-black text-2xl font-bold h-7 tracking-[0] leading-[normal] relative whitespace-nowrap left-0 top-2">Especialidad:</div>
                <div className="bg-[#ebffff] shadow-[0px_20px_4px_#00000040] h-11 relative w-[341px] rounded-[30px] left-[10px] top-0">
                    <img className="h-[13px] absolute w-[21px] left-[298px] top-[17px]" alt="Seleccionar" src="/down_arrow.svg" />
                </div>
                <img className="h-[34px] relative w-[34px] left-[20px] top-1.5" alt="Lupa" src="/search_icon.svg" />
            </div>
            <main className="w-full flex space-x-10 justify-center items-center absolute bottom-5 left-0 right-0 top-0">
                <Doctor />
                <Doctor />
                <Doctor />
                <Doctor /> 
            </main>
            
            <Footer />
        </>
    )
}
