export async function POST(request) {
    const body = await request.json();
    console.log(`internal: paciente/create/post.js body is ${JSON.stringify(body)}`)
    const res = await fetch(process.env.URL_BACKEND + '/paciente', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": body.token
        },
        body: JSON.stringify(body.other)
    });
    const resultado = await res.json();
    console.log(res.status, resultado)
    if (res.status >= 400) { //logica de control de errores
        console.log('error creando paciente')
        console.log(resultado)
        return new Response(JSON.stringify(null), {
            status: res.status,
            statusText: resultado.error, //espero que el backend me mande un error en el json
        });
    } else {
        console.log('paciente creado con id ' + resultado.id) //espero que me mande el id
        console.log(resultado)
        return new Response(JSON.stringify(resultado));
    }
}