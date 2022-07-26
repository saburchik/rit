import { Component, Input } from '@angular/core';
import { IPlanet } from 'src/app/models/planet';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.components.html',
})
export class PlanetComponent {
  @Input() planet: IPlanet;
}
