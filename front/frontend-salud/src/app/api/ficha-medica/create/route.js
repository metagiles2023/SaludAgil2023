export async function POST(request) {
    const body = await request.json();
    console.log(`internal: ficha-medica/create/post.js body is ${JSON.stringify(body)}`)
    console.log('PARA FICHA MEDICA, ENVIO ESTO')
    console.log(body)
    const res = await fetch(process.env.URL_BACKEND + '/ficha-medica/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const resultado = await res.json();
    console.log(res.status, resultado)
    if (res.status >= 400) { //logica de control de errores
        console.log('error creando ficha-medica')
        console.log(resultado)
        return new Response(JSON.stringify(null), {
            status: res.status,
            statusText: resultado.error, //espero que el backend me mande un error en el json
        });
    } else {
        console.log('ficha-medica creada con id ' + resultado.id) //espero que me mande el id
        console.log(resultado)
        return new Response(JSON.stringify(resultado));
    }
}