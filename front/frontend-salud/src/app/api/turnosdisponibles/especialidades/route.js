export async function POST(request) {
    const body = await request.json()
    const res = await fetch(`http://localhost:8080/medico/especialidad`, {
        method: 'GET',
        cache: "no-store",
        headers: {
            "Authorization": body.token
        }
    });
    const resultado = await res.json();
    console.log(resultado);
    if (res.status >= 400) { 
        return new Response(JSON.stringify(null), {
            status: 404,
            statusText: resultado.error,
        });
    } else {
        return new Response(JSON.stringify(resultado));
    }
}