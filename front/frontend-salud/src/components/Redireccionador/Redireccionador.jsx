import { useRouter } from 'next/navigation';


export function Redireccionador({ mensaje, ruta }) {
    const router = useRouter();
    const handleRoute = () => {
        router.push(ruta);
      };
    return (
        <div className='my-4'>
            <div className='my-4'>
                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-6 py-4 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800' onClick={handleRoute}>{mensaje}</button>
            </div>
      </div>
  )
}