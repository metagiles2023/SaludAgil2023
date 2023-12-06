export async function POST(req) {
    try {
        
        const horaini = new URL(req.url).searchParams.get("hi");
        const horafin = new URL(req.url).searchParams.get("hf");
        const tiempoturno = new URL(req.url).searchParams.get("tiempoturno");
        const dia = new URL(req.url).searchParams.get("dia");
        
        const resultBody = {
            "horaini": horaini,
            "horafin": horafin,
            "dia": dia,
            "tiempoturno": tiempoturno,
        }
        console.log("body req: ")
        console.log("Parameters:", { horaini, horafin, tiempoturno, dia });

        const body = await req.json();
        console.log("token cargarturnooooo:", body.token);

        
        const response = await fetch(`http://localhost:8080/agregarturnos`, {
            method: 'POST',
            body: JSON.stringify(resultBody), 
            headers: {
                "Content-Type": "application/json",
                "Authorization": body.token
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Error details:', errorMessage);
            throw new Error(`An error has occurred: ${response.status}`);
        }

        // Return a valid response, for example, a JSON response
        return new Response(JSON.stringify({ success: true }), {
            headers: {
                "Content-Type": "application/json"
            },
        });

    } catch (error) {
        console.error('An error occurred:', error);
        throw new Error('Internal Server Error');
        
    }

}