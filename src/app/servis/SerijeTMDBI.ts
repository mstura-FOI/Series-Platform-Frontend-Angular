export interface SerijeTmdbI {
    page: number;
    results: Array<SerijaTmdbI>;
    total_pages: number;
    total_results: number;
  }
  export interface SerijaTmdbI {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>;
    homepage:string;
    id: number;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    seasons: Seasons;
    number_of_episodes: number;
    number_of_seasons:number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
  export interface Seasons{
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }
  export interface Sezona {
  id: number;
  broj_epizoda: number;
  broj_sezone: number;
  naziv?: string;
  opis?: string;
  serija_id: number;
}
export interface Serija{
  id: number;
  naziv: string;
  opis: string;
  broj_sezona: number;
  broj_epizoda: number;
  popularnost: number;
  poster_putanja: string;
  poveznica: string;
}
export interface gitSerija{
      korID: 0,
      serijaID: number,
      naziv: string,
      opis:  string,
      broj_sezona: number,
      broj_epizoda: number,
      popularnost: number,
      poster_putanja: string,
      poveznica: string,
      sezone: Seasons
}
