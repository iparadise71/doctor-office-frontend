import { Component, OnInit } from '@angular/core';
import {MedicalRecordService} from '../../core/service/medical-record.service';
import {Router} from '@angular/router';
import {Utilities} from '../../core/service/utilities';

@Component({
  selector: 'app-list-medical-record',
  templateUrl: './list-medical-record.component.html',
  styleUrls: ['./list-medical-record.component.scss']
})
export class ListMedicalRecordComponent implements OnInit {
  public utils = Utilities;
  public total = [];
  public medicalRecordList = [];

  constructor(
    private medicalRecordService: MedicalRecordService,
    private router: Router
  ) {
    this.medicalRecordService.getListMedicalRecords().subscribe( result => {
      if (result && result.total && result.total > 0){
        console.log(result);
        this.total = result.total;
        const medicalRecordList = result.medicalRecord.map( value => {
          value.dateTime = new Date(value.date).getTime();
          value.doctor.name = value.doctor.name + ' ' + value.doctor.lastName;
          value.patient.name = value.patient.name + ' ' + value.patient.lastName;
          return value;
        });
        this.medicalRecordList = this.utils.sortList(medicalRecordList, 'dateTime', 'DESC');
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

  addMedicalRecord(): void {
    this.router.navigate(['medical-record/register']);
  }
}
