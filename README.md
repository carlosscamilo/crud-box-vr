# 🕶️ CRUD Box VR

Aplicação de **CRUD em Realidade Virtual** desenvolvida com **A-Frame.js** e **JSON Server**, como parte de uma atividade acadêmica sobre RV/RA com JavaScript.

## 📽️ Demonstração

A cena 3D exibe cubos coloridos em um ambiente virtual. Cada cubo representa um registro do CRUD e pode ser criado, visualizado, editado e removido diretamente na cena.

## 🚀 Funcionalidades

| Ação | Verbo HTTP | Descrição |
|------|-----------|-----------|
| ➕ Criar | `POST` | Adiciona um novo cubo com cor aleatória |
| 👁️ Listar | `GET` | Carrega e exibe todos os cubos ao iniciar |
| ✏️ Atualizar | `PUT` | Seleciona um cubo e altera sua cor |
| 🗑️ Deletar | `DELETE` | Remove um cubo ou todos de uma vez |

## 🛠️ Tecnologias

- [A-Frame.js](https://aframe.io/) — Realidade Virtual no browser
- [JSON Server](https://github.com/typicode/json-server) — API REST simulada
- HTML, CSS e JavaScript puro

## ▶️ Como rodar

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/carlosscamilo/crud-box-vr.git
   cd crud-box-vr
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o JSON Server:
   ```bash
   npm run server
   ```

4. Abra o `index.html` no navegador (via **Live Server** ou similar).

> ⚠️ O JSON Server precisa estar rodando na porta `3000` antes de abrir o projeto.

## 🎮 Como usar

1. **Clique no botão `+`** para adicionar um cubo com cor aleatória
2. **Clique em um cubo** para selecioná-lo (fica destacado em amarelo)
3. **Clique no botão ✏️ (laranja)** para editar a cor do cubo selecionado
4. **Clique no botão `-`** para remover o último cubo
5. **Clique no botão `X`** para remover todos os cubos

## 📁 Estrutura do Projeto

```
crud-box-vr/
├── index.html      # Cena A-Frame e interface
├── app.js          # Lógica do CRUD com fetch
├── db.json         # Banco de dados do JSON Server
├── package.json    # Dependências do projeto
└── .gitignore
```
