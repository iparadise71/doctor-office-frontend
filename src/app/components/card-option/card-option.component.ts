import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-option',
  templateUrl: './card-option.component.html',
  styleUrls: ['./card-option.component.scss']
})
export class CardOptionComponent implements OnInit {
  @Input() title;
  @Input() detail;
  @Input() image;
  @Input() actionLbl;
  @Input() action;
  constructor() { }

  ngOnInit(): void {
  }

}
