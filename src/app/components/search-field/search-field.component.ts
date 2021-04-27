import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {

  @Input() placeholder = '';
  @Input() value = '';
  @Output() valueChange = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void {}

  keyUp(event): void {
    this.valueChange.emit(this.value);
    if (event.key === 'Enter') {
      this.valueChange.emit(this.value);
    }
  }
}
