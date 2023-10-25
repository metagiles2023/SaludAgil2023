export async function GET() {
    const res = await fetch(process.env.URL_BACKEND + '/medico/especialidades', {
        method: 'GET',
        cache: "no-store"
    });
    const resultado = await res.json();
    if (res.status >= 400) { //logica de control de errores
        return new Response(JSON.stringify(null), {
            status: 404,
            statusText: resultado.error,
        });
    } else {
        return new Response(JSON.stringify(resultado));
    }
}