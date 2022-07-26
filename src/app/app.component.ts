import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IPlanet } from './models/planet';
import { PlanetsService } from './services/planets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rit';
  planets: IPlanet[] = [];
  //planets$: Observable<IPlanet[]>;
  loading = false;

  constructor(private planetsService: PlanetsService) {}
  ngOnInit(): void {
    this.loading = true;
    // this.planets$ = this.planetsService
    //   .getAllPlanets()
    //   .pipe(tap(() => (this.loading = false)));
    this.planetsService.getAllPlanets().subscribe((planets) => {
      this.planets = planets;
      this.loading = false;
    });
  }
}
