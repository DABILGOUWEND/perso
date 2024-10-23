import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbordEntreprisesComponent } from './tbord-entreprises.component';

describe('TbordEntreprisesComponent', () => {
  let component: TbordEntreprisesComponent;
  let fixture: ComponentFixture<TbordEntreprisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TbordEntreprisesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbordEntreprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
