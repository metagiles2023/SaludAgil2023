import Header from '@/components/Estructura/Header'
import Footer from '@/components/Estructura/Footer'
import GraficoLineas from '@/components/Graficos/GraficoLineas'
import GraficoBarras from '@/components/Graficos/GraficoBarras'
import GraficoTorta from '@/components/Graficos/GraficoTorta'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> 
      <main className='flex-1 flex justify-center items-center'>
        <div>
          <p className='m-2'>Grafico de lineas</p>
          <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px", height:"230px", "backgroundColor": "white"}}>
            <GraficoBarras />
          </div>
          <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px", height:"230px", "backgroundColor": "white"}}>
            <GraficoLineas />
          </div>
          <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px", height:"230px", "backgroundColor": "white"}}>
            <GraficoTorta />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}