import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { IndexComponent } from './index/index.component';
import {ComponentsModule} from "../components/components.module";
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  }
];


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NgbCarouselModule
  ]
})
export class HomeModule { }
