import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Subscription } from 'rxjs'
import { IPeople, IPlanet } from 'src/app/models/models'
import { HttpService } from 'src/app/services/http.service'
import { LoaderService } from 'src/app/services/loader/loader.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  private planetId: string
  private filterGender: IPeople[]
  private allPeople: IPeople[] = []
  private residentsAPI: Array<string> | IPeople[]
  private routeSub: Subscription
  private planetSub: Subscription

  public planet: IPlanet
  public people: IPeople[] = []
  public sort: string

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.planetId = params['id']
      this.getPlanetDetails(this.planetId)
    })
  }
  getPlanetDetails(id: string): void {
    this.planetSub = this.httpService
      .getPlanetDetailsHttp(id)
      .subscribe((planetResponse: IPlanet) => {
        this.planet = planetResponse
        this.residentsAPI = planetResponse.residents

        for (let i = 0; i < this.residentsAPI.length; i++) {
          this.httpService
            .getPeopleDetails(this.residentsAPI[i] as string)
            .subscribe((response: IPeople) => {
              this.allPeople = [...this.allPeople, response]
              this.people = this.allPeople
            })
        }
      })
  }
  filteringGender(sort: string): void {
    this.filterGender = []
    for (let i = 0; i < this.allPeople.length; i++) {
      if (this.allPeople[i].gender === sort) {
        this.filterGender = [...this.filterGender, this.allPeople[i]]
        this.people = this.filterGender
      }
      if (!this.filterGender.length) this.people = this.filterGender
    }
    if (sort === 'all') this.people = this.allPeople
  }
  ngOnDestroy(): void {
    if (this.planetSub) this.planetSub.unsubscribe()
    if (this.routeSub) this.routeSub.unsubscribe()
  }
}
