import {indexDoc, getAllDocs, getDoc} from "./elastic_functions";

indexDoc({
    title: 'Avatar',
    duration: 120
}).then((resultBody) => {
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