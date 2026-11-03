export interface Director {
  idDirector: number;
  director: string;
  peliculas?: Pelicula[];
}

export interface Categoria {
  identificador: number;
  categoria: string;
  peliculas?: Pelicula[];
}

export interface Pelicula {
  identificador: number;
  titulo: string;
  idDirector: number;
  director: Director;
  duracion: number;
  idCategoria: number;
  categoria: Categoria;
  sinopsis: string | null;
}
