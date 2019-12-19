import * as http from 'http';
import {indexParams, searchParams} from "./instances";

export const indexDoc = (val: any): Promise<any> => {
    return new Promise((resolve) => {
        const index: any = http.request(indexParams, (res) => {
            let body = '';
            res.on('error', (err) => console.error(err));
            res.on('data', (data) => body += data);
            res.on('end', () => resolve(body));
        });
        index.write(JSON.stringify(val));
        index.end();
    });
};

export const getDoc = (_id: string): Promise<any> => {
    return new Promise((resolve) => {
        http.request({...searchParams, path: searchParams.path + _id}, (res) => {
            let body = '';
            res.on('error', (err) => console.error(err));
            res.on('data', (data) => body += data);
            res.on('end', () => resolve(body));
        }).end();
    });
};

export const getAllDocs = () => {
    return new Promise((resolve) => {
        const req = http.request({...searchParams, path: searchParams.path + '_search'}, (res) => {
            let body = '';
            res.on('error', (err) => console.error(err));
            res.on('data', (data) => body += data);
            res.on('end', () => resolve(body));
        });
        req.write(JSON.stringify({
                query: {
                    match_all: {}
                }
            }
        ));
        req.end();
    });
};

export const getAuth = () => {
    return new Promise((resolve) => {
    http.request({...searchParams, path: '_security/_authenticate'}, (res) => {
            let body = '';
            res.on('error', (err) => console.error(err));
            res.on('data', (data) => body += data);
            res.on('end', () => resolve(body));
        }).end();
    });
};

export const createUser = (id: string, password: string) => {
    return new Promise((resolve) => {
        const req = http.request({...indexParams, path: '_security/user/'+ id}, (res) => {
            let body = '';
            res.on('error', (err) => console.error(err));
            res.on('data', (data) => body += data);
            res.on('end', () => resolve(body));
        });
        req.write(JSON.stringify({
            password : password,
            roles : [ "admin", "other_role1" ],
            full_name : "Thibault Leroy",
            email : "thibault.leroy@orange.com"
        }));
        req.end();
    });
};
