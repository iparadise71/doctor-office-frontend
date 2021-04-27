/* tslint:disable:component-selector */
import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: '[icon]',
  template: `<svg>
    <use attr.xlink:href="/assets/img/icons.svg#{{ icon.split(' ')[0] }}"></use>
  </svg>`,
  styleUrls: ['./icon.component.scss']
})
export class IconComponent  {
  @HostBinding('attr.icon') @Input() icon = '';
}
