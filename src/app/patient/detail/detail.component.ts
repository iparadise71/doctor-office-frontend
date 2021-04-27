//noinspection deprecation
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MedicalRecordService} from '../../core/service/medical-record.service';
import {Utilities} from '../../core/service/utilities';
import {PatientModel} from '../../core/models/patient.model';
import {Observable} from 'rxjs';
import {PatientService} from '../../core/service/patient.service';
import {MedicalRecordModel} from '../../core/models/medical-record.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public utils = Utilities;
  public patient: PatientModel;
  public medicalRecordList = [];
  public medicalRecordSelected: MedicalRecordModel;
  public prescriptionList = [];
  public total = 0;
  private idPatient = '';

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private medicalRecordService: MedicalRecordService
  ) {
    const param = this.route.snapshot.paramMap.get('id');
    if (param){
      this.idPatient = this.utils.decode(param);
    }
    Observable.combineLatest(
      this.patientService.getDetailPatient({idPatient: this.idPatient}),
      this.medicalRecordService.getListRecordByPatient({idPatient: this.idPatient})
    ).subscribe( ([patient, medicalRecord]) => {
      if (patient && patient.patient) {
        this.patient = patient.patient;
      }
      if (medicalRecord && medicalRecord.total && medicalRecord.total > 0){
        console.log(medicalRecord);
        this.total = medicalRecord.total;
        this.medicalRecordList = medicalRecord.medicalRecord;
      }
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
  }

  showRowDetail(event): void {
    console.log(event);
    this.medicalRecordSelected = event;
    this.prescriptionList = this.medicalRecordSelected.prescriptionList;
  }

  closeDetail(): void {
    this.prescriptionList = [];
    this.medicalRecordSelected = undefined;
  }
}
