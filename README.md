# 🕶️ CRUD Box VR

Aplicação de **CRUD em Realidade Virtual** desenvolvida com **A-Frame.js** e **JSON Server**, como parte de uma atividade acadêmica sobre RV/RA com JavaScript.

A cena 3D exibe cubos coloridos em um ambiente virtual com céu, chão gramado e árvores. Cada cubo representa um registro do CRUD e pode ser criado, listado, editado e removido diretamente na cena — por **clique** no desktop ou por **gaze (olhar fixo)** em dispositivos VR/mobile.

## 🚀 Funcionalidades

| Ação | Verbo HTTP | Botão | Descrição |
|------|-----------|-------|-----------|
| ➕ Criar | `POST` | Azul `+` | Adiciona um novo cubo com cor aleatória |
| 👁️ Listar | `GET` | — | Carrega e exibe todos os cubos ao iniciar |
| ✏️ Atualizar | `PUT` | Laranja `✏️` | Troca a cor do cubo selecionado aleatoriamente |
| 🗑️ Deletar último | `DELETE` | Vermelho `-` | Remove o último cubo adicionado |
| 🗑️ Deletar todos | `DELETE` | Cinza `X` | Remove todos os cubos da cena |

## 👁️ Interação por Gaze (VR)

O projeto suporta **gaze interaction**: ao olhar fixamente para qualquer botão ou cubo por **2 segundos**, a ação é disparada automaticamente — sem necessidade de tocar na tela ou usar controles.

- O cursor encolhe progressivamente durante a contagem
- Um indicador **"👁️ Olhando..."** aparece na tela enquanto o gaze está ativo
- Desviar o olhar cancela a ação

## 🔵 Seleção de Cubos

Ao clicar/olhar para um cubo, ele é **selecionado** e um contorno wireframe branco transparente aparece ao redor dele. Após a atualização da cor, o cubo é deselecionado automaticamente.

## 🛠️ Tecnologias

- [A-Frame.js](https://aframe.io/) — Realidade Virtual no browser
- [JSON Server](https://github.com/typicode/json-server) — API REST simulada localmente
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

4. Acesse `http://localhost:3000` no navegador.

> ⚠️ O JSON Server serve os arquivos estáticos da pasta `public/` automaticamente na porta `3000`. Não é necessário um servidor separado para o frontend.

## 📱 Testar no Celular (VR)

Para testar em dispositivos móveis com suporte a giroscópio:

1. Com o JSON Server rodando, abra um túnel HTTPS com [Pinggy](https://pinggy.io/):
   ```bash
   ssh -p 443 -R0:localhost:3000 a.pinggy.io
   ```
2. Acesse a URL `https://...a.free.pinggy.link` gerada no celular
3. Use o modo **VR** do A-Frame para experiência imersiva com gaze

> O HTTPS é exigido pelos browsers mobile para acesso ao giroscópio.

## 📁 Estrutura do Projeto

```
crud-box-vr/
├── public/
│   ├── index.html  # Cena A-Frame servida pelo JSON Server
│   └── app.js      # Lógica do CRUD com fetch (URL relativa)
├── index.html      # Versão para desenvolvimento local
├── app.js          # Versão para desenvolvimento local
├── db.json         # Banco de dados do JSON Server
├── package.json    # Dependências do projeto
└── .gitignore
```
