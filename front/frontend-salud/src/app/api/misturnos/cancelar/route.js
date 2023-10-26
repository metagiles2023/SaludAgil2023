export async function POST(req) {
    const pid = new URL(req.url).searchParams.get("pid");
    const tid = new URL(req.url).searchParams.get("tid");
    console.log("pid: " + pid + " tid: " + tid);
    const resultBody = await req.json()
    
    const response = await fetch(`http://localhost:8080/misturnos/cancelar`, {
        method: 'POST',
        body: JSON.stringify(resultBody), 
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
