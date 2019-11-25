import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Issue } from '../../domain/issue';
import { User } from '../../domain/user';
import { IssuesService } from '../../shared/issues.service';
import { UsersService } from '../../shared/users.service';

@Component({
  selector: 'app-issue-listing',
  templateUrl: './issue-listing.component.html',
  styleUrls: ['./issue-listing.component.scss']
})
export class IssueListingComponent implements OnInit {
  issues$: Observable<Array<Issue>>;

  constructor(private router: Router,
    private issuesService: IssuesService,
    private usersService: UsersService) { }

  ngOnInit() {
    this.issues$ = this.issuesService.getAll();

  }

  createIssue() {
    this.router.navigate(['/issues/create']);
  }

  editIssue(issue: Issue) {
    this.router.navigate(['/issue', issue.id]);
  }

  showUserInfo(user: User) {
    this.usersService.get(user.id).subscribe(res => {
      user.email = res.email;
    });
  }

}
