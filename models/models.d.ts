// models.d.ts

import { Model, models } from "mongoose";

declare module 'path/to/models' {
    export class User extends Model {
        firstName: string;
        lastName: string;
        password: string;
        email: string;
        phoneNumber: string;
        role: string;
        photo: string;
        companyName: string;
    }
    
}

declare module 'path/to/models' {
    export class Role extends Model {
        firstName: string;
        lastName: string;
        password: string;
        email: string;
        phoneNumber: string;
        role: string;
        photo: string;
        companyName: string;
    }

}