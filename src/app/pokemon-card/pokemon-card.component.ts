import { Component, Input} from '@angular/core';
import { getPokemonImage, getPokemonNumber, Pokemon } from 'src/_model/Pokemon';


@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input('pokemon')
  public pokemon!: Pokemon;

  public getPokemonImage = getPokemonImage;

  public getPokemonNumber = getPokemonNumber;

}
