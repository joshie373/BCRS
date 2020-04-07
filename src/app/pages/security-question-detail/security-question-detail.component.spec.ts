import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionDetailComponent } from './security-question-detail.component';

describe('SecurityQuestionDetailComponent', () => {
  let component: SecurityQuestionDetailComponent;
  let fixture: ComponentFixture<SecurityQuestionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityQuestionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
