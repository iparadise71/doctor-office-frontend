import {Component, Input, OnInit, Output, PipeTransform, ViewChild, EventEmitter} from '@angular/core';
import {DoctorModel} from '../../core/models/doctor.model';
import {ColumnModel} from '../../core/models/column.model';
import {ColumnType, Utilities} from '../../core/service/utilities';
import {SearchFieldComponent} from '../search-field/search-field.component';
import {Observable} from 'rxjs-compat';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  @ViewChild('filter') filter: SearchFieldComponent;
  @Input() dataList: any[] = [];
  @Input() dataListAux: any[] = [];
  @Input() columnList: ColumnModel[] = [];
  @Input() searchPlaceholder: string;
  @Input() page;
  @Input() pageSize;
  @Input() collectionSize;
  @Output() rowSelected = new EventEmitter();
  public utils = Utilities;
  public columnTypes = ColumnType;
  public value;
  constructor() {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.refreshCountries();
    }, 200);
  }

  renderCell(row: any, column: any): any {
    if (column.field) {
      for (const field of column.field.split('.')) {
        row = row[field];
      }
      return row;
    }
  }

  refreshCountries(): any {
    this.dataList = this.dataListAux
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
