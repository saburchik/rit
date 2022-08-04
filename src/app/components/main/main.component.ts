import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { APIResponse, IPlanet } from 'src/app/models/models'
import { HttpService } from 'src/app/services/http.service'
import { LoaderService } from 'src/app/services/loader/loader.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy {
  public planets: Array<IPlanet> = []
  private routeSub: Subscription
  private planetSub: Subscription
  constructor(
    private httpService: HttpService,
    private router: Router,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.getPlanets()
  }
  getPlanets(): void {
    this.planetSub = this.httpService
      .getPlanetList()
      .subscribe((planetList: APIResponse<IPlanet>) => {
        this.planets = planetList.results
      })
  }
  openPlanetDetails(url: string) {
    const planetId: RegExpMatchArray | null = url.match(/\d+/g)
    if (planetId) {
      this.router.navigate(['details', planetId[0]])
      window.scrollTo(0, 0)
    }
  }
  ngOnDestroy(): void {
    if (this.planetSub) this.planetSub.unsubscribe()
    if (this.routeSub) this.routeSub.unsubscribe()
  }
}
