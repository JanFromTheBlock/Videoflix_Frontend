import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesMailActivationComponent } from './succes-mail-activation.component';

describe('SuccesMailActivationComponent', () => {
  let component: SuccesMailActivationComponent;
  let fixture: ComponentFixture<SuccesMailActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccesMailActivationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccesMailActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
