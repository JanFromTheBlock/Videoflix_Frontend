import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateNewPwComponent } from './activate-new-pw.component';

describe('ActivateNewPwComponent', () => {
  let component: ActivateNewPwComponent;
  let fixture: ComponentFixture<ActivateNewPwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateNewPwComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivateNewPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
