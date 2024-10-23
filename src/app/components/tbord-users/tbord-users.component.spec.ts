import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbordUsersComponent } from './tbord-users.component';

describe('TbordUsersComponent', () => {
  let component: TbordUsersComponent;
  let fixture: ComponentFixture<TbordUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TbordUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbordUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
