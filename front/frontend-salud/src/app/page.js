import Header from '@/components/Estructura/Header';
import Footer from '@/components/Estructura/Footer';
import NavBar from '@/components/NavBar/NavBar';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';


export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className='flex-1 flex justify-center items-center'>
                <CartelDescripcion mensaje="Pagina principal de Salud Agil 2023"/>
            </main>
            <Footer />
        </div>     
    )
}
