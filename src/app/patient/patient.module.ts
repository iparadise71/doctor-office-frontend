import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import {RouterModule, Routes} from '@angular/router';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { DetailComponent } from './detail/detail.component';
import {ComponentsModule} from '../components/components.module';
import { EnrollPatientComponent } from './enroll-patient/enroll-patient.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'list',
        component: ListPatientComponent
      },
      {
        path: 'enroll',
        component: EnrollPatientComponent
      },
      {
        path: 'detail',
        component: DetailComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent
      },
      {
        path: '',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  declarations: [
    IndexComponent,
    ListPatientComponent,
    DetailComponent,
    EnrollPatientComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class PatientModule { }
