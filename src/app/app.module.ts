import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IssuesModule } from './issues/issues.module';
import { IssuesService } from './shared/issues.service';
import { UsersService } from './shared/users.service';
import { CommentsService} from './shared/comments.service';
import { AuthService } from './shared/auth.service';
import { WebsocketService } from './shared/websocket.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './shared/auth.guard.service';
import { ChatComponent } from './chat/chat.component';
import { CommentComponent } from './comments/comment.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

export function tokenGetterFn() {
  return localStorage.getItem('token');
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    CommentComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    IssuesModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetterFn
      }
    })
  ],
  providers: [IssuesService, CommentsService, UsersService, WebsocketService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
