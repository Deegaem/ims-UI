import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private usersService: UsersService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      credential: this.fb.group({
        username: [null, Validators.required],
        password: [null, Validators.required]
      })
    });
  }

  onSave() {
    this.usersService.add(this.registerForm.value).subscribe(res => {
      this.router.navigate(['login']);
    });

  }

}
