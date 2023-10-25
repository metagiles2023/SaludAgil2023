import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Doctor from "../../../../components/Doctor";

export default function ReservarTurnos() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="w-full flex justify-center items-center py-10 space-x-5">
                    <div className="text-black text-2xl font-bold">Especialidad:</div>
                    <div className="flex w-3/12 h-12 bg-[#ebffff] shadow-[0px_20px_4px_#00000040] rounded-[30px] justify-between items-center px-5">
                        <span className="font-medium text-gray-500">Seleccione una especialidad</span>
                        <img className="w-6" alt="Seleccionar" src="/down_arrow.svg" />
                    </div>
                    <img className="w-10" alt="Lupa" src="/search_icon.svg" />
                </div>
                <main className="w-full flex flex-1 space-x-10 justify-center items-center ">
                    <Doctor />
                    <Doctor />
                    <Doctor />
                    <Doctor /> 
                </main>
                <Footer />
            </div>
        </>
    )
}
