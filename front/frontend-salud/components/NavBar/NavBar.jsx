import "tailwindcss/tailwind.css";
import Link from 'next/link';

const NavBar = () => {
    return (
        <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/crear/fichaMedica">Crear Ficha Medica</Link>
        </li>
        <li>
          <Link href="/crear/turno">Crear Turno</Link>
        </li>
      </ul>
    );
  };
  
  
  export default NavBar;