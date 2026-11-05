import 'server-only';
import { PrismaClient } from '@prisma/client';

/**
 * Single PrismaClient instance. In development, Next.js hot reload would
 * otherwise create a new client (and connection pool) on every change.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
