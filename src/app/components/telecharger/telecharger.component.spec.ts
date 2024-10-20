import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelechargerComponent } from './telecharger.component';

describe('TelechargerComponent', () => {
  let component: TelechargerComponent;
  let fixture: ComponentFixture<TelechargerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelechargerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelechargerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
