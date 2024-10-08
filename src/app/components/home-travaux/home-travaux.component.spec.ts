import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTravauxComponent } from './home-travaux.component';

describe('HomeTravauxComponent', () => {
  let component: HomeTravauxComponent;
  let fixture: ComponentFixture<HomeTravauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTravauxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeTravauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
