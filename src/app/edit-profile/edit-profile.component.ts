import { Inject, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JQ_TOKEN } from '../services/jquery.service';
import { Student, MembersService } from '../services/members.service';
import { Toastr, TOASTR_TOKEN } from '../services/toastr.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  id: number = undefined;
  student: Student;
  constructor(
    @Inject(JQ_TOKEN) private $: any,
    private route: ActivatedRoute,
    private router: Router,
    private member: MembersService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
    ) { }

  ngOnInit(): void {
    // this.student = {
    //   id: 0,
    //   fname: 'First',
    //   lname: 'Last',
    //   regno: 'Registration Number',
    //   code: '1970',
    //   faculty: '',
    //   course: '',
    //   created: ''
    // };
    try {
      this.id = this.route.snapshot.params['id'];
      if (this.id !== undefined) {
        this.getMemberDetails(this.id);
      }
    } catch (error) {}
    this.$('.ui.dropdown').dropdown({
      // values: this.books,
      onChange: (value, text, $choice) => {
        if (value === 'Male' || value === 'Female') {
          this.$('#gender').val(value);
        } else {
          this.$('#faculty').val(text);
        }
      }
    });
  }
  getMemberDetails(id: number) {
    this.member.getMemberDetails(id).subscribe((member: Student) => {
      this.student = member;
    });
  }
  saveMemberDetails(e) {
    e.preventDefault();
    const id = this.id;
    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const gender = e.target.gender.value;
    const code = e.target.code.value;
    const faculty = e.target.faculty.value;
    const course = e.target.course.value;
    if (this.id === undefined) {
      this.member.storeMember({fname, lname, gender, code, faculty, course}).subscribe((studentId: number) => {
        this.router.navigate([`/members/${studentId}`]);
        this.toastr.success('Student Registered successfully');
      });
    } else {
      this.member.updateMember({id, fname, lname, gender, code, faculty, course}).subscribe((studentId: number) => {
        this.router.navigate([`/members/${studentId}`]);
        this.toastr.success('Student Updated successfully');
      });
    }
  }

}
