export async function POST(req) {
    try {
        const horaini = new URL(req.url).searchParams.get("horaini");
        const horafin = new URL(req.url).searchParams.get("horafin");
        const tiempoturno = new URL(req.url).searchParams.get("tiempoturno");
        const dia = new URL(req.url).searchParams.get("dia");
        const idMedico = new URL(req.url).searchParams.get("idMedico");

        console.log("Parameters:", { horaini, horafin, tiempoturno, dia, idMedico });

        const resultBody = await req.json();
        console.log("Request Body:", resultBody);

        const response = await fetch(`http://localhost:8080/agregarturnos`, {
            method: 'POST',
            body: JSON.stringify(resultBody), 
            headers: {
                "Content-Type": "application/json"
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