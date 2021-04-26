import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

const apiUrl = `${environment.apiUrl}/api/doctor`;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private api: HttpClient
  ) { }

  getListDoctors(): Observable<any>{
    return this.api.get(`${apiUrl}/list`);
  }
  getDetailDoctor(obj): Observable<any>{
    return this.api.post(`${apiUrl}/detail-doctor`, obj);
  }
}
