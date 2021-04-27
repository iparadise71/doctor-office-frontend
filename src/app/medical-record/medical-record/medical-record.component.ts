import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../core/service/doctor.service';
import {PatientService} from '../../core/service/patient.service';
import {MedicalRecordService} from '../../core/service/medical-record.service';
import {Observable} from 'rxjs-compat';
import {DoctorModel} from '../../core/models/doctor.model';
import {PatientModel} from '../../core/models/patient.model';
import {
  NgbCalendar,
  NgbDateStruct,
  NgbInputDatepickerConfig,
  NgbTimepickerConfig,
  NgbTimeStruct
} from '@ng-bootstrap/ng-bootstrap';
import {Utilities} from '../../core/service/utilities';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.scss'],
  providers: [DatePipe]
})
export class MedicalRecordComponent implements OnInit {
  public utils = Utilities;
  public doctorTotal = 0;
  public doctorList: DoctorModel[] = [];
  public patientList: PatientModel[] = [];
  public patientTotal = 0;
  public dateModel: NgbDateStruct;
  public timeModel: NgbTimeStruct = {hour: new Date().getHours(), minute: new Date().getMinutes(), second: 0};

  public registerForm: FormGroup;
  public submitted = false;
  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private medicalRecordService: MedicalRecordService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    config: NgbInputDatepickerConfig,
    calendar: NgbCalendar,
    configTime: NgbTimepickerConfig
  ) {
    config.minDate = {year: 1900, month: 1, day: 1};
    config.maxDate = {year: 2099, month: 12, day: 31};
    this.dateModel = calendar.getToday();
    configTime.seconds = false;
    configTime.spinners = false;

    Observable.combineLatest([
      this.doctorService.getListDoctors(),
      this.patientService.getListPatients()
    ]).subscribe( ([resultDoctors, resultPatients]) => {
      if (this.doctorList){
        this.doctorList = resultDoctors.doctors;
        this.doctorTotal = resultDoctors.total;
      }
      if (this.patientList){
        this.patientList = resultPatients.patients;
        this.patientTotal = resultPatients.total;
      }
    }, error => {
      console.log(error);
    });
    this.registerForm = this.formBuilder.group({
      doctor: ['', Validators.required],
      patient: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(40)]],
      date: [''],
      prescriptionDrug: ['', [Validators.required, Validators.maxLength(400)]],
      prescriptionList: [[''], [Validators.required]],
      idPatientMedicalRecord: [''],
      idDoctorMedicalRecord: [''],
    });
  }

  ngOnInit(): void {
  }

  get f(): any { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const jsDate = new Date(
      this.dateModel.year,
      this.dateModel.month - 1,
      this.dateModel.day,
      this.timeModel.hour,
      this.timeModel.minute
    );
    const paramMedicalRecord = this.registerForm.value;
    paramMedicalRecord.date = jsDate;
    paramMedicalRecord.idPatientMedicalRecord = this.registerForm.get('patient').value;
    paramMedicalRecord.idDoctorMedicalRecord = this.registerForm.get('doctor').value;
    paramMedicalRecord.doctor = this.doctorList.find( x => x.idDoctor + '' === this.registerForm.get('doctor').value);
    paramMedicalRecord.patient = this.patientList.find( x => x.idPatient + '' === this.registerForm.get('patient').value);
    console.log(this.registerForm.value);
    this.medicalRecordService.saveMedicalRecord(paramMedicalRecord).subscribe( result => {
      this.router.navigate(['medical-record/list']);
    });
  }

  registerDoctor(): void {
    this.router.navigate(['doctors/enroll']);
  }
}
