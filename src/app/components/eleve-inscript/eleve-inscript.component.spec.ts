import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveInscriptComponent } from './eleve-inscript.component';

describe('EleveInscriptComponent', () => {
  let component: EleveInscriptComponent;
  let fixture: ComponentFixture<EleveInscriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EleveInscriptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EleveInscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
