import { Pipe, PipeTransform } from '@angular/core';
import { unites } from './models/modeles';

@Pipe({
  name: 'unites',
  standalone: true
})
export class UnitesPipe implements PipeTransform {

  transform(id:string,unites:unites[]): unknown {
    let unite = unites.find(x => x.id == id)
    return unite?.unite;
  }

}
