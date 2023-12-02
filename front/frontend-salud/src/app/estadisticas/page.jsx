import Header from '@/components/Estructura/Header'
import Footer from '@/components/Estructura/Footer'
import GraficoLineas from '@/components/Graficos/GraficoLineas'
import GraficoBarras from '@/components/Graficos/GraficoBarras'
import GraficoTorta from '@/components/Graficos/GraficoTorta'
import Graficos from '@/components/Graficos/Graficos'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className='flex-1 flex justify-center items-center'>
        <div>
          <p className='m-2'>Grafico de lineas</p>
          <div className='my-12'>
            <Graficos></Graficos>
          </div>
        </div>
      </main>
      
    </div>
  )
}