import { TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MapComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  const fixture = TestBed.createComponent(MapComponent);
  it(`should have the 'd280' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('D280 Map');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MapComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, d280');
  });
});
