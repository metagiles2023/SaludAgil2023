export async function POST(request) {
    const body = await request.json();
    console.log(`internal: cancelar body is ${JSON.stringify(body)}`)
    const tid = new URL(request.url).searchParams.get("tid");
        
    const resultBody = {
        "tid": tid,
    }
    const response = await fetch(`http://localhost:8080/misturnos/cancelar`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": body.token
        },
        body: JSON.stringify(resultBody)
    });
    
    const resultado = await response.json();
    if (response.status >= 400) { //logica de control de errores
        console.log("anda cancelar");
        return new Response(JSON.stringify(null), {
            status: response.status,
            statusText: resultado.error, //espero que el backend me mande un error en el json
        });
    } else {
        console.log("no anda cancelar");
        return new Response(JSON.stringify(resultado));
    }
}
