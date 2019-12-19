import {indexDoc, getAllDocs, getDoc, getAuth, createUser} from "./elastic_functions";
import {user} from "./instances";
import DataService from "./data.service";
import StorageService from "./storage.service";
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
            this.storageService.store.push(value);
        })
    }
    setData(value: string){
        this.dataService.subject.next(value);
    }
    displayData(){
        console.log('store', this.storageService.store);
    }
}

const main = new Main(new DataService(), new StorageService());
main.getData();


setInterval(() => {
   main.setData('data : ' + Math.random());
   main.displayData();
}, 1000);

