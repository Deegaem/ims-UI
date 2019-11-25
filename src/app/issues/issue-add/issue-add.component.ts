import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IssuesService } from '../../shared/issues.service';
import { UsersService } from '../../shared/users.service';
import { User } from '../../domain/user';

@Component({
  selector: 'app-issue-add',
  templateUrl: './issue-add.component.html',
  styleUrls: ['./issue-add.component.scss']
})
export class IssueAddComponent implements OnInit {
  public issueForm: FormGroup;
  users: User[];

  constructor(private router: Router,
    private issuesService: IssuesService,
    private usersService: UsersService,
    fb: FormBuilder) {

    this.issueForm = fb.group({
      label: [null, [Validators.required, Validators.minLength(2)], null],
      description: [null, Validators.required],
      assignedTo: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.usersService.getAll().subscribe(res => {
      this.users = res;
    })
  }

  reset() {
    this.issueForm.reset();
  }

  onSave() {
    console.log(this.issueForm.value);
    this.issuesService.add(this.issueForm.value).subscribe(res => {
      this.router.navigate(['issues']);
    });

  }
}
