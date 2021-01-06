import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MembersService } from '../services/members.service';
import { Toastr, TOASTR_TOKEN } from '../services/toastr.service';
import { ACTION_LOGIN } from '../store/actions/auth.action';
import { AuthToken } from '../store/reducers/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private store: Store,
    private router: Router,
    private member: MembersService
  ) { }

  ngOnInit(): void {
  }
  login(e) {
    e.preventDefault();
    const code = e.target.code.value;
    const password = e.target.password.value;
    this.member.loginUser({code, password}).subscribe((authToken: AuthToken) => {
      if (authToken.status === true) {
        this.store.dispatch({type: ACTION_LOGIN, ...authToken});
        this.toastr.success('Login Success');
        this.router.navigate(['/members']);
      } else {
        this.toastr.error('Invalid credentials. Try again');
      }
    });
  }
}
