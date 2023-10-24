export async function POST(request) {
    const body = await request.json();
    console.log(`internal: paciente/create/post.js body is ${JSON.stringify(body)}`)
    const res = await fetch(process.env.URL_BACKEND + '/paciente/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const resultado = await res.json();
    console.log('el res.status es ' + res.status)
    console.log(resultado)
    if (res.status >= 400) { //logica de control de errores
        return new Response(JSON.stringify(null), {
            status: res.status,
            statusText: resultado.error,
        });
    } else {
        return new Response(JSON.stringify(resultado));
    }
}