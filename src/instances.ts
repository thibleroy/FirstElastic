const params = {
    hostname: 'localhost',
    headers: {
        'Content-Type': 'application/json',
    },
    path: 'films/fiction/',
    port: 9200
} ;

export const indexParams = {...params, method: 'POST'};
export const searchParams = {...params, method: 'GET'};