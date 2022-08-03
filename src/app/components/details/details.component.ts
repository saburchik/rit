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
  public common: IPeople[] = []
  public sort: string
  public filterGender: IPeople[] = []
  public people: IPeople[] = []
  public residents: string[] | IPeople[]
  public planet: IPlanet
  public planetId: string
  public routeSub: Subscription
  public planetSub: Subscription
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.planetId = params['id']
      this.getDetails(this.planetId)
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
                this.common = this.people
              })
          }
        }
      })
  }
  filteringGender(sort: string): void {
    this.filterGender = []
    if (this.people) {
      for (let i = 0; i < this.people.length; i++) {
        if (this.people[i].gender === sort) {
          this.filterGender = [...this.filterGender, this.people[i]]
          this.common = this.filterGender
        }
        if (this.filterGender.length === 0) {
          this.common = this.filterGender
        }
      }
      if (sort === 'all') this.common = this.people
      console.log(this.filterGender)
    }

    console.log(this.people)
  }
  ngOnDestroy(): void {
    if (this.planetSub) this.planetSub.unsubscribe()
    if (this.routeSub) this.routeSub.unsubscribe()
  }
}
