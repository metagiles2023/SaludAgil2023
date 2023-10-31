import Header from "@/components/Estructura/Header";
import Footer from "@/components/Estructura/Footer";
import Doctor from "@/components/Doctor";

export default function ReservarTurnos() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 flex flex-col justify-center items-center ">
                    <div className="flex items-center py-4 md:py-8 lg:py-20 xl:py-28 2xl:py-32 gap-8">
                        <div className="text-black text-2xl font-bold">Especialidad:</div>
                        <div className="flex w-full h-12 bg-[#ebffff] shadow-[0px_20px_4px_#00000040] rounded-[30px] justify-between items-center px-5">
                            <span className="font-medium text-gray-500 px-5">Seleccione una especialidad</span>
                            <img className="w-6" alt="Seleccionar" src="/down_arrow.svg" />
                        </div>
                        <img className="w-10" alt="Lupa" src="/search_icon.svg" />
                    </div>
                    <div className="flex flex-1 justify-center gap-10">
                        <Doctor />
                        <Doctor />
                        <Doctor />
                        <Doctor />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    )
}
