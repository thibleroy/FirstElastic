import {Subject} from 'rxjs';
export default class DataService {
    subject:  Subject<string>;
    constructor(){
        this.subject = new Subject<string>();
    }
}


