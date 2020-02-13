import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { IssuesService } from '../../shared/issues.service';
import { UsersService } from '../../shared/users.service';
import { Issue } from '../../domain/issue';
import { User } from '../../domain/user';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.scss']
})

export class IssueEditComponent implements OnInit {
  issue: Issue;
  users: User[];
  public issueForm: FormGroup;
  

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private issuesService: IssuesService,
    fb: FormBuilder) {
    this.issueForm = fb.group({
      id: null,
      label: [null, [Validators.required, Validators.minLength(2)], null],
      description: [null, Validators.required],
      assignedTo: [null, Validators.required],
      created: null
    });
  }

  ngOnInit() {
    this.usersService.getAll().subscribe(res => {
      this.users = res;
    });

    this.route.params.subscribe((params: Params) => {
      let id =+ params['id'];
      console.log('loading issue', id);
      this.issuesService.get(id).subscribe(res => {
        this.issue = res;
        console.log(this.issue);
        this.updateForm();
      });
    });
  }

  updateForm() {
    this.issueForm.patchValue({
      id: this.issue.id,
      label: this.issue.label,
      description: this.issue.description,
      assignedTo: {
        id: this.issue.assignedTo.id,
        name: this.issue.assignedTo.name
      },
      created: this.issue.created
    });
  }

  onSave() {
    console.log(this.issueForm.value);
    this.issuesService.update(this.issueForm.value).subscribe(res => {
      this.router.navigate(['issues']);
    });

  }

  deleteIssue() {
    if (confirm("Are you sure you wish to delete?")) {
      this.issuesService.delete(this.issue.id).subscribe(res => {
             this.backToList();
      });
    }
  }

  backToList() {
    this.router.navigate(['/issues']);
  }

  goToComment(){
    this.router.navigate(['/comment', this.issue.id]);
  }

  compareUser(user1, user2): boolean {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }
}