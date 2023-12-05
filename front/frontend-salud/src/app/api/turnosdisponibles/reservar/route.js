
export async function POST(request) {
    
    const resultBody = await request.json()
    console.log(resultBody)
    const res = await fetch('http://localhost:8080/reservar/turno', {
        method: 'POST',
        body: JSON.stringify(resultBody.other),
        headers: {
            "Content-Type": "application/json",
            "Authorization": resultBody.token
        },
    });
    const resultado = await res.json();
    console.log(resultado);
    if (res.status >= 400) { //logica de control de errores
        console.log('error creando turno')
        console.log(resultado)
        return new Response(JSON.stringify(null), {
            status: res.status,
            statusText: resultado.error, //espero que el backend me mande un error en el json
        });
    } else {
        console.log('turno creado') //espero que me mande el id
        console.log(resultado)
        return new Response(JSON.stringify(resultado));
    }
}
