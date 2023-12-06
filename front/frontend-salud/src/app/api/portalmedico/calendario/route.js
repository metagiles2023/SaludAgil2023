
export async function POST(req) {
    const dia = new URL(req.url).searchParams.get("dia");
    const mes = new URL(req.url).searchParams.get("mes");
    const body = await req.json()
    console.log("TOKEN medico");
    console.log(body.token);
    const res = await fetch(`http://localhost:8080/misturnosmedico?dia=${dia}&mes=${mes}`, {
        method: 'GET',
        cache: "no-store",
        headers: {
            "Authorization": body.token
        }
    });
    const resultado = await res.json();
    if (res.status >= 400) { //logica de control de errores
        return new Response(JSON.stringify(null), {
            status: 404,
            statusText: resultado.error,
        });
    } else {
        return new Response(JSON.stringify(resultado));
    }
}