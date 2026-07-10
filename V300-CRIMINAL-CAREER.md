# ⚙ ATUALIZAÇÃO V300 — CRIMINAL CAREER ENGINE
## Modo Carreira Facção · "DO BECO AO TRONO"

> Documento de direção e roadmap. Estrutura a visão do diretor em fases
> implementáveis sobre a arquitetura atual do jogo, **sem remover nenhum
> sistema existente, sem alterar o modo livre e sem alterar o modo polícia**.

---

## Regras de ouro (invariantes)

1. Analisar toda a estrutura atual antes de qualquer alteração.
2. **NÃO** remover nenhum sistema existente.
3. **NÃO** alterar o funcionamento do modo livre.
4. **NÃO** alterar o modo polícia.
5. Toda implementação usa a arquitetura atual (`cr`, `MISSIONS`, `EVENTS`,
   `chron`, `CAREER_NEWS`, motor de cenas/minigames, `missionById`).
6. Todos os novos sistemas são **desacoplados e reutilizáveis** (o motor de
   casos procedurais F4 da polícia é o modelo: gerador determinístico por
   semente + histórico anti-repetição).

---

## Filosofia

O jogador **não executa missões para ganhar dinheiro** — ele **constrói uma
carreira criminosa**. Cada decisão altera: reputação, personalidade, relação
com a facção, investigação policial, influência, posição na organização,
comportamento da cidade e reação da IA. O mundo deve parecer vivo.
**Nenhuma semana deve ser igual.**

## História

**DO BECO AO TRONO.** O protagonista é um jovem da favela. Não é assassino,
não é herói — é alguém tentando crescer. Entra na facção porque enxerga ali
uma oportunidade. Começa **sem influência, sem dinheiro, sem armas, sem
respeito, sem território**. Toda a ascensão será construída.

## Estrutura da engine

```
CAPÍTULOS → MISSÕES PRINCIPAIS → EVENTOS DINÂMICOS → OPERAÇÕES
          → CONSEQUÊNCIAS → NOVOS EVENTOS
```

As missões **não são isoladas**: alteram permanentemente o restante da
campanha (flags persistentes, como já feito na campanha policial).

## Os 5 capítulos

| Ato | Nome | Objetivo |
|---|---|---|
| I | **SOBREVIVER** | Provar que merece permanecer na facção. |
| II | **CONQUISTAR** | Assumir responsabilidade. |
| III | **CONTROLAR** | Administrar dinheiro, pessoas e influência. |
| IV | **PODER** | Sobreviver às traições. |
| V | **O TRONO** | Assumir o comando. |

Ao concluir o Ato V inicia automaticamente o **MODO TRONO** (sem fim definitivo).

## As 25 missões principais (5 por ato)

Formato de cada missão (estende o formato atual de `MISSIONS` + campanha):
id, nome, descrição, cinemática inicial, objetivo, objetivos opcionais, NPCs,
local, requisitos, tempo estimado, nível recomendado, recompensas, penalidades,
pontuação, **consequências permanentes** (flags), eventos desbloqueados,
notícias possíveis, diálogos, decisões, múltiplos resultados.
**Nunca criar missões lineares.**

Sementes já definidas pelo diretor:

1. **O PRIMEIRO CORRE** — levar carga entre duas bocas. Eventos possíveis:
   blitz, roubo, emboscada, cliente denunciando, morador ajudando. Opcionais:
   não chamar atenção · não perder carga · terminar rápido.
2. **A PRIMEIRA COBRANÇA** — cobrar comerciante. Escolhas: negociar /
   intimidar / agredir / executar — cada uma altera dezenas de atributos.
3. **FAVELA OBSERVA** — distribuir ajuda comunitária ou desviar recursos.
   A popularidade começa aqui.
4. **O X9** — descobrir se existe um informante. A resposta **nunca é fixa**:
   a engine decide (semente por campanha).
5. **BATISMO DE FOGO** — primeiro confronto armado: fugir / lutar / salvar o
   parceiro / abandonar o parceiro.

As demais 20 seguem a mesma qualidade, distribuídas pelos atos II–V.

## Sistemas

### Atributos (11)
Respeito · Lealdade · Popularidade · Procurado · Violência · Ganância ·
Influência · Inteligência Criminal · Moral · Confiança do Chefe · Experiência.
Cada ação altera esses atributos (campo novo `cr.attr = {...}` — aditivo,
não substitui `merit/heat/loyal` existentes; alimenta-se deles).

### Personalidade (derivada, automática)
Perfis calculados dos atributos: Violento · Estrategista · Calculista ·
Impulsivo · Manipulador · Leal · Ganancioso · Frio. O perfil altera missões
disponíveis, diálogos, eventos, respeito, recrutamento e promoções.

### Investigação policial (8 fases — nunca sorteio simples)
0 Desconhecido → 1 Suspeito → 2 Monitorado → 3 Escutas → 4 Investigação →
5 Mandado → 6 Operação Especial → 7 Caçada Nacional.
Evolui por: crimes, violência, testemunhas, roubos, lavagem, denúncias,
notícias, corrupção.

### Prisão (cálculo, jamais sorteio puro)
`risco = f(Investigação, Procurado, Violência) − f(Lealdade, Influência,
Advogados, Corrupção, Popularidade)`.
Se preso: sistema penitenciário — tempo, audiências, Habeas Corpus,
advogados, resgate, tentativa de fuga (estende o `jail` atual).

### Facção reativa
Lealdade alta: esconde o jogador, compra delegado, elimina testemunhas,
envia advogado, envia dinheiro. Lealdade baixa: abandona, toma patrimônio,
expulsa, mata o personagem.

### Chefe (confiança dinâmica)
O chefe observa tudo. Conforme a confiança: novas oportunidades, promoções,
testes, operações especiais, castigos, execução.

### Gerentes com personalidade
Coragem · Ganância · Lealdade · Competência · Violência · Relacionamento.
Podem roubar, trair, crescer, morrer, ser presos, pedir ajuda
(estende `PLAYER_MANAGERS`/sistema de golpe interno existente).

### NPCs com memória permanente
Se o jogador humilhou alguém, esse NPC lembra — meses depois pode trair,
ajudar, vingar ou denunciar (novo `cr.memoria = [{npc, fato, semana, carga}]`).

### Notícias
Toda decisão relevante gera manchete (estende `CAREER_NEWS`/`rollCareerNews`):
"Polícia investiga nova liderança" · "Moradores denunciam violência" ·
"Facção distribui alimentos" · "Gerente desaparece" · "Grande apreensão" ·
"Chefe escapa da prisão".

### Mundo vivo
Centenas de acontecimentos possíveis baseados na situação atual (não em
sorteio cego): roubo, traição, assalto, emboscada, informante, corrupção,
falta de armas, greve, manifestação, operação policial, favela em festa,
ataque rival, crise financeira, incêndio, sequestro.
Modelo: gerador procedural com pesos por estado (o motor F4 é a base).

### Progressão
Promoções deixam de depender só de XP. Passam a exigir combinação de:
Confiança, Respeito, Resultados, Lealdade, dinheiro movimentado,
territórios conquistados.

### Modo Trono (pós-campanha, infinito)
Não finalizar o jogo. O objetivo muda: manter o poder — controlar gerentes,
controlar políticos, administrar a economia, evitar golpes, responder
investigações, expandir internacionalmente. Eventos infinitos.

---

## Roadmap de implementação (fases)

| Fase | Entrega | Base existente reutilizada |
|---|---|---|
| **V300.1** | Atributos (11) + personalidade derivada + tela de perfil | `cr`, aba PERFIL |
| **V300.2** | Campanha "Do Beco ao Trono": Ato I completo (missões 1–5 com múltiplos resultados e flags) | motor de campanha policial (`camp`, `requires`, flags), minigames |
| **V300.3** | Investigação em 8 fases + prisão por cálculo + sistema penitenciário | `heat`, `jail`, advogados |
| **V300.4** | Facção reativa + confiança do Chefe + gerentes com personalidade | `loyal`, `careerCast`, golpe interno |
| **V300.5** | Atos II–III + NPCs com memória + notícias ligadas a decisões | `CAREER_NEWS`, `chron` |
| **V300.6** | Atos IV–V + mundo vivo (gerador de acontecimentos por estado) | motor F4 de casos procedurais |
| **V300.7** | Modo Trono (pós-campanha infinito) + progressão multi-critério | `careerGov`, modo livre (intocado) |

Cada fase é jogável e verificada no preview antes do push.

## Objetivo final

O jogador deve sentir que **vive uma carreira criminosa**, não que completa
missões. Toda decisão altera o mundo; toda semana produz consequências; toda
campanha é diferente da anterior. Profundidade para dezenas de horas antes
do Trono.
