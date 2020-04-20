import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySecurityQuestionsComponent } from './verify-security-questions.component';

describe('VerifySecurityQuestionsComponent', () => {
  let component: VerifySecurityQuestionsComponent;
  let fixture: ComponentFixture<VerifySecurityQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifySecurityQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifySecurityQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
