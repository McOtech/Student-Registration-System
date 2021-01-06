import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { JQ_TOKEN } from './services/jquery.service';
import { MembersService } from './services/members.service';
import { Toastr, TOASTR_TOKEN } from './services/toastr.service';
import { AuthToken } from './store/reducers/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'School Management System';
  status: boolean = false;

  constructor(
    @Inject(JQ_TOKEN) private $: any,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private store: Store,
    private member: MembersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.select<AuthToken>((reducer: any): AuthToken => reducer.authReducer)
    .subscribe((authToken: AuthToken) => {
      this.status = authToken.status;
    });

    this.$('.user').popup({
      inline     : true,
      hoverable  : true,
      position   : 'bottom left',
      delay: {
        show: 300,
        hide: 800
      }
    });
  }
  logout() {
    this.member.logout();
    this.router.navigate(['/login']);
  }
}
