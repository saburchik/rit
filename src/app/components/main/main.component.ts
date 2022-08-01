import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Planet } from 'src/app/models/planet';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public planets: Array<Planet> = [];
  public id: string;
  public routeSub: Subscription;
  public planetSub: Subscription;
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.searchPlanets();
  }
  searchPlanets(): void {
    this.planetSub = this.httpService
      .getPlanetList()
      .subscribe((planetList: APIResponse<Planet>) => {
        this.planets = planetList.results;
      });
  }
  openPlanetDetails(url: string) {
    const planetId: RegExpMatchArray | null = url.match(/\d+/g);
    if (planetId) this.router.navigate(['details', planetId[0]]);
  }
  ngOnDestroy(): void {
    if (this.planetSub) this.planetSub.unsubscribe();
    if (this.routeSub) this.routeSub.unsubscribe();
  }
}
