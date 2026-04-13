import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeBackgroundComponent } from './youtube-background.component';

describe('YoutubeBackgroundComponent', () => {
  let component: YoutubeBackgroundComponent;
  let fixture: ComponentFixture<YoutubeBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YoutubeBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
