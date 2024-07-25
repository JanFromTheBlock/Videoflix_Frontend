import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateYourMailComponent } from './activate-your-mail.component';

describe('ActivateYourMailComponent', () => {
  let component: ActivateYourMailComponent;
  let fixture: ComponentFixture<ActivateYourMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateYourMailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivateYourMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
