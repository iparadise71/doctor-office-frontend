import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DoctorService} from '../../core/service/doctor.service';
import {MedicalRecordService} from '../../core/service/medical-record.service';
import {Utilities} from '../../core/service/utilities';
import {DoctorModel} from '../../core/models/doctor.model';
import {PatientModel} from '../../core/models/patient.model';
import {Observable} from 'rxjs-compat';
import {PatientService} from '../../core/service/patient.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public utils = Utilities;
  public patient: PatientModel;
  public medicalRecordList;
  private idPatient = '';
  private total = 0;
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private medicalRecordService: MedicalRecordService
  ) {
    const param = this.route.snapshot.paramMap.get('id');
    if (param){
      console.log(this.utils.decode(param));
      this.idPatient = this.utils.decode(param);
    }
    Observable.combineLatest(
      this.patientService.getDetailPatient({idPatient: this.idPatient}),
      this.medicalRecordService.getListRecordByPatient({idPatient: this.idPatient})
    ).subscribe( ([patient, medicalRecord]) => {
      if (patient && patient.patient){
        this.patient = patient.patient;
      }
      if (medicalRecord && medicalRecord.total && medicalRecord.total > 0){
        console.log(medicalRecord);
        this.total = medicalRecord.total;
        this.medicalRecordList = medicalRecord.medicalRecord;
      }
      console.log(patient);
      console.log(medicalRecord);
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
  }

  showRowDetail(event): void {
    console.log(event);
  }
}
