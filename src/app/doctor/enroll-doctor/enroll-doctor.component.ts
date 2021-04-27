import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbCalendar, NgbDateStruct, NgbInputDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {DoctorService} from '../../core/service/doctor.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-enroll-doctor',
  templateUrl: './enroll-doctor.component.html',
  styleUrls: ['./enroll-doctor.component.scss']
})
export class EnrollDoctorComponent implements OnInit {
  public registerForm: FormGroup;
  public submitted = false;
  public dateModel: NgbDateStruct;
  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
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
      speciality: ['', [Validators.required, Validators.maxLength(40)]],
      birthday: [''],
      address: ['', [Validators.required, Validators.maxLength(40)]],
      photo: ['']
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
    const paramMedicalRecord = this.registerForm.value;
    paramMedicalRecord.birthday = jsDate;
    this.doctorService.saveDoctor(paramMedicalRecord).subscribe( result => {
      this.router.navigate(['doctors/list']);
    }, error => {
      console.log(error);
    });
  }
}
