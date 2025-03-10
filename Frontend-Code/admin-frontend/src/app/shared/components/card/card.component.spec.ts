import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCardComponent } from './card.component';

describe('CardComponent', () => {
  let component: DynamicCardComponent;
  let fixture: ComponentFixture<DynamicCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
