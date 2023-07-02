import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchTerm: string, propName: string): any[] {
    if (!value || !searchTerm || !propName) {
      return value;
    }

    searchTerm = searchTerm.toLowerCase().trim();

    return value.filter(item => {
      const propValue = item[propName]?.toLowerCase();
      return propValue.includes(searchTerm);
    });
  }
}
