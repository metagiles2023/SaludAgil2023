
export async function GET(req) {
    const especialidad = new URL(req.url).searchParams.get("especialidad").toLowerCase();
    
    console.log("Especialidad: " + especialidad);
    const res = await fetch(`http://localhost:8080/medico/getByEspecialidad?especialidad=${especialidad}`, {
        method: 'GET',
        cache: "no-store",
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