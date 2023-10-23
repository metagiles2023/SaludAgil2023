import FichaMedica from "@/components/FichaMedica/FichaMedica";
import NavBar from '@/components/NavBar/NavBar';

let fichaMedica = [{
    idFichaMedica: 1,
    medico: 1,
    paciente: 1,
    date: 1,
    diagnostico: 1,
    esGrave: 1,
    usoEmergencia: 1
},
{
    idFichaMedica: 2,
    medico: 2,
    paciente: 2,
    date: 2,
    diagnostico: 2,
    esGrave: 2,
    usoEmergencia: 2
}]
    

export default function Home() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
        <NavBar />
          {/* Rest of your homepage content */}
        </div>  
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Pagina para ver fichas medicas&nbsp;
          </p>
        </div>
        <FichaMedica fichaMedica = {fichaMedica} >

        </FichaMedica>
      </main>
    )
  }
  