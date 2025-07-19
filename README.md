# Baby Moments

Este é um MVP de uma aplicação para registrar e acompanhar os momentos do seu bebê.

## Funcionalidades

- **Registro de Atividades:** Mamada, sono, troca de fralda, medicamento e outros.
- **Dashboard:** Estatísticas do dia, como quantidade de mamadas, tempo de sono, trocas e última mamada.
- **Timeline do Dia:** Visualização cronológica das atividades registradas.
- **Ações Rápidas:** Botões para adicionar atividades comuns com apenas um clique.
- **Tema Dinâmico:** Alternância entre temas `cupcake` e `bumblebee` (DaisyUI).
- **Modal de Atividade:** Formulário intuitivo para adicionar novas atividades.
- **Visualização de Cores:** Página para visualizar as cores dos temas.

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Router](https://tanstack.com/router)
- [Zustand](https://zustand-demo.pmnd.rs/) (gerenciamento de estado)
- [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) (UI e temas)
- [date-fns](https://date-fns.org/) (manipulação de datas)
- [Lucide Icons](https://lucide.dev/) (ícones)

## Como Utilizar

1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Inicie o projeto:**
   ```bash
   npm run dev
   ```
3. **Acesse no navegador:**
   ```
   http://localhost:5173
   ```

## Estrutura do Projeto

```
src/
  components/      # Componentes reutilizáveis
  routes/          # Rotas da aplicação
  store/           # Gerenciamento de estado (Zustand)
  assets/          # Imagens e SVGs
  index.css        # Estilos globais
  main.tsx         # Ponto de entrada
```

## Como funciona

- Clique em **Nova Atividade** para registrar um novo momento.
- Use o **switch de tema** para alternar entre os temas visuais.
- Veja as estatísticas e timeline do dia na tela principal.
- Acesse a página **Colors** para visualizar as cores dos temas.

## Contribuição

Sinta-se à vontade para abrir issues ou PRs para melhorias e correções. Sua ajuda é bem-vinda!
