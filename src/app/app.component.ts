import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorldBankService } from './services/world-bank.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit {
  countryID = '';
  @ViewChild('svgMap', { static: true }) svgMap!: ElementRef;

  /* Country Data */
  countryName: string = 'Hover over Country for Details';
  countryCapital: string = '';
  countryRegion: string = '';
  countryIncome: string = '';
  countryLatitude: string = '';
  countryLongitude: string = '';

  constructor(private worldBankService: WorldBankService) {}

  ngAfterViewInit(): void {
    this.setupSvgInteraction();
  }
  /* Logic to Change Color to Red on Hover*/
  setupSvgInteraction(): void {
    const paths = this.svgMap.nativeElement.querySelectorAll('path');
    paths.forEach((path: SVGPathElement) => {
      path.addEventListener('mouseover', (event) => this.onHover(event));
      path.addEventListener('mouseout', (event) => this.onLeave(event));
    });
  }

  onHover(event: MouseEvent): void {
    const target = event.target as SVGPathElement;
    target.style.fill = '#DC143C';
    this.getCountryData(target.id);
  }

  onLeave(event: MouseEvent): void {
    const target = event.target as SVGPathElement;
    target.style.fill = '';

    /* Empty table when hover off country */
    this.countryName = 'Hover over Country for Details';
    this.countryCapital = '';
    this.countryRegion = '';
    this.countryIncome = '';
    this.countryLatitude = '';
    this.countryLongitude = '';
  }

  ngOnInit(): void {}

  getCountryData(countryId: string): void {
    this.worldBankService.getCountryData(countryId).subscribe({
      next: (data) => {
        const details = data[1][0];
        /* Update component values with fetched data */
        this.countryName = details.name;
        this.countryCapital = `Capital: ` + details.capitalCity;
        this.countryRegion = `Region: ` + details.region.value;
        this.countryIncome = `Income: ` + details.incomeLevel.value;
        this.countryLatitude = `Latitude: ` + details.latitude;
        this.countryLongitude = `Longitude: ` + details.longitude;
      },
      error: (error) => console.error('Error fetching country data:', error),
    });
  }
}
