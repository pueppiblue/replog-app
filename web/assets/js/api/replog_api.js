export async function getRepLogs() {
    const response = await fetch('/reps', {method: 'GET'});

    return response.json().then(data => data.items);
}
