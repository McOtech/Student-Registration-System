import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ACTION_LOGOUT } from '../store/actions/auth.action';
import { AuthToken } from '../store/reducers/auth.reducer';

export interface Student {
  id: number;
  fname: string;
  lname: string;
  regno: string;
  code: string;
  gender: string;
  course: string;
  faculty: string;
  created: string;
}


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  status: boolean = false;

  constructor(private http: HttpClient, private store: Store) { }

  searchMember(query) {
    return this.http.post<Student[]>(`/api/search`, {
      query
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  allStudents() {
    return this.http.get<Student[]>(`/api/students`);
  }
  destroyStudent(id: number) {
    return this.http.delete(`/api/students/${id}`);
  }
  storeMember({fname, lname, gender, code, faculty, course}) {
    return this.http.post('/api/students', {
      fname, lname, gender, code, faculty, course
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  updateMember({id, fname, lname, gender, code, faculty, course}) {
    return this.http.patch(`/api/students/${id}`, {
      fname, lname, gender, code, faculty, course
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  getMemberDetails(id: number) {
    return this.http.get<Student>(`/api/students/${id}`);
  }
  loginUser({code, password}) {
    return this.http.post(`/api/login`, {
      code, password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  logout() {
    this.store.dispatch({type: ACTION_LOGOUT});
  }
  setIsLoggedIn() {
    this.store.select<AuthToken>((reducer: any): AuthToken => reducer.authReducer).subscribe((authToken: AuthToken) => {
      this.status = authToken.status;
    });
  }
  get isLoggedIn() {
    return this.status;
  }
}
