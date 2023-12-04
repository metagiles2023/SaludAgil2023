const NavBar = ( { user={} } ) => {
    console.log('im the navbar and the user is ')
    console.log(user)
    return (
        <nav className="flex items-center">
            <div className="w-full" id="NavBar">
                <ul className="flex font-medium text-lg lg:text-xl xl:text-2xl 2xl:text-3xl gap-2 lg:gap-4 xl:gap-5 2xl:gap-6">
                    <li>
                    <a href="/" className="text-white hover:text-blue-500 bg-transparent">Home</a>
                    </li>
                    <li>
                    <a href="/blog" className="text-white hover:text-blue-500 hover:bg-transparent">Blog</a>
                    </li>
                    {user && user.usuario && (user.usuario.rol == 'medico' || user.usuario.rol == 'administrador') ? (
                        <li>
                            <a href="/ficha-medica/ver" className="text-white hover:text-blue-500 hover:bg-transparent">Fichas Medicas</a>
                        </li>
                    ) : null}
                    {user && user.usuario && (user.usuario.rol == 'medico' || user.usuario.rol == 'administrador') ? (
                        <li>
                            <a href="/usuario/ver" className="text-white hover:text-blue-500 hover:bg-transparent">Usuarios</a>
                        </li>
                    ) : null}
                    {user && user.usuario && (user.usuario.rol == 'medico' || user.usuario.rol == 'administrador') ? (
                        <li>
                            <a href="/estadisticas" className="text-white hover:text-blue-500 hover:bg-transparent">Estadisticas</a>
                        </li>
                    ) : null}
                    {user && user.usuario && (user.usuario.rol == 'medico' || user.usuario.rol == 'administrador') ? (
                        <li>
                            <a href="/medico/especialidad" className="text-white hover:text-blue-500 hover:bg-transparent">Especialidades</a>
                        </li>
                    ) : null}
                    {user && user.usuario ? (
                        <li>
                            <a href="/turnos" className="text-white hover:text-blue-500 hover:bg-transparent">Portal Pacientes</a>
                        </li>
                    ) : null}
                    {user && user.usuario ? (
                        <li>
                            {user.usuario.nombre}({user.usuario.rol})
                        </li>
                    ): null }
                    {user && user.usuario ? (<li>
                        <a href="/logout" className="text-white hover:text-blue-500 hover:bg-transparent">Logout</a>
                    </li>) : null}
                    
                </ul>
            </div>
        </nav>
    )
  };
  
  
  export default NavBar;