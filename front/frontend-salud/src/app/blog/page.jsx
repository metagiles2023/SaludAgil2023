import Header from '@/components/Estructura/Header'
import Footer from '@/components/Estructura/Footer'
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> 
      <main className='flex-1 flex justify-center items-center'>
        <CartelDescripcion mensaje="Este es el blog de metodologias agiles"/>
      </main>
      <Footer />
    </div>  
  )
}
