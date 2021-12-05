// re ObjctId source: One of these is in the slides and 
// the other is what Megan had me put into my lab.
// I am not sure which is best to use, so I'll leave both here
// in case we need to switc
// import { ObjectId } from "bson";
import { ObjectId } from 'mongodb';
import Preferences from './preferences';

export default interface User {
    _id?: ObjectId;
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    password1: string;
    image?: string;
    zip: string;
    aboutme?: string;
    preferences?: Preferences;
    petList?: string[];
};




