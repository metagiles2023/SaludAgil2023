
// Hay que cambiarle las rutas: no lo quiero tocar para que no haya conflicto con los que estan haciendo los filtros.
export async function POST(request) { 
    console.log('Post al backend /ficha-medica/getAll')
    const resultBody = await request.json()
    const res = await fetch(process.env.URL_BACKEND + '/ficha-medica', {
        method: 'POST',
        cache: "no-store",
        body: JSON.stringify(resultBody),
        headers: {
            "Content-Type": "application/json"
        },
        signal: request.signal
    });
    console.log('se hizo el post al backend')
    const resultado = await res.json();
    if (false) { //logica de control de errores
        return new Response(JSON.stringify(null), {
            status: 404,
            statusText: resultado,
        });
    } else {
        return new Response(JSON.stringify(resultado));
    }
}