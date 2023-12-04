export async function POST(request) {
    const body = await request.json()
    const res = await fetch(process.env.URL_BACKEND + '/medico', {
        method: 'GET',
        cache: "no-store",
        headers: {
            "Authorization": body.token
        }
    });
    const resultado = await res.json();
    if (res.status >= 400) { //logica de control de errores
        return new Response(JSON.stringify(null), {
            status: 404,
            statusText: resultado,
        });
    } else {
        return new Response(JSON.stringify(resultado));
    }
}