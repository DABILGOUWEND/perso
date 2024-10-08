import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGestionChantierComponent } from './home-gestion-chantier.component';

describe('HomeGestionChantierComponent', () => {
  let component: HomeGestionChantierComponent;
  let fixture: ComponentFixture<HomeGestionChantierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGestionChantierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeGestionChantierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
