export const user = {
    username: 'elastic',
    password: '1PEleSDAL7HhuZ4bnXjE'
};
const params = {
    hostname: 'localhost',
    headers: {
        'Content-Type': 'application/json'
    },
    path: 'films/fiction/',
    port: 9200,
    auth: `${user.username}:${user.password}`
} ;

export const indexParams = {...params, method: 'POST'};
export const searchParams = {...params, method: 'GET'};