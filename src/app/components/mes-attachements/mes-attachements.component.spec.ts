import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesAttachementsComponent } from './mes-attachements.component';

describe('MesAttachementsComponent', () => {
  let component: MesAttachementsComponent;
  let fixture: ComponentFixture<MesAttachementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesAttachementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesAttachementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
