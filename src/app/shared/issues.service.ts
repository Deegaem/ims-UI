import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../domain/issue';
import { Comment } from '../domain/comment';

@Injectable()
export class IssuesService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Array<Issue>> {
    return this.http.get<Array<Issue>>('http://192.168.1.106:8082/ims-issues/resources/issues', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    });
  }

  public get(id: number): Observable<any> {
    return this.http.get(`http://192.168.1.106:8082/ims-issues/resources/issues/${id}`);
  }

  public getComments(id: number): Observable<any> {
    return this.http.get(`http://192.168.1.106:8083/ims-comments/resources/comments/${id}`);
  }

  public addComment(id: number, comment: Comment): Observable<any> {
    return this.http.post(`http://192.168.1.106:8083/ims-comments/resources/comments/${id}`, comment,
      { responseType: 'text' }
    );
  }

  public add(issue: Issue): Observable<any> {
    return this.http.post('http://192.168.1.106:8082/ims-issues/resources/issues', issue,
       { responseType: 'text' }
    );
  }

  public update(issue: Issue): Observable<any> {
    return this.http.put(`http://192.168.1.106:8082/ims-issues/resources/issues/${issue.id}`, issue);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`http://192.168.1.106:8082/ims-issues/resources/issues/${id}`,
      { responseType: 'text' }
    );
  }

}