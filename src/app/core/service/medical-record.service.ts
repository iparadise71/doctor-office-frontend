import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
const apiUrl = `${environment.apiUrl}/api/medical-record`;
@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {
  constructor(
    private api: HttpClient
  ) { }

  getListRecordByDoctors(object: any): Observable<any>{
    return this.api.post(`${apiUrl}/list-record-by-doctor`, object);
  }
  getListRecordByPatient(object: any): Observable<any>{
    return this.api.post(`${apiUrl}/list-record-by-patient`, object);
  }
}
