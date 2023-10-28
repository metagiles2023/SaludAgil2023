
export async function POST(request) {
    const resultBody = await request.json()
    console.log(resultBody)
    const res = await fetch('http://localhost:8080/reservar/turno', {
        method: 'POST',
        body: JSON.stringify(resultBody),
        headers: {
            "Content-Type": "application/json"
        },
    });
    //const resultado = await res.json();
    if (false) { //logica de control de errores
        return new Response(JSON.stringify(null), {
            status: 404,
            statusText: resultado,
        });
    } else {
        //return new Response(JSON.stringify(resultado));
    }
}
