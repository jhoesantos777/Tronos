# 👑 TRONOS — Documentação Completa (Game Design Document)

> **O Poder Nunca Fica Vazio**
> Estratégia territorial e RPG narrativo numa favela-cidade brasileira, **Porto Esperança**.
> Suba do beco ao trono — ou da farda ao comando.

Versão do documento: gerado a partir do código-fonte `v104-carreira-final`.
Existe também uma versão visual navegável (dossiê) publicada como Artifact.

---

## Índice

1. [Conceito](#1-conceito)
2. [Como se joga](#2-como-se-joga)
3. [O mundo: Porto Esperança](#3-o-mundo-porto-esperança)
4. [Modo Facção](#4-modo-facção)
5. [Modo Polícia](#5-modo-polícia)
6. [Economia](#6-economia)
7. [Combate & Teatro de Batalha](#7-combate--teatro-de-batalha)
8. [Arsenal](#8-arsenal)
9. [Personagens](#9-personagens)
10. [Campanha: "Porto Esperança Confidencial"](#10-campanha-porto-esperança-confidencial)
11. [Progressão & Finais](#11-progressão--finais)
12. [Identidade visual & UX](#12-identidade-visual--ux)
13. [Arquitetura técnica](#13-arquitetura-técnica)
14. [Roadmap](#14-roadmap)

---

## 1. Conceito

TRONOS é um jogo de **poder**. A cidade fictícia de **Porto Esperança** é um tabuleiro de 40 territórios onde três facções criminosas e o Estado disputam cada esquina. O jogador escolhe de que lado da lei quer subir — e descobre que os dois lados jogam o mesmo jogo sujo, só com uniformes diferentes.

**Os três pilares:**

- **⚖ Dualidade lei × crime** — dois grandes modos espelhados (facção / polícia). As mesmas mecânicas de território, dinheiro e influência, vistas dos dois lados da mira.
- **♛ O poder nunca fica vazio** — todo trono derrubado é imediatamente disputado. Prender um chefe abre um vácuo que outro preenche.
- **↗ Do beco ao trono** — você começa como ninguém (Menino de Recados ou soldado raso) e sobe por mérito, decisões e sangue-frio até comandar a cidade.

**Plataforma:** PWA mobile-first, instalável (Android/iOS), offline, em português brasileiro.

**Números-chave:** 40 zonas · 4 modos de jogo · 5 atos de campanha · 25 missões roteirizadas.

---

## 2. Como se joga

A experiência se organiza em **dois eixos independentes**:

**Eixo A — Lado**
- **⛨ Polícia** (Ordem · Lei · Justiça) — pacifique a cidade retomando territórios e desmontando o crime.
- **✦ Facção** (Respeito · Lealdade · Família) — domine o tabuleiro, lave o dinheiro, proteja o trono.

**Eixo B — Sub-modo**
- **🗺 Modo Livre** — começa direto no mapa estratégico com o comando total. Estratégia pura.
- **🎖 Modo Carreira** — RPG de ascensão semana a semana, de baixo para cima. Transborda para o mapa ao chegar ao topo.

**O loop da semana:** a unidade de tempo é a **semana**. O jogador planeja ações (montar tropa e atacar, aceitar um serviço, investir, negociar) e toca **ENCERRAR SEMANA ▸** — quando salários, rendas, eventos e a IA das facções são processados.

**Fluxo de entrada (Carreira):** `escolher lado → [escolher família] → nome de guerra → começar de baixo`. O Modo Livre pula direto para o mapa (facção nova passa antes por `fundar facção`: nome + cor de comando).

---

## 3. O mundo: Porto Esperança

Cidade-estado fictícia brasileira, mapa real de **40 zonas** conectadas por adjacência — você só ataca o que faz fronteira com o seu território.

- **6 regiões:** Norte, Oeste, Central, Leste, Sul e Portuária (cada uma com cor própria).
- **Classes S / A / B / C / D:** a riqueza da zona define quanto rende e produz. S e A são o topo.
- **👑 Capital — Cidade Alta:** zona classe S no Leste (Mercado Financeiro). Quem a domina ganha **+25% em toda a renda semanal**.
- **11 recursos estratégicos:** ⛏ Mineração · 🛡 Base Militar · 🌾 Agropecuária · 🏖 Turismo · 🏛 Mercado Financeiro · 🏭 Indústria · ⚓ Construção Naval · 🚢 Porto Comercial · 💻 Tecnologia · 📦 Logística · 📋 Administrativo.

**O mapa jogável:** SVG sobre arte real, com zoom e arrasto (1×–8×). Em tela cheia num celular na vertical, o mapa **gira 90°** para ocupar toda a tela ("vire o celular de lado"), recalculando o arrasto para o eixo girado.

---

## 4. Modo Facção

Você joga como o crime organizado, do **Menino de Recados** ao domínio das 40 zonas. Duas fases: a **carreira tutelada** (criado por uma facção-mãe) e o **modo livre** (chefe da própria organização).

### As três famílias

| Facção | Cor | Chefe | Personalidade |
|---|---|---|---|
| 🐍 **Comando Serpente** | Vermelho | Aurélio "Naja" Bastos | Expansionista — toma na porrada, mantém no medo. Postura: guerrilha. Odeia Os Corvos. |
| ⚜ **Falange D'Ouro** | Dourado | Dom Heitor Vasconcelos | Pragmática — busca zonas ricas e lucro, evita guerra. Postura: defensiva. Teme a Serpente. |
| 🐦 **Os Corvos** | Roxo | Jordan | Caótica — a mais agressiva, semeia caos. Postura: frontal. Odeia Falange e Serpente. |

### O Trono

O **trono** é a zona onde o Chefe fisicamente "mora". Pode ser **movido** (1×/semana) para uma zona segura, com seguranças, bunker e rota de fuga. Contra a polícia o trono nunca cai por força bruta — só há prisão com "procurado" alto, e ainda assim o Chefe pode escapar (até 65% com rota de fuga) ou ser preso por até 5 semanas (um advogado pode conseguir Habeas Corpus). Contra rival, perder o trono com o Chefe sem fuga é xeque-mate.

### Vingança & ódio

Rancor em quatro níveis: Desavença → Rixa Aberta → Guerra Pessoal → **Vendetta de Sangue**. Reconquistar a zona do rancoroso "executa" a vendetta e rende recompensa. Você pode **provocar** rivais (humilhar nas redes, roubar carga, atentar contra tenente) — o ódio deles sobe até a Aniquilação, quando miram o seu trono.

### Vitória / Derrota

- **Vitória:** dominar as 40 zonas → Modo Legado (infinito), política nacional, cenário internacional.
- **Derrota:** perder a última zona; trono tomado com o Chefe morto; ou trair a facção-mãe indevidamente.

---

## 5. Modo Polícia

Objetivo: **pacificar o estado** — manter a cidade estável por **12 semanas** retomando territórios e desmontando as facções. O dinheiro é **orçamento público**; as moedas morais são **reputação** e **corrupção**.

### As seis forças

| Força | Sigla | Custo | Poder | Especialidade |
|---|---|--:|--:|---|
| 👮 Guarda Civil | GCC | 12 | 10 | Básica, defensiva |
| 🏍 Ronda Ostensiva | ROCOM | 28 | 20 | Rápida, frontal |
| 🕵 Inteligência | INT | 50 | 15 | Revela o inimigo |
| 🛡 Patrulha Tática | TÁT | 74 | 40 | Assaltos, guerrilha |
| ⚔ Comando Especial | COEP | 185 | 80 | +30% conquista |
| 🦅 Agência Federal | AIF | 370 | 50 | Federal, inteligência pesada |

### Ferramentas de comando

- **🔍 Investigações & dossiês** — aloque forças numa zona por semanas; score alto dá até +60% de força na operação e revela a fraqueza tática do inimigo.
- **🚨 Ocorrências** — roubo a banco, carga, lavagem, tráfico surgem semanalmente; zonas desprotegidas atraem mais crime.
- **🏰 Bases & guarnição** — bases militares (proteção + bônus defensivo) e até 3 forças alocadas por zona.
- **🌍 Operações Nacionais** — Lava Gato, Torre de Vidro, Mar Aberto: exigem inteligência, apoio do governo e parceiros internacionais.
- **📰 Mídia & reputação** — manchetes moldam a imagem; reputação zerada = exoneração.
- **⚖ Corrupção** — dinheiro sujo vaza operações e atrai a Corregedoria.

---

## 6. Economia

Balanço processado no fim da semana. Régua interna: **1 unidade de caixa ≈ R$ 1.600**. Renda de território e produção de mercadoria são grandezas distintas — a mercadoria precisa ser vendida ou lavada.

### ▲ Entra (por semana)

- **Território** — renda fixa por tier (8 / 16 / 28). Capital dá +25% em tudo.
- **Movimento** — cada zona produz mercadoria (2 / 3 / 5), vendida a preço flutuante.
- **Lavagem** — 9 bocas de fachada convertem produto em dinheiro limpo e esfriam o procurado.
- **Saques** — banco, joalheria, comércio, carga: recompensa por risco, com chance de blitz.
- **Rotas & aliados** — exportação e parceiros internacionais (Cartel do Norte, 'Ndrangheta, Bratva) dão renda passiva.
- **Gerentes de vendas** — vendem a mercadoria das zonas que administram.
- **Mesada da mãe** — durante a tutela, o chefe banca seu crescimento.

### ▼ Sai (por semana)

- **Tropas** — manutenção por unidade (Soldado 1 · Atirador 2 · Muralha 2 · Elite 4). Caixa zerado = deserção.
- **Staff** — gerentes e advogados com custo fixo.
- **Subornos** — Vereador, Delegado, Prefeito, Deputado, Secretário: pagamento contínuo para reduzir o calor.
- **Espionagem** — olheiros e informantes.
- **Investimentos** — bocas, tropas, arsenal, bases e aliados (custos únicos).

### Bocas de lavagem (exemplos)

Loja de Conveniência (80 / lava 12) → Casa Noturna (180 / 35) → Plataforma de Bets (350 / 70) → Portcoins/Cripto (500 / 100).

---

## 7. Combate & Teatro de Batalha

A **força** de cada lado combina o ataque bruto das unidades com multiplicadores de equipamento, treinamento, doutrina, moral, casamento de postura (frontal × defensiva × guerrilha) e — para a polícia — o bônus do dossiê.

### Teatro de Batalha (3 setores)

Ao tomar uma zona abre-se um campo dividido em **Flanco Esquerdo · Centro · Flanco Direito**. O jogador posiciona as tropas por setor, escolhe a tática, e assiste à batalha resolver setor a setor (traçantes, explosões, baixas, banner).

**Perfil de deploy do defensor (esq / centro / dir):**

| Defensor | Esq. | Centro | Dir. | Perfil |
|---|--:|--:|--:|---|
| Serpente | 0.25 | 0.50 | 0.25 | concentra no centro |
| Falange | 0.35 | 0.35 | 0.30 | equilibrada |
| Corvos | 0.40 | 0.20 | 0.40 | flancos pesados |
| Polícia | 0.30 | 0.40 | 0.30 | centro protegido |

**Modificadores posicionais (teto ±15%):** Flanqueio (setor vazio = tomada automática + bônus adiante), Concentração (frontal com >50% num setor = +10%), Emboscada (bônus nos flancos). **Vence quem leva ≥2 dos 3 setores.** As posições inimigas só são reveladas com inteligência (dossiê / olheiros).

**Táticas:** ⚡ Ataque Frontal · 🌙 Emboscada · 🛡 Reforço Defensivo · 🏃 Recuo Estratégico.

---

## 8. Arsenal

Cinco slots, cada item com raridade (comum → lendária) e bônus. Só conta o melhor item equipado de cada slot.

### Ataque

| Item | Custo | Bônus |
|---|--:|--:|
| Pistola Compacta M1 | 15 | +3% |
| Pistola Imperium X4 (épica) | 260 | +18% |
| Fuzil Guardian R1 | 80 | +7% |
| Fuzil Nemesis R4 (lendária) | 650 | +30% |
| SMG Tempest M1 | 150 | +9% |
| SMG Leviatã M4 (lendária) | 950 | +32% |

### Defesa

| Item | Custo | Bônus |
|---|--:|--:|
| Colete CV1 | 20 | +5% |
| Colete Supremo CV4 (épica) | 380 | +26% |
| Viatura Patrulha VT-1 | 30 | +4% |
| Viatura Blindada VT-4 | 450 | +22% |

Complementos: granadas consumíveis (atordoante, tática, breach, kit demolição), pacotes táticos (Iniciante → Comandante), inventário v2.

### Unidades de tropa

| Unidade | Custo | Ataque | Papel |
|---|--:|--:|---|
| 🔫 Soldado | 5 | 1.0 | linha de frente |
| 🎯 Atirador | 12 | 2.0 | dano concentrado |
| 🧱 Muralha | 12 | 2.2 def | segura a zona |
| ⚡ Elite do Morro | 25 | 2.2 | ataque e defesa |

---

## 9. Personagens

### Os três chefes

- **Aurélio "Naja" Bastos** (Serpente) — Chefe, Zona Norte. Subiu matando na régua do norte; leal aos seus, implacável com traidores.
- **Dom Heitor Vasconcelos** (Falange) — Patriarca, Porto & Contrabando. Terno impecável, nunca tocou numa arma — ele lava dinheiro.
- **Jordan** (Corvos) — Comando, Zona Leste. Um fantasma sem rosto nem digital, calculista e paciente.

### Elenco da carreira

- **Ferraz** — parceiro de patrulha, íntegro e leal; o coração emocional da campanha (leva um tiro por você no Ato 2).
- **Vidal** — rival ambicioso e desonesto; revela-se a "toupeira" que vende segredos aos Corvos (Ato 5).
- **Sgt. Brito** — superior; aparece recebendo propina no primeiro grande dilema.
- **Salomão · Russo · Neguinho** — elenco-âncora da facção (chefe-patrão, gerente-mentor, rival interno), substituídos pelos nomes da facção-mãe escolhida.

### Elenco da campanha policial

- **Cap. Ivone Duarte** — comandante direta, a voz do quartel.
- **Dra. Marta Sales** — promotora íntegra, exige o caminho limpo.
- **Corregedor Aníbal Rocha** — a Corregedoria em pessoa; aliado se honesto, algoz se corrupto.
- **Bispo** — informante de rua que joga dos dois lados.
- **Túlio Andrade** — assessor do gabinete no ato final.

### Gerentes

- **Serpente:** Waldir "Marreta" Nunes · Tonho "Fumaça" Reis · Zico do Alemão · Neno "Pistola" Farias
- **Falange:** Percival "Doutor" Gomes · Gugu "Trator" Mendes · Careca de Ouro · Rui "Tigrão" Salles
- **Corvos:** Célio "Sombra" Prado · Ivo "Cebola" Martins · Betão "Sussurro" Lima · Dandinho da Baixada
- **Seu Movimento:** Jhow Jhow (ambição) · Ferruge (firmeza) · Gordão (relações) · Feioso (intimidação)

---

## 10. Campanha: "Porto Esperança Confidencial"

Arco de **5 atos** e **25 missões** roteirizadas para a carreira policial, onde cada um dos três chefes cai por um **método diferente**. Todo ato tem ao menos um ponto de **caixa dois** — dinheiro sujo que engorda o bolso e mancha a ficha, atraindo a **Corregedoria**.

### Ato I — FARDA NOVA
> *A quebrada tem dono — e não é o Estado.*

| ID | Missão | Descrição |
|---|---|---|
| a1m1–2 | Primeira Ronda · Vidro Quebrado | Introdução à rua ao lado de Ferraz; caçar o autor de furtos em série até a rede do Dandinho. |
| a1m3 | O Envelope do Sargento | Você flagra o Sgt. Brito recebendo propina. **DILEMA:** reportar (ficha limpa) ou virar "parceiro" e receber caixa dois. |
| a1m4 | Os Olhos do Dandinho 🧠 | Minijogo de memória (placas de moto) para achar o olheiro dos Corvos. |
| a1m5 | A Queda de Dandinho 🎯 | Invasão ao amanhecer; o advogado oferece suborno no corredor. |

### Ato II — O CERCO
> *O Comando Serpente aperta o anel em volta do centro.*

| ID | Missão | Descrição |
|---|---|---|
| a2m1 | Ponto de Estrangulamento | Mapear as bocas da Serpente; Vidal começa a roubar seu crédito. |
| a2m2 | Marreta na Mira 🎯 | Prender Waldir "Marreta" Nunes vivo — que traz uma ameaça do Naja à sua família. |
| a2m3 | A Rota da Blitz | Um número desconhecido oferece uma fortuna pela rota da blitz. **DILEMA:** reportar o assédio ou vender uma rota falsa e embolsar. |
| a2m4 | Fumaça sem Fogo 🧠 | Notas fiscais infladas para pegar Tonho "Fumaça" Reis pela lavagem. |
| a2m5 | A Emboscada | Cilada da Serpente; Ferraz leva um tiro. **DILEMA:** abortar e salvar o parceiro ou perseguir os atiradores. |

### Ato III — SANGUE FRIO
> *Naja é o alvo. A guerra é o método.*

| ID | Missão | Descrição |
|---|---|---|
| a3m1 | O Dossiê da Serpente 🧠 | Montar um dossiê à prova de advogado; cravar a agenda secreta do Naja. |
| a3m2 | Cerco de Aço 🎯 | Comando de campo da maior operação da carreira; encurralar Naja vivo. |
| a3m3 | A Oferta da Serpente | Naja oferece uma fortuna para você "errar o alvo", sob o olhar do Corregedor. **DECISÃO DE CARREIRA:** prender o Naja ou deixá-lo fugir por dinheiro sujo. |
| a3m4–5 | Rescaldo · Promoção e Preço | Conter o vácuo de poder; na coletiva, dividir o crédito com Ferraz ou assumir os louros sozinho. |

### Ato IV — DINHEIRO SUJO
> *Dom Heitor não cai por bala. Siga o dinheiro.*

| ID | Missão | Descrição |
|---|---|---|
| a4m1 | Siga o Dinheiro | Força-tarefa financeira contra a Falange. **DILEMA:** reportar o analista ou "esquecer um zero" e dividir meio milhão. |
| a4m2 | Caixa Dentro do Caixa 🧠 | Achar a planilha-mãe que amarra toda a lavagem. |
| a4m3 | O Doutor 🎯 | Prender Percival "Doutor" Gomes na missa. **DILEMA:** delação gravada ou "acordo por fora" (Rocha está ouvindo). |
| a4m4 | O Cofre-Mestre | Busca e apreensão; você encontra fotos de um juiz recebendo propina. **DILEMA:** entregar à promotora ou guardar as fotos como seguro. |
| a4m5 | O Preço de Dom Heitor | Um cheque em branco na mesa. **DECISÃO DE CARREIRA:** rasgar e prender ou preencher e "perder" a planilha. |

### Ato V — O CORVO
> *Jordan é um fantasma. Inteligência é a única arma.*

| ID | Missão | Descrição |
|---|---|---|
| a5m1 | O Fantasma | Caçar Jordan por padrões de comportamento; a primeira suspeita sobre Vidal. |
| a5m2 | A Toupeira | Plantar informações falsas para expor o traidor interno — é o Vidal. **DILEMA:** prender pela Corregedoria ou usá-lo como canal duplo. |
| a5m3 | A Voz do Corvo 🧠 | Gravar a hierarquia dos Corvos; descobrir que o informante Bispo joga dos dois lados. |
| a5m4 | A Isca Perfeita | Você mesmo vira a isca — cerco invisível ou emboscada dupla para capturar Jordan. |
| a5m5 | O Ninho Vazio | Jordan oferece "o mapa de todos os podres da cidade" — inclusive o que Rocha tem contra você. **DECISÃO FINAL:** algemar limpo ou deixá-lo ir pelas chaves do reino podre. |

### A Corregedoria (fio moral)

O acúmulo de corrupção (`corr`) e dinheiro sujo (`dirty`) dispara três estágios:
1. **Aviso** (corr ≥ 3) — um bilhete anônimo do Corregedor Rocha.
2. **Investigação preliminar** (corr ≥ 6) — todo relatório passa pela lupa; travas de mérito.
3. **Julgamento** (corr ≥ 9) — comissão formada: comprar o silêncio (R$ 200 mil do caixa dois) ou encarar com risco de expulsão.

O **Sgt. Brito** pode servir de escudo uma vez (assume uma denúncia por você).

### Minijogos

- **⏱ Timer** — decidir sob contagem regressiva.
- **🎲 Push-your-luck** — arriscar viagens; risco cresce a cada rodada.
- **🧠 Memória** — decorar itens exibidos por segundos e responder.
- **🎯 QTE** — tocar no instante exato dentro de uma janela de timing.

---

## 11. Progressão & Finais

### Patentes

**✦ Facção — "Do Recado ao Trono" (7 degraus):**
Menino de Recados → Mula → Olheiro → Contenção → Segurança do Chefe → **Gerente** → **Chefe**
(Gerente abre o mapa tutelado; Chefe leva ao modo livre.)

**⛨ Polícia — três corporações:**
- **PM:** Soldado → Cabo → Sargento → Tenente
- **PC:** Investigador → Escrivão → Delegado Adjunto → Delegado
- **PF:** Agente → Delegado Federal → Superintendente → Diretor-Geral

Mérito promove dentro da corporação; o topo abre transferência para a seguinte. Uma camada de **política nacional** vai do Vereador ao Ministro.

### Finais — Polícia

- **🎖 Secretário de Segurança** — os três chefes presos, ficha limpa. Rocha atesta a limpeza e o governador te nomeia. O final de herói.
- **🕶 O Homem do Sistema** — chefes soltos ou caixa dois alto. Você é Secretário, mas manda nas sombras, num acordo silencioso com o Corregedor.
- **🎗 Coronel Reformado** — meio-termo: ficha boa demais pra cadeia, manchada demais pro palanque. Condecorado, com Ferraz batendo continência.
- **Fracasso:** Exonerado · Preso pela Corregedoria · Expulso da Corporação.

### Finais — Facção

- **👑 Herdar / ⚔ Trair / 🤝 Aliado** — ao atingir a meta de territórios: herdar toda a facção-mãe, declarar independência (guerra) ou reinar como sócio.
- **💎 O Magnata** — legalizar o império e sair por cima, sem digital no passado. A vitória limpa do crime.
- **Fracasso:** perder tudo · trono tomado · traição punida.

---

## 12. Identidade visual & UX

**Tema:** neo-noir urbano. Fundo escuro azulado, o **dourado** como cor-assinatura (a realeza do trono, a coroa ♛), contrastando com o azul da ordem e o vermelho do crime. Tipografia sans-serif de sistema + **mono** em rótulos e números (aparência de dossiê/terminal).

**Paleta:**

| Cor | Hex | Uso |
|---|---|---|
| Fundo noir | `#10141C` | ground |
| Dourado | `#D9B25F` | acento-assinatura |
| Serpente | `#C94B4B` | facção cs |
| Falange | `#C99B3F` | facção fd |
| Corvos | `#8E6BC9` | facção cv |
| Polícia | `#3D7BD9` | lado pl |

**HUD adaptativo:** cabeçalho com caixa, procurado, reputação, soldados e zonas. No modo polícia, uma "skin" de arte oficial recebe máscaras com os valores reais por cima.

**Animações:** pulso lateral azul/vermelho no menu, brilho da coroa, "marching ants" no contorno da zona, explosões de conquista, sequências cinematográficas com barras de cinema.

**Som:** efeitos sintetizados via Web Audio (dinheiro, batalha, conquista) + trilha sonora em loop, iniciada após o primeiro toque.

---

## 13. Arquitetura técnica

- **Single-file React** — todo o jogo vive em `_source.jsx` (~14.700 linhas), compilado por Babel clássico para `assets/game.js`. React 18 e Tailwind via CDN.
- **Build:** `node compile-tronos.cjs` (no projeto `tronos`) gera `game.candidate.js` → copiado para `assets/game.js`.
- **PWA offline:** service worker versionado (`tronos-v104-carreira-final`) — cache-first para o núcleo, network-first para fotos. Instalável, retrato, tela cheia.
- **Persistência:** progresso em `localStorage`; distingue save de carreira e de estratégia ao retomar.
- **Deploy:** GitHub (`jhoesantos777/Tronos`) com deploy automático via Vercel a cada push.

---

## 14. Roadmap

**✓ Entregue:** modos facção e polícia · Modo Carreira (fac + pol) · campanha completa de 5 atos / 25 missões · Teatro de Batalha posicional · mapa em tela cheia com rotação · arsenal com fotos · fichas de gerentes · política nacional · PWA offline.

**◔ Pendências conhecidas:**
- Casos procedurais entre as missões roteirizadas da campanha (volume infinito de meio-jogo).
- Coletes e viaturas com foto real (hoje usam emoji).
- Trailer cinematográfico (kit Higgsfield pronto em `TRAILER-HIGGSFIELD.md`).

---

*Porto Esperança · TRONOS · O poder nunca fica vazio.* 👑
