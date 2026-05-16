# <img src="public/logo.svg" width="28"/> NextStep

> 🚧 **Projecto em desenvolvimento** — criado para praticar React, Tailwind CSS e Zustand.

**NextStep** é um gestor de tarefas moderno e minimalista, inspirado em ferramentas como Linear e Notion. Desenhado para profissionais que precisam de velocidade e uma interface limpa.

🔗 **Live Demo:** [https://next-step-ten-liard.vercel.app/](https://next-step-ten-liard.vercel.app/)

---

## ✨ Funcionalidades

- ✅ **Dashboard limpo** com visão geral das tarefas do dia
- 🔄 **Filtros dinâmicos** — All / Active / Completed
- 📊 **Today's Progress** — círculo de progresso animado em SVG
- ⚡ **Quick Stats** — métricas em tempo real (tarefas activas, completas, alta prioridade)
- 🗂️ **Vista Grid e Lista** — toggle entre modos de visualização
- 🏷️ **Tags, Prioridade e Energia** — organização avançada por tarefa
- ➕ **Modal de criação** — adicionar tarefas com título, descrição, data, tags e nível de energia
- 🎯 **Next Step Badge** — destaca automaticamente a tarefa mais prioritária
- 🎨 **Animações suaves** com Framer Motion

---

## 🛠️ Stack Tecnológico

| Tecnologia | Uso |
|---|---|
| [React 19](https://react.dev) | Framework principal |
| [Vite](https://vitejs.dev) | Bundler e dev server |
| [Tailwind CSS v4](https://tailwindcss.com) | Estilização |
| [Zustand](https://zustand-demo.pmnd.rs) | Estado global |
| [Framer Motion](https://www.framer.com/motion) | Animações |
| [Lucide React](https://lucide.dev) | Ícones |

---

## 📁 Estrutura do Projecto

```
src/
├── components/
│   ├── Header.jsx          # Header fixo com blur e filtros
│   ├── ProgressCard.jsx    # Círculo de progresso animado
│   ├── QuickStats.jsx      # Card de estatísticas
│   ├── TaskList.jsx        # Lista/Grid de tarefas
│   └── AddTaskModal.jsx    # Modal de criação de tarefas
├── store/
│   └── useTaskStore.js     # Store global com Zustand
├── App.jsx
└── index.css
```

---

## 🚀 Correr Localmente

```bash
# Clonar o repositório
git clone https://github.com/Hugo-CP24/NextStep.git

# Entrar na pasta
cd NextStep

# Instalar dependências
npm install

# Arrancar o servidor
npm run dev
```

Abre [https://next-step-ten-liard.vercel.app/) no browser.

---

## 🎯 Roadmap

- [ ] Apagar tarefas
- [ ] Editar tarefas
- [ ] Persistência com LocalStorage
- [ ] Modo escuro
- [ ] Modo Pomodoro integrado
- [ ] Input inteligente com linguagem natural

---

## 👨‍💻 Autor

Feito por **</Hugo JC>** — projecto de prática para aprender React e ecosistema moderno de frontend.

[![GitHub](https://img.shields.io/badge/GitHub-Hugo--CP24-181717?style=flat&logo=github)](https://github.com/Hugo-CP24)
