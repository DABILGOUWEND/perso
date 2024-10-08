import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyessaisComponent } from './myessais.component';

describe('MyessaisComponent', () => {
  let component: MyessaisComponent;
  let fixture: ComponentFixture<MyessaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyessaisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyessaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
