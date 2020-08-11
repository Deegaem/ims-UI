import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueListingComponent } from './issues/issue-listing/issue-listing.component';
import { IssueEditComponent } from './issues/issue-edit/issue-edit.component';
import { IssueAddComponent } from './issues/issue-add/issue-add.component';
import { CommentComponent } from './comments/comment.component';
import { ChatComponent } from './chat/chat.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './shared/auth.guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'issues', component: IssueListingComponent, canActivate: [AuthGuardService] },
  { path: 'issues/create', component: IssueAddComponent },
  { path: 'issue/:id', component: IssueEditComponent },
  { path: 'comment/:id', component: CommentComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
