export async function GET() {
    const res = await fetch(process.env.URL_BACKEND + '/paciente', {
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