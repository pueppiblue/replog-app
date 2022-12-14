async function fetchJson(url, options) {
    const jsonHeader = {'Content-Type': 'application/json'};

    options.headers = {
        ...options.headers,
        ...jsonHeader
    }

    const response = await fetch(url, options);

    if (response.ok) {
        return await response.text().then(text => text ? JSON.parse(text) : '');
    }

    const error = new Error(response.statusText);
    error.response = response;

    throw error
}

export function getRepLogs() {
    return fetchJson('/reps', {method: 'GET'}).then(data => data.items);
}

export function deleteRepLog(repLogId) {
    return fetchJson(`/reps/${repLogId}`, {method: 'DELETE'});
}

export function createRepLog(repLog) {
    return fetchJson(`/reps`, {
        method: 'POST',
        headers: {
            'MyCustomHeader': 'pimp my headers',
        },
        body: JSON.stringify(repLog),
    });
}
