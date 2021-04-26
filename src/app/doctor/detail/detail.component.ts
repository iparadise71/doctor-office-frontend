import {Component, Input, OnInit} from '@angular/core';
import {DoctorModel} from '../../core/models/doctor.model';
import {ActivatedRoute, Route} from '@angular/router';
import {DoctorService} from '../../core/service/doctor.service';
import {MedicalRecordService} from '../../core/service/medical-record.service';
import {Utilities} from '../../core/service/utilities';
import {PatientModel} from "../../core/models/patient.model";
import {Observable} from "rxjs-compat";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public utils = Utilities;
 public doctor: DoctorModel;
 public patientList: PatientModel[] = [];
 private idDoctor = '';
 private total = 0;
  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private medicalRecordService: MedicalRecordService
  ) {
    const param = this.route.snapshot.paramMap.get('id');
    if (param){
      this.idDoctor = this.utils.decode(param);
    }
    Observable.combineLatest(
      this.doctorService.getDetailDoctor({idDoctor: this.idDoctor}),
      this.medicalRecordService.getListRecordByDoctors({idDoctor: this.idDoctor})
    ).subscribe( ([doctor, medicalRecord]) => {
      if(doctor && doctor.doctor){
        this.doctor = doctor.doctor;
      }
      if(medicalRecord && medicalRecord.total && medicalRecord.total > 0){
        this.total = medicalRecord.total;
        const patientList = medicalRecord.medicalRecord.map( value => {
          return value.patient;
        });
        this.patientList = this.utils.uniqueItemList(patientList, 'idPatient');
      }
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
