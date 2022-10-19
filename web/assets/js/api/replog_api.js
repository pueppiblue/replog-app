async function fetchJson(url, options) {
    const response = await fetch(url, options);

    return await response.text().then(text => text ? JSON.parse(text) : '');
}


export function getRepLogs() {
    return fetchJson('/reps', {method: 'GET'}).then(data => data.items);
}

export function deleteRepLog(repLogId) {
    return fetchJson(`/reps/${repLogId}`, {method: 'DELETE'});
}
