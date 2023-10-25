export async function GET() {
    const res = await fetch('http://localhost:8080/misturnos/2', {
        method: 'GET',
        cache: "no-store"
    });
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