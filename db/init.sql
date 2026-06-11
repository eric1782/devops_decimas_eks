CREATE DATABASE IF NOT EXISTS decimas_db;
USE decimas_db;

CREATE TABLE IF NOT EXISTS decimas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO decimas (titulo, autor, contenido) VALUES
('A la vida', 'Pablo Neruda', 'Puedo escribir los versos más tristes esta noche.\nEscribo, por ejemplo: la noche está estrellada,\ny tiritan, azules, los astros, a lo lejos.\nEl viento de la noche gira en el cielo y canta.\nPuedo escribir los versos más tristes esta noche.\nYo la quise, y a veces ella también me quería.\nEn las noches como ésta la tuve entre mis brazos.\nLa besé tantas veces bajo el cielo infinito.\nElla me quiso, a veces yo también la quería.\nCómo no haber amado sus grandes ojos fijos.'),
('La libertad', 'Anónimo', 'Libre soy como el viento que recorre la mar,\ncomo el águila altiva que surca el cielo azul,\ncomo el río que corre sin rumbo al caminar,\ncomo el fuego que brilla con su luz carmesí y tu.\nLibre soy en mis sueños cuando llega el despertar,\ncuando el alba me llama con su manto de arrebol,\ncuando el día me abre su puerta singular,\ncuando brilla en el cielo el glorioso sol.\nLibre soy como el hombre que forjó su destino,\ncomo el pueblo que un día encontró su camino.');
