import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../domain/comment';

@Injectable()
export class CommentsService {

  constructor(private http: HttpClient) { }

  public getComments(id: number): Observable<any> {
    return this.http.get(`https://comments.ims-prototype.ch/ims-comments/resources/comments/${id}`);
  }

  public addComment(id: number, comment: Comment): Observable<any> {
    return this.http.post(`https://comments.ims-prototype.ch/ims-comments/resources/comments/${id}`, comment);
  }


  public delete(issueid: number, id: number): Observable<any> {
    return this.http.delete(`https://comments.ims-prototype.ch/ims-comments/resources/comments/${issueid}/${id}`,
      { responseType: 'text' }
    );
  }

  public deleteAll(issueid: number): Observable<any> {
    return this.http.delete(`https://comments.ims-prototype.ch/ims-comments/resources/comments/${issueid}`,
      { responseType: 'text' }
    );
  }

}