
export async function GET(req) {
    const dia = new URL(req.url).searchParams.get("dia");
    const mes = new URL(req.url).searchParams.get("mes");
    const idMedico = new URL(req.url).searchParams.get("idMedico");
    console.log(dia + "/" + mes + "/" + idMedico)
    console.log();
    const res = await fetch(`http://localhost:8080/misturnosmedico?dia=${dia}&mes=${mes}&id=${idMedico}`, {
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