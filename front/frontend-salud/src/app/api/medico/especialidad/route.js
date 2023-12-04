import { getSession } from 'next-auth/react';

export async function GET() {
    // Use getSession to get the current user session
    const session = await getSession();
    let user = session?.user
    let token = user && user.usuario && user.usuario.token ? user.usuario.token : "notoken"
    console.log('mando token ' + token)
    // Check if the session is available
    if (session) {
        // Fetch the data from the backend with the Authorization header
        const res = await fetch(process.env.URL_BACKEND + '/medico/especialidad', {
            method: 'GET',
            cache: "no-store",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const resultado = await res.json();
        if (res.status >= 400) { // Logica de control de errores
            return new Response(JSON.stringify(null), {
                status: 404,
                statusText: resultado.error,
            });
        } else {
            return new Response(JSON.stringify(resultado));
        }
    } else {
        // Handle the case where there is no user session
        console.error('User session not found.');
        return new Response(JSON.stringify(null), {
            status: 401,
            statusText: 'Unauthorized',
        });
    }
}
