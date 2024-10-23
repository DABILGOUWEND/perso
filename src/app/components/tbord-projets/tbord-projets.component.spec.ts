import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbordProjetsComponent } from './tbord-projets.component';

describe('TbordProjetsComponent', () => {
  let component: TbordProjetsComponent;
  let fixture: ComponentFixture<TbordProjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TbordProjetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbordProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
