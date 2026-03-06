export interface MovieSummary {
  id: string;
  title: string;
  poster: string;
}

export interface Actor {
  id: string;
  name: string;
  photo: string;
  nationality: string;
  birthDate: string;
  biography: string;
  movies: MovieSummary[];
}