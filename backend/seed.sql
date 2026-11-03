-- Datos de prueba para cine_db
-- Ejecutar DESPUÉS de crear las tablas Directores, Categorias y Peliculas

USE cine_db;

-- Directores
INSERT INTO Directores (Director) VALUES
  ('Christopher Nolan'),
  ('Quentin Tarantino'),
  ('Guillermo del Toro'),
  ('Sofía Coppola'),
  ('Bong Joon-ho');

-- Categorías
INSERT INTO Categorias (Categoria) VALUES
  ('Acción'),
  ('Ciencia Ficción'),
  ('Drama'),
  ('Terror'),
  ('Comedia'),
  ('Animación');

-- Películas (Duración en minutos)
INSERT INTO Peliculas (Titulo, IDDirector, Duracion, IDCategoria, Sinopsis) VALUES
  ('Origen', 1, 148, 2, 'Un ladrón que entra en los sueños de otros para robar secretos.'),
  ('Interestelar', 1, 169, 2, 'Un grupo de exploradores viaja a través de un agujero de gusano.'),
  ('Pulp Fiction', 2, 154, 6, 'Historias entrelazadas del crimen en Los Ángeles.'),
  ('El Laberinto del Fauno', 3, 118, 3, 'Una niña descubre un laberinto mágico tras la guerra civil.'),
  ('Parásitos', 5, 132, 3, 'Una familia pobre se infiltra en la vida de una familia rica.'),
  ('La Novicia Rebelde', 4, 174, 6, 'Una joven se convierte en institutriz de siete niños.'),
  ('Titanic', 3, 195, 3, 'Una historia de amor a bordo del transatlántico.'),
  ('Shrek', 5, 90, 5, 'Un ogro emprende una misión para rescatar a una princesa.'),
  ('Interestelar 2', 1, 180, 2, 'Secuela ficticia para pruebas de la aplicación.'),
  ('Coco', 3, 105, 7, 'Un niño viaja a la tierra de los muertos.');
