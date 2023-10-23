import NavBar from '@/components/NavBar/NavBar'
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion'

export default function Home() {
  return (
    <main className="flex flex-col">
        <div>
            <NavBar/>
      </div>   
      <CartelDescripcion mensaje="Este es estadisticas"/>

    </main>
  )
}