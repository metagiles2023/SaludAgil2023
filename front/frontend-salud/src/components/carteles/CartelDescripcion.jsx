export function CartelDescripcion({ mensaje }) {
    return (
        <div className=" flex z-10 max-w-5xl w-full items-center justify-center font-mono text-2xl lg:flex">
            <p className="text-black font-medium justify-center border-gray-500 from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                {mensaje}
            </p>
      </div>
  )
}