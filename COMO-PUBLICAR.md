# 🏙 PORTO ESPERANÇA — TRONOS (PWA)

Este é o pacote do jogo pronto para virar um **app instalável no celular** (Android/iOS), funcionando offline e com suporte a **fotos reais** de bens e personagens.

---

## 📂 O que tem aqui

```
tronos/
├── index.html             ← o jogo (abra aqui)
├── manifest.json          ← identidade do app (nome, ícone, cor)
├── service-worker.js      ← faz o jogo funcionar offline
├── LISTA-DE-FOTOS.md      ← nomes EXATOS de cada foto a inserir
├── assets/
│   ├── game.js            ← código do jogo compilado
│   ├── icons/             ← ícones do app (já prontos)
│   ├── bens/              ← 📸 SUAS FOTOS DE BENS vão aqui
│   └── personagens/       ← 📸 SUAS FOTOS DE PERSONAGENS vão aqui
```

---

## 📸 Como inserir as fotos

1. Abra **`LISTA-DE-FOTOS.md`** — ele lista o nome exato de cada arquivo.
2. Salve cada foto em **JPG** com esse nome exato, na pasta certa:
   - Bens → `assets/bens/` (ex.: `car_eclipse.jpg`, `man_palacio.jpg`)
   - Personagens → `assets/personagens/` (ex.: `neguinho.jpg`, `ferraz.jpg`)
3. **Tamanho sugerido:** 400×400 px (quadrado), até ~80 KB cada (para o app ficar leve).

> ✅ **Não precisa inserir todas de uma vez.** Onde faltar foto, o jogo usa automaticamente o ícone desenhado — nada quebra. Vá adicionando aos poucos.

---

## 🚀 Como publicar na Vercel (grátis, ~5 min)

A Vercel hospeda o app de graça e te dá um link tipo `https://tronos.vercel.app`.

### Opção A — Sem instalar nada (arrastar e soltar)

1. Crie uma conta grátis em **https://vercel.com** (pode entrar com Google/GitHub).
2. No painel, clique em **Add New… → Project**.
3. Procure a opção de **deploy manual / "Deploy"** e **arraste a pasta `tronos` inteira** para a área de upload.
   - (Se a Vercel pedir um repositório, use a Opção B abaixo.)
4. Aguarde ~1 minuto. Pronto: ela te dá o **link público**.

### Opção B — Pelo GitHub (recomendado para atualizar fácil)

1. Crie um repositório novo no **https://github.com** (ex.: `tronos`).
2. Suba os arquivos desta pasta para o repositório (botão **Add file → Upload files**, arraste tudo).
3. Na Vercel: **Add New… → Project → Import** e escolha esse repositório.
4. Em **Framework Preset**, deixe **"Other"** (é um site estático puro).
5. Clique em **Deploy**. Pronto — e toda vez que você atualizar o GitHub, a Vercel republica sozinha.

### Configuração importante (vale para as duas opções)
- **Root Directory / pasta raiz:** a pasta que contém o `index.html`.
- **Build Command:** deixe **vazio** (não há build — já está compilado).
- **Output Directory:** deixe o padrão (a raiz).

---

## 📲 Como instalar no celular (depois de publicar)

1. Abra o link da Vercel no navegador do celular.
2. **Android (Chrome):** menu ⋮ → **"Adicionar à tela inicial"** / "Instalar app".
3. **iPhone (Safari):** botão **Compartilhar** → **"Adicionar à Tela de Início"**.
4. O ícone da coroa aparece como um app de verdade — abre em tela cheia e funciona offline.

---

## 🔄 Como atualizar o jogo depois

- **Trocou fotos?** Só substitua os arquivos em `assets/bens` ou `assets/personagens` e republique. (O app busca imagens "network-first", então fotos novas aparecem.)
- **Mudou o código?** Quando eu te entregar um `game.js` novo, troque o arquivo em `assets/`, **incremente a versão** no `service-worker.js` (mude `tronos-v12` para `tronos-v13`) e republique — isso força os celulares a baixarem a versão nova.

---

## ❓ Problemas comuns

- **"Tela branca":** confirme que `assets/game.js` foi enviado e que o link abre o `index.html`.
- **Fotos não aparecem:** confira se o nome do arquivo bate EXATAMENTE com a `LISTA-DE-FOTOS.md` (maiúsculas/minúsculas contam) e se está em `.jpg`.
- **Não oferece instalar:** o site precisa estar em **https** (a Vercel já dá https automático) e ter sido aberto uma vez.

---

*Porto Esperança / TRONOS — versão v12. Bom jogo, chefe.* 👑
