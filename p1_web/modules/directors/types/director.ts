export interface MovieSummary {
  id: string;
  title: string;
  poster: string;
}

export interface Director {
  id: string;
  name: string;
  photo: string;
  nationality: string;
  birthDate: string;
  biography: string;
  movies: MovieSummary[];
}