import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { People, Planet } from 'src/app/models/planet';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  people: any;
  planet: Planet;
  planetId: string;
  routeSub: Subscription;
  planetSub: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.planetId = params['id'];
      this.getDetails(this.planetId);
    });
  }
  getDetails(id: string): void {
    this.planetSub = this.httpService
      .getPlanetDetails(id)
      .subscribe((planetResponse: Planet) => {
        this.planet = planetResponse;
        this.people = planetResponse.residents;

        this.httpService
          .getPeopleDetails(this.people)
          .subscribe((personRes: any) => {
            console.log(personRes);
          });
      });
  }
  getPeople(people: Array<string>): void {}
  ngOnDestroy(): void {
    if (this.planetSub) this.planetSub.unsubscribe();
    if (this.routeSub) this.routeSub.unsubscribe();
  }
}
