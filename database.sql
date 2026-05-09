CREATE DATABASE IF NOT EXISTS productos_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE productos_db;

CREATE TABLE IF NOT EXISTS productos (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(120) NOT NULL,
  descripcion VARCHAR(500) NOT NULL,
  cantidad INT UNSIGNED NOT NULL DEFAULT 0,
  estado ENUM('activo', 'inactivo') NOT NULL DEFAULT 'activo',
  foto_url VARCHAR(2048) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_productos_nombre (nombre)
);

INSERT INTO productos (nombre, descripcion, cantidad, estado, foto_url)
VALUES
  (
    'Mouse Logitech G203',
    'Mouse gamer con iluminacion RGB.',
    15,
    'activo',
    'https://example.com/images/mouse-logitech-g203.jpg'
  ),
  (
    'Teclado Redragon Kumara',
    'Teclado mecanico compacto.',
    8,
    'activo',
    'https://example.com/images/teclado-redragon-kumara.jpg'
  );
