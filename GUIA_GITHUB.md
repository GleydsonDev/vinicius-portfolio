# 📘 Guia Passo a Passo: Subir Projeto no GitHub

## Pré-requisito
- Git instalado no seu PC ([baixar aqui](https://git-scm.com/))
- Conta no GitHub ([criar em github.com](https://github.com))

---

## 🔧 PASSO 1: Configurar Git (primeira vez)

No terminal, configure seu nome e email (usados em todos os commits):

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@gmail.com"
```

**Exemplo:**
```bash
git config --global user.name "Vinicius Samarone"
git config --global user.email "vinicius@email.com"
```

---

## 📂 PASSO 2: Inicializar Repositório Local

Abra o terminal na pasta do projeto (já em `c:\Users\3AM-IT\Desktop\vinicius-portfolio`):

```bash
git init
```

**O que faz:** Cria a pasta `.git` (oculta) que controla as versões do seu projeto.

---

## ➕ PASSO 3: Adicionar Arquivos

Adicione **todos** os arquivos ao staging:

```bash
git add .
```

**O que faz:** Prepara todos os arquivos (html, css, js, img) para o commit.

---

## 💾 PASSO 4: Fazer Primeiro Commit

Crie um "snapshot" do seu projeto com uma mensagem:

```bash
git commit -m "Inicial: portfólio Vinicius Samarone - videomaker"
```

**O que faz:** Salva uma versão do projeto com uma descrição.

---

## 🌐 PASSO 5: Criar Repositório no GitHub

1. Vá em **[github.com/new](https://github.com/new)**
2. Preencha assim:
   - **Repository name:** `vinicius-portfolio` (ou outro nome)
   - **Description:** "Portfólio profissional - Videomaker & Editor"
   - **Visibility:** Escolha `Public` (visível) ou `Private` (privado)
3. Clique em **"Create repository"**

---

## 🔗 PASSO 6: Conectar Repositório Local ao GitHub

Após criar no GitHub, você vai receber um comando pronto. Cole ele aqui:

```bash
git remote add origin https://github.com/SEU_USUARIO/vinicius-portfolio.git
```

**Troque:**
- `SEU_USUARIO` por seu username do GitHub

**O que faz:** Liga o repositório local ao repositório remoto (no GitHub).

---

## ⬆️ PASSO 7: Fazer Push (Subir para GitHub)

Envie os arquivos para o GitHub:

```bash
git branch -M main
git push -u origin main
```

**O que faz:**
- Renomeia a branch padrão para `main` (padrão moderno)
- Envia todos os commits para o GitHub

---

## ✅ Pronto!

Seu projeto está no GitHub! Você pode:
- Ver em `https://github.com/SEU_USUARIO/vinicius-portfolio`
- Compartilhar o link com clientes/colegas
- Clonar em outro PC: `git clone https://github.com/SEU_USUARIO/vinicius-portfolio.git`

---

## 📝 Próximas Vezes (após mudanças)

Toda vez que fizer alterações:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

**Exemplo:**
```bash
git add .
git commit -m "Fix: áudio dos vídeos da galeria + cursor melhorado"
git push
```

---

## 🆘 Dúvidas Comuns

**P: Posso colocar senha no terminal?**  
R: Use um [Personal Access Token](https://github.com/settings/tokens) em vez de senha.

**P: E se eu errar o comando?**  
R: Digite `git status` para ver o estado atual. Se não fez push ainda, pode corrigir.

**P: Como vejo o histórico de commits?**  
R: Digite `git log` para ver todos os commits salvos.

---

## 📚 Atalhos Úteis

| Comando | O que faz |
|---------|----------|
| `git status` | Mostra arquivos modificados |
| `git log` | Mostra histórico de commits |
| `git diff` | Mostra mudanças nos arquivos |
| `git pull` | Baixa mudanças do GitHub |

---

**Bora subir esse portfólio! 🚀**
