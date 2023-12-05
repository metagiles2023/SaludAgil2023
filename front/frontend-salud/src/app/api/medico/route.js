export async function POST(request) {
    const body = await request.json()
    if (!body?.token) throw new Error("no body.token")
    const res = await fetch(process.env.URL_BACKEND + '/medico', {
        method: 'GET',
        cache: "no-store",
        headers: {
            "Authorization": body.token
        }
    });
    

    const resultado = await res.json();
    console.log(resultado);

    //console.log("API  MEDICO");
    //console.log(resultado);
    if (res.status >= 400) { //logica de control de errores
        return new Response(JSON.stringify(null), {
            status: 404,
            statusText: resultado,
        });
    } else {
        return new Response(JSON.stringify(resultado));
    }
}