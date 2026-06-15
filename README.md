# Portfólio — Vinicius Samarone

Site de portfólio para videomaker e editor. Feito com HTML, CSS e JavaScript puros, sem framework, com duas bibliotecas de animação carregadas via CDN.

## Estrutura dos arquivos

```
vinicius-portfolio/
├── index.html          # estrutura/conteúdo da página
├── css/
│   └── style.css       # toda a aparência (cores, fontes, layout, responsivo)
├── js/
│   └── main.js         # interações (scroll, vídeos no hover, cursor, timeline)
├── img/
│   ├── vinicius.jpg            # foto do Sobre
│   ├── logo-vs.svg            # monograma VS
│   ├── logos/                 # logos das marcas (fundo transparente)
│   ├── videos/                # vídeos do portfólio (já otimizados pra web)
│   └── videos-thumb/          # imagem de capa de cada vídeo
└── README.md
```

## Como abrir

Abra o `index.html` no navegador. Para desenvolvimento, o ideal é usar a extensão **Live Server** do VS Code (botão direito no `index.html` → "Open with Live Server"), porque alguns recursos funcionam melhor servidos por um servidor local.

## Conceito do design

A página inteira é montada como a **linha do tempo de um editor de vídeo**. Conforme você rola, um cabeçote (playhead) desce por uma barra na lateral esquerda, e cada seção é tratada como um "clipe" com seu timecode (00:38, 01:24...). A ideia é que a navegação remeta ao mundo da edição — que é o trabalho do Vinicius.

### Cores
- Preto `#0a0a0a` (fundo)
- Off-white `#f5f5f0` (texto)
- Azul `#0066FF` (destaque)

### Fontes (Google Fonts)
- **Sora** — títulos
- **Inter** — textos
- **JetBrains Mono** — timecodes e rótulos técnicos

## Bibliotecas usadas

Carregadas por CDN no final do `index.html`:

- **GSAP + ScrollTrigger** — animações ligadas ao scroll (contador de números, reveals, playhead).
- **Lenis** — rolagem suave (smooth scroll).

Não precisa instalar nada: o navegador baixa essas bibliotecas direto dos links.

## Coisas que dá pra editar fácil

- **Trocar um vídeo**: substitua o arquivo dentro de `img/videos/` mantendo o mesmo nome, ou edite o `src` do `<video>` no `index.html`.
- **Trocar o vídeo do topo (hero)**: no `index.html`, procure por `id="heroVideo"` e mude o `src`.
- **Mudar textos**: tudo está no `index.html`, em português, fácil de achar.
- **Mudar a cor de destaque**: no `css/style.css`, mude a variável `--azul` lá no topo (`:root`).
- **WhatsApp**: o número está nos links `wa.me/5584991382665` no `index.html`.

## Pendências (para a versão final)

- Substituir os vídeos otimizados por embeds do **Vimeo** quando o Vinicius subir lá (recomendado para não pesar a hospedagem).
- Trocar o vídeo do hero pelo **showreel oficial** quando estiver pronto.
- Substituir os depoimentos de exemplo por depoimentos reais de clientes.
