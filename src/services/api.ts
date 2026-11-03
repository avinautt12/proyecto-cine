import { Categoria, Director, Pelicula } from '@/types/cine';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const texto = await res.text().catch(() => '');
    throw new Error(texto || `Error ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const cineApi = {
  getPeliculas: () => request<Pelicula[]>('/peliculas'),
  getPelicula: (id: number | string) => request<Pelicula>(`/peliculas/${id}`),
  getDirectores: () => request<Director[]>('/directores'),
  getCategorias: () => request<Categoria[]>('/categorias'),

  createPelicula: (body: Partial<Pelicula>) =>
    request<Pelicula>('/peliculas', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  updatePelicula: (id: number, body: Partial<Pelicula>) =>
    request<Pelicula>(`/peliculas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  deletePelicula: (id: number) =>
    request<void>(`/peliculas/${id}`, { method: 'DELETE' }),

  createDirector: (body: { director: string }) =>
    request<Director>('/directores', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  createCategoria: (body: { categoria: string }) =>
    request<Categoria>('/categorias', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
