import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComptaComponent } from './home-compta.component';

describe('HomeComptaComponent', () => {
  let component: HomeComptaComponent;
  let fixture: ComponentFixture<HomeComptaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComptaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComptaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
