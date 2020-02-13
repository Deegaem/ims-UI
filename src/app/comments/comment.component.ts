import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommentsService } from '../shared/comments.service';
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
    private commentsService: CommentsService, private authService: AuthService, private usersService: UsersService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.issueId = + params['id'];
      this.commentsService.getComments(this.issueId).subscribe(res => {
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
    this.commentsService.addComment(this.issueId, newComment).subscribe(res => {
      this.commentsInfo.push(
        {
          byUserName: this.authService.currentUser.name,
          created: res.created,
          id: res.id,
          ...newComment
        });
      f.reset();
    });
  }

  deleteComment(id: number) {
    if (confirm("Are you sure you wish to delete?")) {
      this.commentsService.delete(this.issueId, id).subscribe(res => {
        this.commentsInfo = this.commentsInfo.filter(function (comment) {
          return comment.id != id;
        });
      });
    }
  }

  backToComments() {
    this.router.navigate(['/comment', this.issueId]);
  }

  backToIssue() {
    this.router.navigate(['/issue', this.issueId]);
  }

}
