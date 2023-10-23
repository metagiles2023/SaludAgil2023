import { useRouter } from 'next/navigation';


export function Redireccionador({ mensaje, ruta }) {
    const router = useRouter();
    const handleRoute = () => {
        router.push(ruta);
      };
    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <div className="justify-center border-gray-300 from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                <button onClick={handleRoute}>{mensaje}</button>
            </div>
      </div>
  )
}