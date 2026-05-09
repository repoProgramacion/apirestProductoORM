import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      orderBy: { id: 'desc' }
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Producto no encontrado.');
    }
    return product;
  }

  findByName(nombre: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        nombre: {
          contains: nombre
        }
      },
      orderBy: { id: 'desc' }
    });
  }

  async create(data: CreateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.create({ data });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    await this.findOne(id);

    try {
      return await this.prisma.product.update({
        where: { id },
        data
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.product.delete({ where: { id } });
  }

  private handlePrismaError(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException('Ya existe un producto con ese nombre.');
    }

    throw error;
  }
}
