import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FullContainerComponent } from './full-container/full-container.component';
import { CardOptionComponent } from './card-option/card-option.component';
import {RouterModule} from '@angular/router';
import { TableListComponent } from './table-list/table-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Filter} from '../core/service/filter';
import { SearchFieldComponent } from './search-field/search-field.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { IconComponent } from './icon/icon.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FullContainerComponent,
    CardOptionComponent,
    TableListComponent,
    Filter,
    SearchFieldComponent,
    IconComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
    exports: [
        HeaderComponent,
        FullContainerComponent,
        CardOptionComponent,
        TableListComponent,
        IconComponent
    ]
})
export class ComponentsModule { }
