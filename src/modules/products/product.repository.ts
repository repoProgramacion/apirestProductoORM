import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../../db/pool.js';
import type { CreateProductInput, UpdateProductInput } from './product.schemas.js';

export type ProductRow = RowDataPacket & {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  estado: 'activo' | 'inactivo';
  fotoUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

const baseSelect = `
  SELECT
    id,
    nombre,
    descripcion,
    cantidad,
    estado,
    foto_url AS fotoUrl,
    created_at AS createdAt,
    updated_at AS updatedAt
  FROM productos
`;

export const productRepository = {
  async findAll(): Promise<ProductRow[]> {
    const [rows] = await pool.query<ProductRow[]>(`${baseSelect} ORDER BY id DESC`);
    return rows;
  },

  async findById(id: number): Promise<ProductRow | null> {
    const [rows] = await pool.execute<ProductRow[]>(`${baseSelect} WHERE id = ? LIMIT 1`, [id]);
    return rows[0] ?? null;
  },

  async findByName(nombre: string): Promise<ProductRow[]> {
    const [rows] = await pool.execute<ProductRow[]>(
      `${baseSelect} WHERE nombre LIKE ? ORDER BY id DESC`,
      [`%${nombre}%`]
    );
    return rows;
  },

  async create(data: CreateProductInput): Promise<ProductRow> {
    const [result] = await pool.execute<ResultSetHeader>(
      `
        INSERT INTO productos (nombre, descripcion, cantidad, estado, foto_url)
        VALUES (?, ?, ?, ?, ?)
      `,
      [data.nombre, data.descripcion, data.cantidad, data.estado, data.fotoUrl]
    );

    const created = await this.findById(result.insertId);
    if (!created) {
      throw new Error('No fue posible recuperar el producto creado.');
    }
    return created;
  },

  async update(id: number, data: UpdateProductInput): Promise<ProductRow | null> {
    const fields: string[] = [];
    const values: Array<string | number> = [];

    if (data.nombre !== undefined) {
      fields.push('nombre = ?');
      values.push(data.nombre);
    }
    if (data.descripcion !== undefined) {
      fields.push('descripcion = ?');
      values.push(data.descripcion);
    }
    if (data.cantidad !== undefined) {
      fields.push('cantidad = ?');
      values.push(data.cantidad);
    }
    if (data.estado !== undefined) {
      fields.push('estado = ?');
      values.push(data.estado);
    }
    if (data.fotoUrl !== undefined) {
      fields.push('foto_url = ?');
      values.push(data.fotoUrl);
    }

    values.push(id);

    const [result] = await pool.execute<ResultSetHeader>(
      `
        UPDATE productos
        SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `,
      values
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return this.findById(id);
  },

  async remove(id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>('DELETE FROM productos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};
