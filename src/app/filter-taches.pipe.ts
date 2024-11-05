import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTaches',
  standalone: true
})
export class FilterTachesPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.toLocaleLowerCase().includes(searchText);
    });
  }

}
