import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../core/service/doctor.service';
import {Utilities} from '../../core/service/utilities';
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DetailComponent} from "../detail/detail.component";

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.scss']
})
export class ListDoctorComponent implements OnInit {
  public utils = Utilities;
  public doctorList = [];
  public total = 0;
  constructor(
    private doctorService: DoctorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.doctorService.getListDoctors().subscribe( result => {
      console.log(result);
      if (result){
        this.total = result.total;
        this.doctorList = result.doctors;
      }
    }, error => {
      console.log(error);
    });
  }

  showRowDetail(event): void {
    console.log(event);
    this.router.navigate(['doctors/detail', this.utils.encode(event.idDoctor.toString(10))]);
  }
}
