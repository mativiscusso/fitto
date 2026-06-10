# Fitto 🍽️

App de recetas saludables personalizadas según tu objetivo de salud. Elegí qué querés mejorar (colesterol, triglicéridos, glucosa, presión) y te genera una receta apta.

## Tech Stack

- **Next.js 15** (App Router)
- **Vercel AI SDK** + **Groq** (generación de recetas con IA - gratuito)
- **CSS nativo** (sin frameworks)
- **PWA** (mobile first, instalable)

## Requisitos

- Node.js 18+
- Una API key de [Groq](https://console.groq.com) (gratis)

## Setup local

```bash
# 1. Clonar el repo
git clone <tu-repo-url>
cd fitto

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env con tu API key de Groq
cp .env.example .env
# Editar .env y agregar: GROQ_API_KEY=tu_api_key

# 4. Levantar dev server
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000)

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `GROQ_API_KEY` | API key de Groq (gratis en console.groq.com) |
| `UNSPLASH_ACCESS_KEY` | API key de Unsplash (gratis en unsplash.com/developers) para imágenes de ingredientes |

## Deploy en Vercel

1. Crear proyecto en Vercel
2. Linking el repo de GitHub
3. Agregar variables de entorno `GROQ_API_KEY` y `UNSPLASH_ACCESS_KEY`
4. Deploy!

## Cómo funciona

1. **Pantalla 1**: Seleccionás tu objetivo de salud y el tipo de comida
2. **Pantalla 2**: Te genera una receta con ingredientes, calorías e instrucciones
3. **Botones**:
   - 🔄 "Otra" → genera otra receta
   - "cambiar" en ingrediente → lo sustituye por una alternativa
   - ✓ "Me sirve" → confirmación

## Modelo de IA

Usa `llama-3.3-70b-versatile` de Groq. Es rápido, barato (gratis hasta 14k tokens/min) y muy capaz para generar recetas estructuradas en JSON.

## Estructura del proyecto

```
fitto/
├── src/
│   └── app/
│       ├── api/
│       │   └── recommend/
│       │       └── route.ts    # Endpoint de generación con IA
│       ├── globals.css         # Estilos CSS nativos
│       ├── layout.tsx          # Layout principal + PWA meta
│       └── page.tsx            # UI de las 2 pantallas
├── types/
│   └── recipe.ts               # Tipos y constantes
├── .env.example
├── README.md
└── package.json
```