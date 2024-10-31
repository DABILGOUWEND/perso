import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LignedevisComponent } from './lignedevis.component';

describe('LignedevisComponent', () => {
  let component: LignedevisComponent;
  let fixture: ComponentFixture<LignedevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LignedevisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LignedevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
