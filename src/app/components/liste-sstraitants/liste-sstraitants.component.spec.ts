import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSstraitantsComponent } from './liste-sstraitants.component';

describe('ListeSstraitantsComponent', () => {
  let component: ListeSstraitantsComponent;
  let fixture: ComponentFixture<ListeSstraitantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeSstraitantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeSstraitantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
