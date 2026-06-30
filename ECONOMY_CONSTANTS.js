// ============ TRONOS — ECONOMIA V2 ============
// Índice Econômico Estadual (IEE)
// Todas as transações financeiras baseadas neste multiplicador

const IEE = 1000; // R$ 1.000 = unidade base

// ============ PRODUÇÃO DAS CIDADES (por semana) ============
const CITY_PRODUCTION = {
  D: 12 * IEE,   // R$ 12.000
  C: 25 * IEE,   // R$ 25.000
  B: 45 * IEE,   // R$ 45.000
  A: 80 * IEE,   // R$ 80.000
  S: 140 * IEE   // R$ 140.000
};

// ============ MANUTENÇÃO DE TROPAS (custos semanais) ============

// Facção - Unidades Militares
const FACTION_UNIT_MAINTENANCE = {
  b: 1 * IEE,    // Soldado: R$ 1.000
  a: 2 * IEE,    // Atirador: R$ 2.000
  d: 2 * IEE,    // Defensor: R$ 2.000
  e: 4 * IEE     // Elite: R$ 4.000
};

// Facção - Staff
const FACTION_STAFF_MAINTENANCE = {
  tenente: 4 * IEE,      // R$ 4.000
  gerente: 3 * IEE,      // R$ 3.000
  advogado: 3 * IEE,     // R$ 3.000 (gravata/advogado)
  comandante: 5 * IEE    // R$ 5.000
};

// Polícia - Forças
const POLICE_UNIT_MAINTENANCE = {
  aif: 3 * IEE,    // R$ 3.000 por unidade
  coep: 4 * IEE,   // R$ 4.000 por unidade
  tat: 3 * IEE,    // R$ 3.000 por unidade
  int: 2 * IEE,    // R$ 2.000 por unidade
  rocom: 2 * IEE,  // R$ 2.000 por unidade
  gcc: 2 * IEE     // R$ 2.000 por unidade
};

// Polícia - Staff
const POLICE_STAFF_MAINTENANCE = {
  comandante: 5 * IEE  // R$ 5.000
};

// ============ RECRUTAMENTO (custos únicos) ============

// Facção - Custo por unidade
const FACTION_RECRUITMENT = {
  b: 5 * IEE,     // Soldado: R$ 5.000
  a: 10 * IEE,    // Atirador: R$ 10.000
  d: 10 * IEE,    // Defensor: R$ 10.000
  e: 20 * IEE     // Elite: R$ 20.000
};

// Polícia - Custo por 5 unidades
const POLICE_RECRUITMENT = {
  aif: 90 * IEE,    // 5× AIF: R$ 90.000 (18k cada)
  coep: 140 * IEE,  // 5× COEP: R$ 140.000 (28k cada)
  tat: 80 * IEE,    // 5× TÁT: R$ 80.000 (16k cada)
  int: 70 * IEE,    // 5× INT: R$ 70.000 (14k cada)
  rocom: 60 * IEE,  // 5× ROCOM: R$ 60.000 (12k cada)
  gcc: 70 * IEE     // 5× GCC: R$ 70.000 (14k cada)
};

// ============ CORRUPÇÃO (pagamentos recorrentes semanais) ============
const CORRUPTION_COSTS = {
  vereador: 5 * IEE,           // R$ 5.000
  delegado: 15 * IEE,          // R$ 15.000
  prefeito: 30 * IEE,          // R$ 30.000
  deputado: 80 * IEE,          // R$ 80.000
  secretario_estado: 150 * IEE // R$ 150.000
};

// ============ GRANDES INVESTIMENTOS (one-time) ============
const MAJOR_INVESTMENTS = {
  // Estruturas Facção
  bunker: 350 * IEE,                // R$ 350.000
  rota_fuga: 180 * IEE,             // R$ 180.000
  centro_inteligencia: 500 * IEE,   // R$ 500.000
  sistema_vigilancia: 250 * IEE,    // R$ 250.000

  // Negócios de Fachada
  shell_pequeno: 50 * IEE,          // R$ 50.000
  shell_medio: 120 * IEE,           // R$ 120.000
  shell_grande: 200 * IEE,          // R$ 200.000

  // Pacotes Táticos
  tatico_basico: 20 * IEE,          // R$ 20.000
  tatico_avancado: 50 * IEE,        // R$ 50.000
  tatico_elite: 80 * IEE,           // R$ 80.000

  // Arsenal/Equipamentos Facção
  arsenal_nivel1: 100 * IEE,        // R$ 100.000
  arsenal_nivel2: 160 * IEE,        // R$ 160.000

  // Arsenal/Equipamentos Polícia
  vests: 100 * IEE,                 // R$ 100.000
  tactical: 120 * IEE,              // R$ 120.000
  vehicles: 90 * IEE                // R$ 90.000
};

// ============ RECOMPENSAS ============

// Roubos/Assaltos
const HEIST_REWARDS = {
  tier1: 30 * IEE,   // R$ 30.000
  tier2: 80 * IEE,   // R$ 80.000
  tier3: 150 * IEE   // R$ 150.000
};

// Operações
const OPERATION_REWARDS = {
  small: 40 * IEE,    // R$ 40.000
  medium: 100 * IEE,  // R$ 100.000
  large: 250 * IEE    // R$ 250.000
};

// Confrontos
const CONFRONTO_REWARDS = {
  vitoria: 30 * IEE   // R$ 30.000 por zona conquistada
};

// Missões
const MISSION_REWARDS = {
  simple: 50 * IEE,    // R$ 50.000
  medium: 120 * IEE,   // R$ 120.000
  complex: 250 * IEE   // R$ 250.000
};

// ============ GOVERNO (ECONOMIA MACRO) ============
const GOVERNMENT_ECONOMY = {
  // Arrecadação por cidade
  tax_per_city_A: 15 * IEE,    // R$ 15.000
  tax_per_city_B: 10 * IEE,    // R$ 10.000
  tax_per_city_C: 5 * IEE,     // R$ 5.000

  // Bônus/Penalidades
  bonus_stable: 50 * IEE,      // +R$ 50.000 se estável
  penalty_unstable: 50 * IEE,  // -R$ 50.000 se instável

  // Orçamento da Polícia
  police_budget_base: 200 * IEE,       // R$ 200.000 base semanal
  police_budget_per_city: 5 * IEE      // +R$ 5.000 por cidade
};

// ============ VALORES INICIAIS ============
const INITIAL_FUNDS = {
  faction: 150 * IEE,   // R$ 150.000 (facção começa com isso)
  police: 300 * IEE     // R$ 300.000 (polícia começa com isso)
};

// ============ FASES DO JOGO (referência) ============
const GAME_PHASES = {
  early: {
    weeks: "1-8",
    cash_min: 100 * IEE,
    cash_max: 300 * IEE
  },
  mid: {
    weeks: "9-20",
    cash_min: 500 * IEE,
    cash_max: 1500 * IEE
  },
  late: {
    weeks: "21+",
    cash_min: 2000 * IEE,
    cash_max: 5000 * IEE
  }
};

// ============ EXPORT (para uso em _source.jsx) ============
// Adicionar ao início de _source.jsx após as constantes globais
