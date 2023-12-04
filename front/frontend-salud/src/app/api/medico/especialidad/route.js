export async function POST(request) {
    const body = await request.json()
    // Fetch the data from the backend with the Authorization header
    const res = await fetch(process.env.URL_BACKEND + '/medico/especialidad', {
        method: 'GET',
        cache: "no-store",
        headers: {
            'Authorization': body.token
        },
    });

    const resultado = await res.json();
    if (res.status >= 400) { // Logica de control de errores
        return new Response(JSON.stringify(null), {
            status: 404,
            statusText: resultado.error,
        });
    } else {
        return new Response(JSON.stringify(resultado));
    }
}
