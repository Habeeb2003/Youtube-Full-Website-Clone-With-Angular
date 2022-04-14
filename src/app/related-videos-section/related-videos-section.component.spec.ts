import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedVideosSectionComponent } from './related-videos-section.component';

describe('RelatedVideosSectionComponent', () => {
  let component: RelatedVideosSectionComponent;
  let fixture: ComponentFixture<RelatedVideosSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedVideosSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedVideosSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
