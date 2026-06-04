# Meta Ads — E-book Menopausa

Criativos e documentação de campanha para o e-book  
**"Por que você come menos e engorda mais — e o que fazer diferente na menopausa"**

---

## Criativos — Variações para Teste A/B

| Arquivo | Ângulo | Copy principal |
|---|---|---|
| `anuncio_v1.html` | Quebra de crença | "A estratégia que funcionava aos 30 não funciona mais." |
| `anuncio_v2.html` | Identificação / dor | Bullets de reconhecimento + resolução |
| `anuncio_v3.html` | Curiosidade / revelação | Pergunta suspensa + "A resposta que ninguém te deu." |

### Como exportar os criativos como PNG (1080×1080)

1. Abra o arquivo `.html` no Chrome
2. Pressione `F12` → aba **Device Toolbar** (ícone de celular)
3. Defina resolução manual: **1080 × 1080**
4. Feche o DevTools e tire print da área visível  
   — ou use a extensão **Full Page Screen Capture**
5. Salve como `anuncio_v1.png`, `anuncio_v2.png`, `anuncio_v3.png`

> **Alternativa rápida (Windows):** abra o HTML, use `Win + Shift + S`  
> e selecione exatamente a área do quadrado 1080×1080.

---

## Copy dos Anúncios

### V1 — Quebra de Crença

**Texto principal:**
```
Você não está fazendo nada errado.
O seu corpo mudou — e a estratégia precisa mudar junto.

Na menopausa, a lógica alimentar que funcionava antes
simplesmente para de funcionar. Não é fraqueza.
É biologia.

Este guia explica o que mudou e o que realmente
faz diferença nessa fase. 👇
```

**Título do anúncio:** Por que o seu corpo mudou na menopausa  
**Descrição:** Guia educacional para mulheres que querem entender o próprio corpo  
**CTA:** Saiba mais

---

### V2 — Identificação / Dor

**Texto principal:**
```
Come com cuidado. ✓
Tenta se movimentar. ✓
Evita o que acha que faz mal. ✓

E mesmo assim sente que o corpo
não responde mais como antes?

Não é imaginação sua.
A menopausa muda regras que ninguém
te avisou que iam mudar.

Este guia explica o que está acontecendo
e o que fazer diferente. 👇
```

**Título do anúncio:** Quando você faz tudo certo e o corpo não responde  
**Descrição:** Entenda o que mudou no seu organismo nessa fase  
**CTA:** Saiba mais

---

### V3 — Curiosidade / Revelação

**Texto principal:**
```
Ninguém te contou que na menopausa
o seu metabolismo literalmente muda de comportamento.

Não é falta de disciplina.
Não é falta de esforço.

É uma mudança fisiológica real — e tem uma forma
diferente de lidar com ela.

Este guia educacional explica o porquê
e os 4 pilares que realmente funcionam nessa fase. 👇
```

**Título do anúncio:** A explicação que você nunca recebeu  
**Descrição:** Guia sobre alimentação e bem-estar na menopausa  
**CTA:** Saiba mais

---

## Configuração da Campanha no Meta Ads

### Objetivo de campanha

- **Fase 1 (validação):** Tráfego — menor custo, gera dados rapidamente
- **Fase 2 (escala):** Conversões — após o pixel ter registrado 50+ eventos de compra

### Público-alvo

| Campo | Configuração |
|---|---|
| Localização | Brasil |
| Idade | 45 – 60 anos |
| Gênero | Feminino |
| Interesses | Saúde da mulher · Menopausa · Bem-estar · Alimentação saudável · Qualidade de vida após os 40 · Saúde hormonal |
| Tamanho estimado | Público amplo — deixe o algoritmo otimizar |

> **Recomendação:** criar 1 conjunto de anúncios com os 3 criativos dentro.  
> O Meta vai aprender qual converte melhor e distribuir o orçamento automaticamente.

### Orçamento

| Nível | Valor mínimo |
|---|---|
| Por conjunto de anúncios | R$ 15/dia |
| Abaixo disso | Dados insuficientes para o algoritmo aprender |

Rode pelo menos **7 dias sem pausar** antes de avaliar resultados.

### Posicionamentos (validação inicial)

Desativar e manter apenas:
- ✅ Feed do Facebook
- ✅ Feed do Instagram
- ❌ Audience Network
- ❌ Marketplace
- ❌ Stories / Reels (testar em fase separada)

### Métricas para acompanhar

| Métrica | Meta aceitável |
|---|---|
| CTR (link) | > 1,5% |
| CPC (link) | < R$ 1,50 |
| CPM | < R$ 18 |
| Taxa de conversão na landing | > 2% |

---

## Instalação do Meta Pixel na Landing Page

Adicione o código abaixo **antes de fechar o `</head>`** no `index.html`:

```html
<!-- Meta Pixel — substituir SEU_PIXEL_ID pelo ID real -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'SEU_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript>
  <img height="1" width="1" style="display:none"
       src="https://www.facebook.com/tr?id=SEU_PIXEL_ID&ev=PageView&noscript=1"/>
</noscript>
```

### Rastrear clique no botão de compra

No `index.html`, a função `ctaClick()` já existe. Adicione a linha do pixel dentro dela:

```js
function ctaClick(section) {
    console.log('CTA clicado: ' + section);
    fbq('track', 'InitiateCheckout', { content_name: section }); // ← adicionar esta linha
    window.open(KIWIFY_URL, '_blank', 'noopener');
}
```

> O pixel precisa estar ativo por pelo menos **3–5 dias com tráfego real**  
> antes de migrar o objetivo de campanha para Conversões.

---

## Atenção — Política de Publicidade do Meta (Categoria Especial: Saúde)

**PROIBIDO usar nos criativos:**
- "Emagreça", "perca peso", "queime gordura", "detox"
- Imagens de antes/depois ou implicação de transformação física
- Promessas de resultado específico ("perca X kg em Y semanas")

**PERMITIDO:**
- Linguagem educacional e informativa
- Quebra de crença e curiosidade
- Identificação emocional sem promessa de resultado
- Foco em entendimento do corpo, bem-estar, qualidade de vida
