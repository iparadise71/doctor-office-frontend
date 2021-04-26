import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class Filter implements PipeTransform {
  transform(items, searchTerm) {
    const filteredList = [];
    if (searchTerm) {
      const newSearchTerm = !isNaN(searchTerm)
        ? searchTerm.toString()
        : searchTerm.toString().toUpperCase();
      let prop;
      return items.filter(item => {
        for (const key in item) {
          prop = isNaN(item[key])
            ? item[key].toString().toUpperCase()
            : item[key] !== null ? item[key].toString() : '';
          if (prop.indexOf(newSearchTerm) > -1) {
            filteredList.push(item);
            return filteredList;
          }
        }
      });
    } else {
      return items;
    }
  }
}
