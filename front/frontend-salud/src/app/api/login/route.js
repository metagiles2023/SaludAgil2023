export async function POST(request) {
    const body = await request.json();
    const data = {
        dni: body.dni,
        password: body.password
    }
    console.log(`dni es ${data.dni}`)

    const res = await fetch(process.env.URL_BACKEND + '/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const resultado = await res.json();
    if (res.status >= 400) { //logica de control de errores
        return new Response(JSON.stringify(null), {
            status: 404,
            statusText: resultado,
        });
    } else {
        // console.log('construir user con este objeto:')
        // console.log(resultado)
        const user = {
            usuario: resultado.usuario,
            token: resultado.token,
            lastActivity: resultado.lastActivity,
        }
        return new Response(JSON.stringify(user));
    }
}