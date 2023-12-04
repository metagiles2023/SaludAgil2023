
export async function POST(request) {
    try {
        const resultBody = await request.json();
        let body = JSON.stringify(resultBody.other)
        console.log('voy a enviar pedido al backend con token ' + resultBody.token)
        console.log('el pedido que hago tiene body: ')
        console.log(body)
        const res = await fetch(process.env.URL_BACKEND + '/ficha-medica', {
            method: 'POST',
            cache: "no-store",
            body: body,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${resultBody.token}`
            },
            signal: request.signal
        });
        
        console.log('se hizo el post al backend');
        
        const resultado = await res.json();
        if (res.status >= 400) {
            // logica de control de errores
            return new Response(JSON.stringify(null), {
                status: 404,
                statusText: resultado,
            });
        } else {
            return new Response(JSON.stringify(resultado));
        }
    } catch (error) {
        console.error('Error in POST request:', error);
        return new Response(JSON.stringify(null), {
            status: 500,
            statusText: error,
        });
    }
}
