import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbCalendar, NgbDateStruct, NgbInputDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {PatientService} from '../../core/service/patient.service';

@Component({
  selector: 'app-enroll-patient',
  templateUrl: './enroll-patient.component.html',
  styleUrls: ['./enroll-patient.component.scss']
})
export class EnrollPatientComponent implements OnInit {
  public registerForm: FormGroup;
  public submitted = false;
  public dateModel: NgbDateStruct;
  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    config: NgbInputDatepickerConfig,
    calendar: NgbCalendar
  ) {
    config.minDate = {year: 1900, month: 1, day: 1};
    config.maxDate = {year: 2099, month: 12, day: 31};
    this.dateModel = calendar.getToday();
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      birthday: [''],
      address: ['', [Validators.required, Validators.maxLength(40)]]
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
      this.dateModel.day
    );
    const paramEnroll = this.registerForm.value;
    paramEnroll.birthday = jsDate;
    this.patientService.savePatient(paramEnroll).subscribe( result => {
      this.router.navigate(['patients/list']);
    }, error => {
      console.log(error);
    });
  }
}
