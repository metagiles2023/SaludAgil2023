export async function POST(request) {
    const body = await request.json();
    console.log(`internal: /api/logout body is ${JSON.stringify(body)}`)
    const res = await fetch(process.env.URL_BACKEND + '/logout', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "authorization": body.token
        },
        body: JSON.stringify(body.other),
    });
    const resultado = await res.json();
    console.log(res.status, resultado)
    if (res.status >= 400) { //logica de control de errores
        console.log('error logging out')
        console.log(resultado)
        return new Response(JSON.stringify(null), {
            status: res.status,
            statusText: resultado.error, //espero que el backend me mande un error en el json
        });
    } else {
        return new Response(JSON.stringify(resultado));
    }
}