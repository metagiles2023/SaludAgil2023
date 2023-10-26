export async function cancelarTurno(pid, tid) {
    const response = await fetch(`http://localhost:8080/misturnos/${pid}/${tid}/cancelar`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    return true; // or return true if the endpoint doesn't return JSON
}
