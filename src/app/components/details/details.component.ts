import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { APIResponse, IPeople, IPlanet } from 'src/app/models/models'
import { HttpService } from 'src/app/services/http.service'
import { LoaderService } from 'src/app/services/loader/loader.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  people: IPeople[] = []
  residents: string[] | IPeople[]
  planet: IPlanet
  planetId: string
  routeSub: Subscription
  planetSub: Subscription
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    public loaderService: LoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.planetId = params['id']
      this.getDetails(this.planetId)
    })
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) return
      window.scrollTo(0, 0)
    })
  }
  getDetails(id: string): void {
    this.planetSub = this.httpService
      .getPlanetDetails(id)
      .subscribe((planetResponse: IPlanet) => {
        this.planet = planetResponse
        this.residents = planetResponse.residents

        if (this.residents) {
          for (let i: number = 0; i < this.residents.length; i++) {
            this.httpService
              .getPeopleDetails(this.residents[i])
              .subscribe((peopleResponse: IPeople) => {
                this.people = [...this.people, peopleResponse]
              })
          }
        }
      })
  }
  ngOnDestroy(): void {
    if (this.planetSub) this.planetSub.unsubscribe()
    if (this.routeSub) this.routeSub.unsubscribe()
  }
}
