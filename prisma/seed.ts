import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.upsert({
    where: { nombre: 'Mouse Logitech G203' },
    update: {},
    create: {
      nombre: 'Mouse Logitech G203',
      descripcion: 'Mouse gamer con iluminacion RGB.',
      cantidad: 15,
      estado: 'activo',
      fotoUrl: 'https://example.com/images/mouse-logitech-g203.jpg'
    }
  });

  await prisma.product.upsert({
    where: { nombre: 'Teclado Redragon Kumara' },
    update: {},
    create: {
      nombre: 'Teclado Redragon Kumara',
      descripcion: 'Teclado mecanico compacto.',
      cantidad: 8,
      estado: 'activo',
      fotoUrl: 'https://example.com/images/teclado-redragon-kumara.jpg'
    }
  });
}

main()
  .catch((error) => {
    process.stderr.write(`${String(error)}\n`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
