
export async function POST(request) {
    try {
        const resultBody = await request.json()
        console.log(resultBody)
        const res = await fetch('http://localhost:8080/reservar/turno', {
            method: 'POST',
            body: JSON.stringify(resultBody),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const resultado = await res.json();
        console.log(resultado);
        if (res.status === 200) {
            console.log("STATUS 200");
            return new Response(JSON.stringify(resultado));
        } else { 
            console.log("STATUS OTRO a 200");
            return new Response(JSON.stringify(null), {
                status: 404,
                statusText: resultado.error,
            });
        }
      } catch (error) {
        return new Response(JSON.stringify(null), {
            status: 500,
            statusText: "ERROR server interno",
        });
      }
}
