import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ListMedicalRecordComponent } from './list-medical-record/list-medical-record.component';
import { MedicalRecordComponent } from './medical-record/medical-record.component';
import {RouterModule, Routes} from '@angular/router';
import {ComponentsModule} from '../components/components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'list',
        component: ListMedicalRecordComponent
      },
      {
        path: 'register',
        component: MedicalRecordComponent
      },
      {
        path: 'detail/:id',
        component: MedicalRecordComponent
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
    ListMedicalRecordComponent,
    MedicalRecordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class MedicalRecordModule { }
