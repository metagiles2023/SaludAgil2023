
export async function GET(req) {
    const dia = new URL(req.url).searchParams.get("dia");
    const mes = new URL(req.url).searchParams.get("mes")
    console.log(dia + "/" + mes)
    console.log();
    const res = await fetch(`http://localhost:8080/turnosByMedicoDisponibles?dia=${dia}&mes=${mes}&id=1`, {
        method: 'GET',
        cache: "no-store",
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