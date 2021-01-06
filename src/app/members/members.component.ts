import { Component, OnInit } from '@angular/core';
import { Student, MembersService } from '../services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  searchResult: Student[];
  count = 0;
  constructor(private member: MembersService) { }

  ngOnInit(): void {
    this.searchResult  = [];
  }

  searchMember(e) {
    e.preventDefault();
    const query = e.target.q.value;
    this.member.searchMember(query).subscribe((members: Student[]) => {
      this.searchResult = members;
    });
  }
  allStudents() {
    this.member.allStudents().subscribe((students: Student[]) => {
      this.searchResult = students;
    });
  }
}
