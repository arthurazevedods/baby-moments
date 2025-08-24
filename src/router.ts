// src/router.ts
import { Router } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

// Crie uma instância do roteador
export const router = new Router({ routeTree });

// Registre o roteador para a tipagem
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}