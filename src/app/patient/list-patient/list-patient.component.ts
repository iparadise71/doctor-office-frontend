import { Component, OnInit } from '@angular/core';
import {Utilities} from '../../core/service/utilities';
import {Router} from '@angular/router';
import {PatientService} from '../../core/service/patient.service';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.scss']
})
export class ListPatientComponent implements OnInit {
  public utils = Utilities;
  public patientList = [];
  public total = 0;
  constructor(
    private patientService: PatientService,
    private router: Router
  ) {
    this.patientService.getListPatients().subscribe( result => {
      if (result){
        this.total = result.total;
        this.patientList = result.patients;
      }
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
  }
  showRowDetail(event): void {
    this.router.navigate(['patients/detail', this.utils.encode(event.idPatient.toString(10))]);
  }
}
