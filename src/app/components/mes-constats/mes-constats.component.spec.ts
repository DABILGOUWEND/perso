import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesConstatsComponent } from './mes-constats.component';

describe('MesConstatsComponent', () => {
  let component: MesConstatsComponent;
  let fixture: ComponentFixture<MesConstatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesConstatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesConstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
