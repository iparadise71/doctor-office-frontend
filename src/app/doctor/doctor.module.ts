import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ComponentsModule} from '../components/components.module';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';
import { DetailComponent } from './detail/detail.component';
import { EnrollDoctorComponent } from './enroll-doctor/enroll-doctor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'list',
        component: ListDoctorComponent
      },
      {
        path: 'enroll',
        component: EnrollDoctorComponent
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
    ListDoctorComponent,
    DetailComponent,
    EnrollDoctorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
  ]
})
export class DoctorModule { }
