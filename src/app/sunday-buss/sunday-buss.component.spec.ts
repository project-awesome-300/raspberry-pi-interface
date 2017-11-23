import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SundayBussComponent } from './sunday-buss.component';

describe('SundayBussComponent', () => {
  let component: SundayBussComponent;
  let fixture: ComponentFixture<SundayBussComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SundayBussComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SundayBussComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
