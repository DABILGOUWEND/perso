import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbordClassesEnginsComponent } from './tbord-classes-engins.component';

describe('TbordClassesEnginsComponent', () => {
  let component: TbordClassesEnginsComponent;
  let fixture: ComponentFixture<TbordClassesEnginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TbordClassesEnginsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbordClassesEnginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
