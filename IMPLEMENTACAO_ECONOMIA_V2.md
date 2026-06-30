# TRONOS — Plano de Implementação (Economia v2)

## 📋 Overview

Este documento detalha como integrar as constantes econômicas centralizadas (`ECONOMY_CONSTANTS.js`) no código existente (`_source.jsx`), mantendo compatibilidade total.

**Objetivo:** Remover números mágicos e centralizar toda economia em constantes.

---

## ✅ Checklist de Implementação

### Fase 1: Integração de Constantes

- [ ] Copiar `ECONOMY_CONSTANTS.js` para pasta do projeto
- [ ] Adicionar constantes ao topo de `_source.jsx` (após imports, antes de lógica)
- [ ] Remover todas constantes duplicadas espalhadas pelo código
- [ ] Compilar e testar (sem mudanças no comportamento)

### Fase 2: Refatorar Recrutamento

**Arquivo:** `_source.jsx` → função `recruitUnit()`

**Antes:**
```javascript
const recruitUnit = k => {
  if (g.mode === "pl") {
    const F = POLICE_FORCE_TYPES[k];
    const cost = Math.ceil(F.cost * 5 * (1 - recBonus));
    spend(cost, ...);
  }
};
```

**Depois:**
```javascript
const recruitUnit = k => {
  if (g.mode === "pl") {
    const cost = POLICE_RECRUITMENT[k]; // ← Constante centralizada
    const recBonus = g.status?.rec ? Math.min(0.3, g.status.rec * 0.01) : 0;
    const finalCost = Math.ceil(cost * (1 - recBonus));
    spend(finalCost, ...);
  }
};
```

**Mudanças:**
- [ ] Usar `POLICE_RECRUITMENT[k]` ao invés de calcular `F.cost * 5`
- [ ] Remover `F.cost` de `POLICE_FORCE_TYPES` (será definido apenas em constantes)
- [ ] Aplicar mesmo padrão para facção

### Fase 3: Refatorar Loop Semanal (`endTurn()`)

**Arquivo:** `_source.jsx` → função `endTurn()`

**Seção: Cálculo de Renda das Cidades**

Antes:
```javascript
const prodPerWeek = myZones().reduce((a, z) => {
  const tier = T_TIER[z];
  return a + [12, 25, 45, 80, 140][tier];
}, 0);
```

Depois:
```javascript
const prodPerWeek = myZones().reduce((a, z) => {
  const tier = T_TIER[z];
  const tierMap = {0: 'D', 1: 'C', 2: 'B', 3: 'A', 4: 'S'};
  return a + CITY_PRODUCTION[tierMap[tier]];
}, 0);
```

**Mudanças:**
- [ ] Usar `CITY_PRODUCTION` objeto ao invés de array hardcoded
- [ ] Manter compatibilidade com tiers existentes
- [ ] Testar com cidades de cada classe

**Seção: Custos de Manutenção**

Criar função auxiliar:
```javascript
const calculateMaintenanceCosts = (state) => {
  let totalCost = 0;
  
  if (state.mode === "pl") {
    // Custo de unidades policiais
    for (const [force, count] of Object.entries(state.policeForces || {})) {
      totalCost += count * POLICE_UNIT_MAINTENANCE[force];
    }
    // Custo de staff
    if (state.commands) {
      // ...comandantes pagos
    }
  } else {
    // Custo de unidades de facção
    for (const k of UKEYS) {
      totalCost += (state.army[k] || 0) * FACTION_UNIT_MAINTENANCE[k];
    }
    // Custo de staff
    if (state.managers) totalCost += FACTION_STAFF_MAINTENANCE.gerente;
    for (const law of (state.lawyers || [])) {
      totalCost += FACTION_STAFF_MAINTENANCE.advogado;
    }
  }
  
  return totalCost;
};
```

**Mudanças:**
- [ ] Criar função que calcula custo total semanal
- [ ] Usar `FACTION_UNIT_MAINTENANCE` e `POLICE_UNIT_MAINTENANCE`
- [ ] Integrar staff (comandantes, gerentes, gravatas)
- [ ] Chamar em `endTurn()` antes de distribuir receita

### Fase 4: Refatorar Corrupção

**Arquivo:** `_source.jsx` → seção de corrupção em `endTurn()`

**Antes:**
```javascript
const costVereador = 70;  // ❌ Número mágico
const costPrefeito = 300; // ❌ Número mágico
```

**Depois:**
```javascript
function pagarCorrupcao(state) {
  if (!state.bribes) return 0;
  
  let totalCost = 0;
  const expirados = [];
  
  for (const bribeId of Object.keys(state.bribes)) {
    const tier = BRIBE_TIERS.find(t => t.id === bribeId);
    if (!tier) { expirados.push(bribeId); continue; }
    
    // ← Usar CORRUPTION_COSTS ao invés de números mágicos
    const cost = CORRUPTION_COSTS[bribeId] || 0;
    
    if (state.cash >= cost) {
      state.cash -= cost;
      totalCost += cost;
    } else {
      // Falha no pagamento = agente desaparece
      expirados.push(bribeId);
      ev.push({
        tone: "warn",
        text: `⚠ ${tier.name} cortou o canal — caixa insuficiente.`
      });
    }
  }
  
  // Remover agentes que não foram pagos
  for (const id of expirados) delete state.bribes[id];
  
  return totalCost;
}
```

**Mudanças:**
- [ ] Usar `CORRUPTION_COSTS` para cada agente
- [ ] Implementar mecânica "sem pagamento = sem agente"
- [ ] Criar função reutilizável
- [ ] Integrar em `endTurn()`

### Fase 5: Sistema de Governo

**Arquivo:** `_source.jsx` → nova seção ou expansão de governo

**Implementar:**

```javascript
function calcularOrcamentoGoverno(state) {
  const isPol = state.mode === "pl";
  if (!isPol) return 0; // Só existe em modo polícia
  
  let orcamento = GOVERNMENT_ECONOMY.police_budget_base;
  
  // Bônus por cidade
  const cidades_controladas = state.terr.filter(t => t.owner === "pl").length;
  orcamento += cidades_controladas * GOVERNMENT_ECONOMY.police_budget_per_city;
  
  // Bônus/Penalidades por estabilidade
  const estabilidade = (state.security?.index || 50); // hipotético
  if (estabilidade > 70) {
    orcamento += GOVERNMENT_ECONOMY.bonus_stable;
  } else if (estabilidade < 30) {
    orcamento -= GOVERNMENT_ECONOMY.penalty_unstable;
  }
  
  return orcamento;
}
```

**Integração em `endTurn()`:**
```javascript
// Em modo polícia
const orcamentoSemanal = calcularOrcamentoGoverno(g);
s.budget += orcamentoSemanal;

ev.push({
  tone: "info",
  text: `💰 Governo arrecadou ${brMoney(orcamentoSemanal)}. Budget: ${brMoney(s.budget)}`
});
```

**Mudanças:**
- [ ] Criar função de cálculo de orçamento
- [ ] Implementar arrecadação por cidade
- [ ] Implementar bônus/penalidades por estabilidade
- [ ] Chamar em `endTurn()`

### Fase 6: Refatorar Recompensas

**Arquivo:** `_source.jsx` → funções de recompensa

**Exemplo: Roubos**

Antes:
```javascript
const loot = Math.round(tier * 40 + heist.risk * 600); // ❌ Números mágicos
```

Depois:
```javascript
const baseReward = HEIST_REWARDS[`tier${tier}`];
const riskBonus = Math.round(heist.risk * baseReward * 0.5);
const loot = baseReward + riskBonus;
```

**Mudanças:**
- [ ] Usar `HEIST_REWARDS`, `OPERATION_REWARDS`, `MISSION_REWARDS`
- [ ] Aplicar progressão clara (tier1 < tier2 < tier3)
- [ ] Manter bônus por risco/dificuldade
- [ ] Integrar em todas funções de recompensa

### Fase 7: UI - Mostrar Custos Corretamente

**Arquivo:** `_source.jsx` → Card EFETIVO e outros

**Problema atual:**
```javascript
<Btn onClick={() => recruitUnit(k)}>+5 · R${F.cost * 5}</Btn>
```

**Solução:**
```javascript
const recruitCost = POLICE_RECRUITMENT[k];
<Btn onClick={() => recruitUnit(k)}>+5 · {brMoney(recruitCost)}</Btn>
```

**Mudanças:**
- [ ] Atualizar exibição de custos em cards
- [ ] Usar `brMoney()` para formatação
- [ ] Verificar tooltips e mensagens

---

## 🔍 Verificação Pós-Implementação

### Teste 1: Economia Inicial
- [ ] Jogador começa com 150k-300k (facção) ou 300k (polícia)
- [ ] Primeira semana produz receita coerente
- [ ] Custos de tropas são pagos corretamente

### Teste 2: Crescimento Econômico
- [ ] Semana 10: Caixa deve estar entre 500k-1.5M
- [ ] Receitas crescem proporcionalmente com cidades
- [ ] Custos aumentam proporcionalmente com exército

### Teste 3: Fases Finais
- [ ] Semana 25: Caixa máximo 5M (não infinito)
- [ ] Inflação não ocorre
- [ ] Receitas e custos proporcionais

### Teste 4: Corrupção
- [ ] Agentes sem pagamento desaparecem
- [ ] Custos semanais são respeitados
- [ ] Mensagens claras quando falha pagamento

### Teste 5: Governo (Polícia)
- [ ] Orçamento aumenta com cidades controladas
- [ ] Bônus/penalidades aplicadas corretamente
- [ ] Receita é coerente com produção

---

## 🚀 Ordem Recomendada de Implementação

1. **Copiar constantes** (Fase 1)
2. **Recrutamento** (Fase 2) — mudança mais visível
3. **Custos de manutenção** (Fase 3) — ajusta economia base
4. **Corrupção** (Fase 4) — novo comportamento importante
5. **Governo** (Fase 5) — específico para polícia
6. **Recompensas** (Fase 6) — ajusta receitas
7. **UI** (Fase 7) — cosmético, mas importante
8. **Testar e balancear** — iteração final

---

## 📝 Balanceamento Futuro

Com todas constantes centralizadas, ajustar é simples:

**Exemplo: Aumentar produção das cidades em 20%**
```javascript
const CITY_PRODUCTION = {
  D: 12 * IEE * 1.2,   // Era 12, agora 14.4
  C: 25 * IEE * 1.2,   // Era 25, agora 30
  // ...
};
```

**Exemplo: Aumentar custo de elites**
```javascript
const FACTION_UNIT_MAINTENANCE = {
  // ...
  e: 5 * IEE  // Era 4, agora 5
};
```

Pronto! Toda economia ajusta proporcionalmente.

---

## ⚠️ Cuidados

- ✋ **Não quebrar arquitetura existente** — apenas reorganizar camada financeira
- ✋ **Testar cada fase** — não implementar tudo de uma vez
- ✋ **Manter compatibilidade de savegames** — se possível
- ✋ **Documentar mudanças** — para debug futuro

