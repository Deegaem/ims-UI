import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IssuesService } from '../shared/issues.service';
import { AuthService } from '../shared/auth.service';
import { UsersService } from '../shared/users.service';
import { Comment } from '../domain/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  comments: Comment[];
  commentsInfo = [];
  comment: string;
  issueId: number;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private issuesService: IssuesService, private authService: AuthService, private usersService: UsersService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.issueId = + params['id'];
      this.issuesService.getComments(this.issueId).subscribe(res => {
        this.comments = res;
        res.forEach(element => {
          this.usersService.get(element.byUser).subscribe(res => {
            let obj = {
              byUserName: res.name,
              ...element
            };
            this.commentsInfo.push(obj);
          });
        });
      });
    });
  }

  onComment(f: NgForm) {
    let newComment = new Comment();
    newComment.byUser = this.authService.currentUser.id;
    newComment.forIssue = this.issueId;
    newComment.text = this.comment;
    this.issuesService.addComment(this.issueId, newComment).subscribe(res => {
     // console.log('res.created', res.created);
      this.commentsInfo.push(
        {
          byUserName: this.authService.currentUser.name,
          created: res.created,
          ...newComment
        });
      f.reset();
    });
  }

  backToIssue() {
    this.router.navigate(['/issue', this.issueId]);
  }

}
