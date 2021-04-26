import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

const apiUrl = `${environment.apiUrl}/api/patient`;

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private api: HttpClient
  ) { }

  getListPatients(): Observable<any>{
    return this.api.get(`${apiUrl}/list`);
  }

  getDetailPatient(obj): Observable<any>{
    return this.api.post(`${apiUrl}/detail-patient`, obj);
  }
}
