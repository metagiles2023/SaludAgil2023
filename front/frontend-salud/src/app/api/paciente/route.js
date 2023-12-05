export async function POST(request) {
    const body = await request.json()
    console.log('internal: /api/paciente. token is')
    console.log(body.token)
    const res = await fetch(process.env.URL_BACKEND + '/paciente', {
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