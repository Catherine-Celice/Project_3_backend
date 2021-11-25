// re ObjctId source: One of these is in the slides and 
// the other is what Megan had me put into my lab.
// I am not sure which is best to use, so I'll leave both here
// in case we need to switc
// import { ObjectId } from "bson";
import { ObjectId } from 'mongodb';

export default interface User {
    _id?: ObjectId;
    firstname: string;
    lastname: string;

};




