import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { WenService } from '../../wen.service';
import { ApproGasoilStore, DatesStore, EnginsStore, GasoilStore, PersonnelStore, TachesEnginsStore, TachesStore, UnitesStore } from '../../store/appstore';
import { ImportedModule } from '../../modules/imported/imported.module';
import { DateTime, Info, Interval } from 'luxon';
import { toUnicode } from 'node:punycode';
import e from 'express';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';


interface Family {
  name: string;
  children?: Family[];
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-essai2',
  standalone: true,
  imports: [ImportedModule],
  templateUrl: './essai2.component.html',
  styleUrl: './essai2.component.scss'
})
export class Essai2Component implements OnInit {
  private _transformer = (node: Family, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );



  hasChild = (_: number,
    node: ExampleFlatNode) => node.expandable;

  _service = inject(WenService);
  _personnel_store = inject(PersonnelStore);
  _date_store = inject(DatesStore)
  debut_date = signal('21/12/2024');
  constructor() {
    effect(() => {
      let tab: any[] = [];
      var init = 5;
      var debut_date = '21/' + init + '/2024';
      var fin_date = this.getfin_date(debut_date);
      while (fin_date.getMonth() < new Date().getMonth()) {
        init++;
        let dates = this._personnel_store.getDates().filter((x: any) => {
          return this._service.convertDate(x).getTime() >= this._service.convertDate(debut_date).getTime()
            && this._service.convertDate(x).getTime() <= fin_date.getTime()
        }).map((x: any) => { return { 'name': x } })
        tab.push({
          'name': 'Du ' + debut_date + ' au ' + fin_date.toLocaleDateString(),
          'children': dates
        });
        debut_date = '21/' + init + '/2024';
        fin_date = this.getfin_date(debut_date);

      }
      this.dataSource.data = tab.slice().reverse();
    }
    )
  }


  fin_date = computed(() => {
    let num_month1 = this._service.convertDate(this.debut_date()).getMonth();
    let num_month2 = num_month1 == 11 ? 0 : num_month1 + 1;
    let annee1 = this._service.convertDate(this.debut_date()).getFullYear();
    let annee2 = num_month1 == 11 ? annee1 + 1 : annee1;
    return this._service.convertDate('20/' + (num_month2 + 1) + '/' + annee2);
  }
  );
  weekDays = computed(() => {
    let star = this._service.convertDate(this.debut_date())
    star.setDate(star.getDate() - 1)
    let end = this.fin_date()
    return Interval.fromDateTimes(
      star,
      end,
    ).splitBy({ day: 1 }).map((d) => {
      if (d.end == null) {
        throw new Error('Wrong dates')
      }
      return d.end
    })
  })
  dataSource = new MatTreeFlatDataSource(
    this.treeControl, this.treeFlattener);
  ngOnInit() {

  }

  getfin_date(date: string) {
    let num_month1 = this._service.convertDate(date).getMonth();
    let num_month2 = num_month1 == 11 ? 0 : num_month1 + 1;
    let annee1 = this._service.convertDate(date).getFullYear();
    let annee2 = num_month1 == 11 ? annee1 + 1 : annee1;
    return this._service.convertDate('20/' + (num_month2 + 1) + '/' + annee2);
  }
filtre(name:string)
{
  this._personnel_store.filtrebyDate(name);
  console.log(name);
}
}
