import { Director } from "@/modules/directors/types/director";
import { Genre } from "@/modules/genres/types/genre";
import { Platform } from "@/modules/platforms/types/platform";
import { Review } from "@/modules/reviews/types/review";
import { Actor } from "@/modules/actors/types/actor";

export interface Movie {
  id: string;
  title: string;
  poster: string;
  duration: number;
  country: string;
  releaseDate: string;
  popularity: number;
  director: Director;
  genre: Genre;
  actors: Actor[];
  platforms: Platform[];
  reviews: Review[];
}