import { Injectable } from '@angular/core';
import { User } from '../domain/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {

    constructor(private http: HttpClient) { }

    public getAll(): Observable<Array<User>> {
        return this.http.get<Array<User>>('https://users.ims-prototype.ch/ims-users/resources/users');
    }

    public get(id: number): Observable<User> {
        return this.http.get<User>(`https://users.ims-prototype.ch/ims-users/resources/users/${id}`);
    }

    public add(user: User): Observable<any> {
        return this.http.post('https://users.ims-prototype.ch/ims-users/resources/users', user,
            { responseType: 'text' }
        );
    }


}