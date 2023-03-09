import { Pokemon } from 'src/_model/Pokemon';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, mergeMap, ReplaySubject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public pokemons: Pokemon[] = [];

  constructor(
    private httpClient: HttpClient,
  ) {
    const allPokemonsURL = 'https://pokeapi.co/api/v2/pokemon/?limit=200';


    this.httpClient.get<any>(allPokemonsURL).pipe(
      map( value => value.results),
      map((value: any) => {
        return from(value).pipe(
          mergeMap((v: any) => this.httpClient.get(v.url))
        );
      }),
      mergeMap(value => value),
    ).subscribe((result: any) => {
      const pokemon: Pokemon = {
        image: result.sprites.front_default,
        number: result.id,
        name: result.name,
        types: result.types.map((t: any) => t.type.name),
      };

      console.log(pokemon);

      this.pokemons[result.id] = pokemon;
    });
  }
}
