CREATE DATABASE IF NOT EXISTS cine_db;

USE cine_db;

CREATE TABLE IF NOT EXISTS Directores (
    IDDirector INT AUTO_INCREMENT PRIMARY KEY,
    Director VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS Categorias (
    IDCategoria INT AUTO_INCREMENT PRIMARY KEY,
    Categoria VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Peliculas (
    IDPelicula INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(200) NOT NULL,
    IDDirector INT,
    Duracion INT,
    IDCategoria INT,
    Sinopsis TEXT,
    FOREIGN KEY (IDDirector) REFERENCES Directores(IDDirector) ON DELETE SET NULL,
    FOREIGN KEY (IDCategoria) REFERENCES Categorias(IDCategoria) ON DELETE SET NULL
);

INSERT INTO Directores (Director) VALUES
  ('Christopher Nolan'),
  ('Quentin Tarantino'),
  ('Guillermo del Toro'),
  ('Sofía Coppola'),
  ('Bong Joon-ho');

INSERT INTO Categorias (Categoria) VALUES
  ('Acción'),
  ('Ciencia Ficción'),
  ('Drama'),
  ('Terror'),
  ('Comedia'),
  ('Animación');

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
  
USE cine_db;

ALTER TABLE Peliculas ADD COLUMN Imagen VARCHAR(500);

SET SQL_SAFE_UPDATES = 0;

UPDATE Peliculas SET Imagen = 'https://files.soniccdn.com/imagehosting/e3/11256_640.jpg' WHERE Titulo = 'Origen';
UPDATE Peliculas SET Imagen = 'https://media.bolavip.com/wp-content/uploads/sites/16/2024/04/02131508/Interestelar-esta-en-Netflix-Revisa-que-plataforma-la-tiene-ok-1200x740.webp' WHERE Titulo = 'Interestelar';
UPDATE Peliculas SET Imagen = 'https://mir-s3-cdn-cf.behance.net/projects/404/ed68b888690055.Y3JvcCw3MDIsNTQ5LDI0NiwxMDE0.jpg' WHERE Titulo = 'Pulp Fiction';
UPDATE Peliculas SET Imagen = 'https://via.placeholder.com/500x750/1A1A1A/D81A21?text=Laberinto+del+Fauno' WHERE Titulo = 'El Laberinto del Fauno';
UPDATE Peliculas SET Imagen = 'https://img.rtve.es/imagenes/cartel-parasitos/1623840676875.jpg' WHERE Titulo = 'Parásitos';
UPDATE Peliculas SET Imagen = 'https://palomaynacho.com/wp-content/uploads/2025/09/la-novicia-rebelde.jpg' WHERE Titulo = 'La Novicia Rebelde';
UPDATE Peliculas SET Imagen = 'https://updateme.news/wp-content/uploads/2022/11/titanic-banner.jpg' WHERE Titulo = 'Titanic';
UPDATE Peliculas SET Imagen = 'https://m.media-amazon.com/images/M/MV5BOTM2NzQ3MDQtMWFhOC00MmZjLWJlOWItZThjNGFlZWI4NzliXkEyXkFqcGc@._V1_.jpg' WHERE Titulo = 'Shrek';
UPDATE Peliculas SET Imagen = 'https://cdn.cinepremiere.com.mx/uploads/2021/06/interestellar.jpeg' WHERE Titulo = 'Interestelar 2';
UPDATE Peliculas SET Imagen = 'https://cdn.milenio.com/uploads/media/2026/10/20/coco-streaming-puedes-disfrutar-pelicula.jpg' WHERE Titulo = 'Coco';

SET SQL_SAFE_UPDATES = 1;

ALTER TABLE Peliculas CHANGE COLUMN IDPelicula Identificador INT AUTO_INCREMENT;
ALTER TABLE Categorias CHANGE COLUMN IDCategoria Identificador INT AUTO_INCREMENT;
ALTER TABLE Directores CHANGE COLUMN Identificador IDDirector INT AUTO_INCREMENT;