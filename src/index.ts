import {indexDoc, getAllDocs, getDoc, getAuth, createUser} from "./elastic_functions";
import {user} from "./instances";
import DataService from "./data.service";
import StorageService from "./storage.service";
import {EventEmitter} from "events";
/*
indexDoc({
    title: 'Avatar',
    duration: 120
}).then((resultBody) => {
    console.log('res', resultBody);
    const ack = JSON.parse(resultBody);
    console.log('ack', ack);
    getDoc(ack._id).then((res: any) => {
        const doc = JSON.parse(res);
        console.log('doc', doc);
        getAllDocs().then((docs) => {
            console.log('docs', docs);
        })
    });
});
 */
class Main {
    dataService: DataService;
    storageService: StorageService;
    constructor(private data: DataService, private storage: StorageService) {
        this.dataService = data;
        this.storageService = storage;
    }
    getData(){
        this.dataService.subject.subscribe((value) => {
            console.log(value);
        })
    }
    setData(value: string){
        this.dataService.subject.next(value);
    }

}
const ds = new DataService();
const ss = new StorageService();
const client1 = new Main(ds, ss);
client1.getData();
const myEmitter = new EventEmitter();
myEmitter.on('test', (value) => {
    client1.setData(value);
});
process.stdin.on('data', (data) => {
    const value = data.toString().trim();
    myEmitter.emit('test', value);
});
