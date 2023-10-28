export async function GET() {
    try {
        const res = await fetch(`http://localhost:8080/misturnos/2`, {
            method: 'GET',
            cache: "no-store"
        });

        // Check if response is not successful
        if (!res.ok) {
            throw new Error(`API error: ${res.statusText}`);
        }

        const resultado = await res.json();
        return new Response(JSON.stringify(resultado));

    } catch (error) {
        console.error(error); // For debugging
        return new Response(JSON.stringify({ error: error.message }), {
            status: 404,
            statusText: error.message,
        });
    }
}
