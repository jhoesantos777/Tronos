# TRONOS — Economia v2 (Refatoração Completa)

## 🎯 Índice Econômico Estadual (IEE)

```javascript
const IEE = 1000; // R$ 1.000 = unidade base
```

Toda economia do jogo é múltiplo deste índice.

---

## 📊 Fases do Jogo

| Fase | Caixa Mínima | Caixa Máxima | Duração |
|------|-------------|-------------|---------|
| **Início** | 100 × IEE | 300 × IEE | Semanas 1-8 |
| **Meio** | 500 × IEE | 1.500 × IEE | Semanas 9-20 |
| **Final** | 2.000 × IEE | 5.000 × IEE | Semanas 21+ |

---

## 🏙️ Produção das Cidades (por semana)

```javascript
const CITY_PRODUCTION = {
  D: 12 × IEE,   // R$ 12.000
  C: 25 × IEE,   // R$ 25.000
  B: 45 × IEE,   // R$ 45.000
  A: 80 × IEE,   // R$ 80.000
  S: 140 × IEE   // R$ 140.000
};
```

**Mecânica:**
- Cada cidade gera produção semanal baseada na classe
- Facção controla cidade → recebe produção
- Polícia controla cidade → recebe arrecadação (governo)

---

## 💰 Custos Semanais (Manutenção de Tropas)

### Modo Facção

```javascript
const FACTION_UNIT_COSTS = {
  soldado: 1 × IEE,        // R$ 1.000
  atirador: 2 × IEE,       // R$ 2.000
  defensor: 2 × IEE,       // R$ 2.000
  elite: 4 × IEE,          // R$ 4.000
};

const FACTION_STAFF_COSTS = {
  tenente: 4 × IEE,        // R$ 4.000
  gerente: 3 × IEE,        // R$ 3.000
  advogado: 3 × IEE,       // R$ 3.000
  comandante: 5 × IEE,     // R$ 5.000
};
```

### Modo Polícia

```javascript
const POLICE_UNIT_COSTS = {
  aif: 3 × IEE,            // R$ 3.000 (por unidade, por semana)
  coep: 4 × IEE,           // R$ 4.000
  tat: 3 × IEE,            // R$ 3.000
  int: 2 × IEE,            // R$ 2.000
  rocom: 2 × IEE,          // R$ 2.000
  gcc: 2 × IEE,            // R$ 2.000
};

const POLICE_STAFF_COSTS = {
  comandante: 5 × IEE,     // R$ 5.000
};
```

---

## 🎖️ Corrupção (Pagamentos Recorrentes)

```javascript
const CORRUPTION_COSTS = {
  vereador: 5 × IEE,           // R$ 5.000
  delegado: 15 × IEE,          // R$ 15.000
  prefeito: 30 × IEE,          // R$ 30.000
  deputado: 80 × IEE,          // R$ 80.000
  secretario_estado: 150 × IEE // R$ 150.000
};
```

**Mecânica:**
- Pagamento semanal recorrente
- Falha no pagamento = agente desaparece
- Efeito desaparece imediatamente

---

## 🏢 Grandes Investimentos (One-time)

```javascript
const MAJOR_INVESTMENTS = {
  // Facção
  bunker: 350 × IEE,              // R$ 350.000
  rota_fuga: 180 × IEE,           // R$ 180.000
  centro_inteligencia: 500 × IEE, // R$ 500.000
  sistema_vigilancia: 250 × IEE,  // R$ 250.000
  
  // Negócios de Fachada
  negocio_pequeno: 50 × IEE,      // R$ 50.000
  negocio_medio: 120 × IEE,       // R$ 120.000
  negocio_grande: 200 × IEE,      // R$ 200.000
  
  // Pacotes Táticos
  tatico_basico: 20 × IEE,        // R$ 20.000
  tatico_avancado: 50 × IEE,      // R$ 50.000
  tatico_elite: 80 × IEE,         // R$ 80.000
};
```

---

## 🎯 Recrutamento de Tropas

```javascript
const RECRUITMENT_COSTS = {
  // Facção
  soldado: 5 × IEE,        // R$ 5.000 por unidade
  atirador: 10 × IEE,      // R$ 10.000
  defensor: 10 × IEE,      // R$ 10.000
  elite: 20 × IEE,         // R$ 20.000
  
  // Polícia (por 5 unidades)
  aif: 90 × IEE,           // R$ 90.000 por 5 (18k cada)
  coep: 140 × IEE,         // R$ 140.000 por 5 (28k cada)
  tat: 80 × IEE,           // R$ 80.000 por 5 (16k cada)
  int: 70 × IEE,           // R$ 70.000 por 5 (14k cada)
  rocom: 60 × IEE,         // R$ 60.000 por 5 (12k cada)
  gcc: 70 × IEE,           // R$ 70.000 por 5 (14k cada)
};
```

---

## 📈 Recompensas

```javascript
const REWARDS = {
  // Roubos/Assaltos
  heist_small: 30 × IEE,        // R$ 30.000
  heist_medium: 80 × IEE,       // R$ 80.000
  heist_large: 150 × IEE,       // R$ 150.000
  
  // Operações
  operacao_pequena: 40 × IEE,   // R$ 40.000
  operacao_media: 100 × IEE,    // R$ 100.000
  operacao_grande: 250 × IEE,   // R$ 250.000
  
  // Vitórias em confronto
  vitoria_zona: 30 × IEE,       // R$ 30.000
  
  // Missões
  missao_simples: 50 × IEE,     // R$ 50.000
  missao_media: 120 × IEE,      // R$ 120.000
  missao_complexa: 250 × IEE,   // R$ 250.000
};
```

---

## 🏛️ Governo (Economia Macro)

```javascript
const GOVERNMENT = {
  arrecadacao_por_cidade_A: 15 × IEE,  // R$ 15.000
  arrecadacao_por_cidade_B: 10 × IEE,  // R$ 10.000
  arrecadacao_por_cidade_C: 5 × IEE,   // R$ 5.000
  
  // Bônus/Penalidades
  bonus_estavel: 50 × IEE,             // +R$ 50.000 se estável
  penalidade_instavel: 50 × IEE,       // -R$ 50.000 se instável
  
  // Alocação para Polícia
  budget_policia_base: 200 × IEE,      // R$ 200.000 base
  budget_policia_por_cidade: 5 × IEE,  // +R$ 5.000 por cidade
};
```

---

## 🔀 Fluxo Econômico Semanal (Pseudocódigo)

```javascript
SEMANA_LOOP:
  1. Calcular produção das cidades
     - Facção recebe: produção × cidades controladas
     - Governo recebe: arrecadação × cidades controladas
  
  2. Pagar manutenção de tropas
     - Facção: custo × nº unidades
     - Polícia: custo × nº unidades
  
  3. Pagar staff (comandantes, gerentes, etc)
     - Desconto se pagamento não for possível
  
  4. Pagar corrupção
     - Se falha: agente desaparece
  
  5. Polícia recebe orçamento
     - Valor = base + bônus/penalidades
  
  6. Gerar eventos econômicos
     - Roubo, assalto, operação
     - Gera receita se sucesso
  
  7. Atualizar estado
     - Caixa final
     - Recursos restantes
```

---

## ⚙️ Implementação (Fases)

### Fase 1: Constantes Centralizadas
- [ ] Criar arquivo `ECONOMY_CONSTANTS.js`
- [ ] Definir todas as constantes baseadas em IEE
- [ ] Importar em `_source.jsx`

### Fase 2: Refatorar Loop Semanal
- [ ] Atualizar `endTurn()` para usar constantes
- [ ] Implementar novo fluxo econômico
- [ ] Remover números mágicos

### Fase 3: Corrupção e Governo
- [ ] Implementar sistema de corrupção recorrente
- [ ] Criar orçamento governamental
- [ ] Integrar com polícia

### Fase 4: Balanceamento
- [ ] Ajustar recompensas
- [ ] Balancear dificuldade
- [ ] Testar curvas econômicas

### Fase 5: Testes
- [ ] Jogar campanha completa (Facção)
- [ ] Jogar campanha completa (Polícia)
- [ ] Verificar inflação
- [ ] Validar faixas esperadas

---

## 📝 Notas

- Todos os valores em **múltiplos de IEE**
- Evitar números fixos no código
- Manutenção semanal deve ser proporcional ao poder
- Receitas devem ter origem narrativa clara
- Balanceamento via tabelas, não hardcoding

