# ✅ Central de Aprovações

Projeto web criado com **Nuxt 3**, usando **Pinia**, **Tailwind CSS** e **Nuxt UI**, com uma interface para listar, selecionar e aprovar múltiplos itens pendentes.

---

## 🚀 Tecnologias Usadas

- [Nuxt 3](https://nuxt.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Nuxt UI (@nuxt/ui)](https://ui.nuxt.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📦 Como Rodar Localmente

### 1. Clonar o repositório
Abre o projecto em um terminal, ou editor de texto e abra o terminal( VSCode) 
```bash
git clone https://github.com/seu-usuario/approval-center.git
cd approval-center

Instalar as dependências
npm install
# ou
yarn install

Rodar o projeto
npm run dev
Acesse em: http://localhost:3000

🧠 Decisões Técnicas
1. Store com Pinia
Gerencia os itens e seleção com métodos:

fetchItems

toggleSelectItem

approveItem

approveSelected

✅ Permite migrar para API real sem alterar a interface.

2. Uso de Nuxt UI + UnoCSS
Utiliza componentes como <UTable>, <UButton>, <UBadge>.

✅ Tokens de design (color="primary", etc) evitam acoplamento a Tailwind fixo.

