import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPwResetComponent } from './success-pw-reset.component';

describe('SuccessPwResetComponent', () => {
  let component: SuccessPwResetComponent;
  let fixture: ComponentFixture<SuccessPwResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessPwResetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessPwResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
