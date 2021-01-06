import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JQ_TOKEN } from '../services/jquery.service';
import { Student, MembersService } from '../services/members.service';
import { Toastr, TOASTR_TOKEN } from '../services/toastr.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  student: Student;
  constructor(
    @Inject(JQ_TOKEN) private $: any,
    private member: MembersService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
    ) { }

  ngOnInit(): void {
    // this.student = {
    //   id: 0,
    //   fname: 'First',
    //   lname: 'Last',
    //   regno: 'Registration Number',
    //   faculty: '',
    //   course: '',
    //   year: '1970',
    //   created: ''
    // };
    const id = this.route.snapshot.params['id'];
    this.getMemberDetails(id);
    this.$('.verify-btn').on('click', () => {
      this.$('.ui.small.modal').first().modal('show');
    });
  }

  getMemberDetails(id: number) {
    this.member.getMemberDetails(id).subscribe((member: Student) => {
      this.student = member;
    });
  }
  deleteStudent(e) {
    e.preventDefault();
    const id = e.target.id.value;
    const choice = confirm('Do you want to proceed?');
    if (choice) {
      this.member.destroyStudent(id).subscribe((memberId: number) => {
        this.router.navigate([`/members`]);
        this.toastr.success('Student deleted successfully');
      });
    }
  }
  getDate(timestamp: string) {
    return new Date(timestamp).toDateString();
  }
  getYear(timestamp) {
    return (new Date(timestamp)).getFullYear();
  }
}
