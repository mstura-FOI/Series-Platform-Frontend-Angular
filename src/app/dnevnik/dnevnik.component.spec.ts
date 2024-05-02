import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnevnikComponent } from './dnevnik.component';

describe('DnevnikComponent', () => {
  let component: DnevnikComponent;
  let fixture: ComponentFixture<DnevnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DnevnikComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnevnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
