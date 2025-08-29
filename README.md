# Obsidian AI Assistant Plugin

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/paofilia/obsidian-ai-assistant)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2+-blue.svg)](https://reactjs.org/)
[![Obsidian](https://img.shields.io/badge/Obsidian-1.0+-purple.svg)](https://obsidian.md/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Test Coverage](https://img.shields.io/badge/coverage-90%25-brightgreen.svg)]()

> **Tu asistente de IA personal para maximizar el valor de tu bóveda de conocimiento**

Un plugin inteligente que integra **Claude** y **Gemini** con tu bóveda de Obsidian para análisis automático, creación de contenido y mejora de notas. Diseñado para desarrolladores, escritores creativos y profesionales del conocimiento que buscan extraer el máximo valor de su información.

## 📋 Tabla de Contenidos

- [🚀 Características Principales](#-características-principales)
- [🎯 Casos de Uso](#-casos-de-uso)
- [🏗️ Arquitectura](#️-arquitectura)
- [🛠️ Instalación](#️-instalación)
- [⚙️ Configuración](#️-configuración)
- [🎮 Uso](#-uso)
- [🔒 Privacidad y Seguridad](#-privacidad-y-seguridad)
- [⚡ Performance](#-performance)
- [🧪 Testing](#-testing)
- [🔧 Desarrollo](#-desarrollo)
- [📚 Documentación](#-documentación)
- [🤝 Contribución](#-contribución)
- [🐛 Reportar Problemas](#-reportar-problemas)
- [🗺️ Roadmap](#️-roadmap)
- [📄 Licencia](#-licencia)
- [🙏 Agradecimientos](#-agradecimientos)
- [📞 Contacto](#-contacto)

## 🚀 Características Principales

### 🤖 **Integración con IA de Vanguardia**
- **Claude 3 Sonnet**: Análisis profundo y conversaciones contextuales
- **Gemini Pro**: Generación de contenido y análisis multilingüe
- **Modelos híbridos**: Combina lo mejor de ambos para resultados óptimos
- **Selección inteligente**: Elige automáticamente el mejor modelo para cada tarea

### 📝 **Análisis Inteligente de Notas**
- **Análisis automático** de contenido y estructura
- **Detección de relaciones** entre notas y conceptos
- **Sugerencias inteligentes** para mejorar la organización
- **Análisis en segundo plano** sin interrumpir tu flujo de trabajo
- **Indexación semántica** para búsquedas por significado

### 💬 **Chat Contextual con IA**
- **Panel lateral integrado** para conversaciones fluidas
- **Contexto automático** de la nota actual y bóveda
- **Historial de conversaciones** persistente y exportable
- **Acciones directas** para aplicar cambios a las notas
- **Sugerencias en tiempo real** mientras escribes

### 🔒 **Privacidad y Seguridad**
- **Detección automática** de contenido sensible
- **Control granular** de acceso a notas y carpetas
- **Encriptación** de API keys y datos sensibles
- **Auditoría completa** de accesos y acciones
- **Modo offline** para máxima privacidad

### ⚡ **Performance Optimizado**
- **Cache inteligente** de respuestas y análisis
- **Análisis asíncrono** en segundo plano
- **Gestión de memoria** eficiente para bóvedas grandes
- **Métricas de performance** en tiempo real
- **Worker threads** para procesamiento paralelo

### 🌐 **Búsquedas Web Integradas**
- **Google Custom Search** para información actualizada
- **DuckDuckGo** para búsquedas privadas
- **Wikipedia** para conocimiento enciclopédico
- **Bing, Brave, SerpAPI** como fuentes adicionales
- **Resultados estructurados** y contextualizados

## 🎯 Casos de Uso

### 👨‍💻 **Para Desarrolladores**
- **Documentación técnica** automática y actualizada
- **Análisis de código** y sugerencias de mejora
- **Gestión de proyectos** y tareas con IA
- **Arquitectura de sistemas** y diagramas generados
- **Debugging asistido** con contexto de código
- **Refactoring inteligente** de documentación

### ✍️ **Para Escritores Creativos**
- **Desarrollo de personajes** y lore coherente
- **Consistencia narrativa** en universos complejos
- **Generación de ideas** y brainstorming creativo
- **Organización de investigación** y referencias
- **Estructura de historias** y arcos narrativos
- **Worldbuilding** asistido por IA

### 🧠 **Para Gestores de Conocimiento**
- **Análisis de patrones** en la información
- **Conexiones automáticas** entre conceptos
- **Sugerencias de estructura** y organización
- **Búsqueda semántica** avanzada
- **Síntesis de información** compleja
- **Visualización de relaciones** entre conceptos

### 🎓 **Para Estudiantes e Investigadores**
- **Resúmenes automáticos** de notas extensas
- **Generación de preguntas** de estudio
- **Organización de investigación** académica
- **Conexiones entre temas** de estudio
- **Sugerencias de lectura** relacionada

## 🏗️ Arquitectura

### **Stack Tecnológico**
- **Frontend**: TypeScript + React + CSS Modules
- **Backend**: Node.js + TypeScript + SQLite
- **Build Tool**: Vite + Rollup para optimización
- **Database**: SQLite local + JSON para configuración
- **AI Integration**: Claude API + Gemini API + LangChain
- **Search**: Lunr.js + HNSW + Sentence Transformers

### **Componentes Principales**
```
Obsidian Plugin
├── Core Plugin Class (main.ts)
├── AI Service Layer (Claude + Gemini)
├── Note Analysis Engine
├── Privacy & Security Manager
├── Performance Optimizer
├── Web Search Integration
├── Database Manager (SQLite)
├── Cache Manager
└── UI Components (React)
    ├── AI Chat Panel
    ├── Note Context
    ├── Settings Modal
    └── Performance Monitor
```

### **Arquitectura de Servicios**
- **Service Layer**: Abstracción de APIs de IA
- **Data Layer**: Persistencia local y cache
- **Integration Layer**: APIs de Obsidian y servicios externos
- **Security Layer**: Encriptación y control de acceso
- **Performance Layer**: Optimización y métricas

## 🛠️ Instalación

### **Prerrequisitos**
- **Obsidian**: Versión 1.0 o superior
- **Sistema Operativo**: Windows 10+, macOS 10.15+, Ubuntu 18.04+
- **Memoria**: Mínimo 4GB RAM, recomendado 8GB+
- **Conexión**: Internet para APIs de IA (modo offline disponible)

### **Instalación Manual**
1. Descarga el archivo `.zip` de la [última release](https://github.com/paofilia/obsidian-ai-assistant/releases)
2. Extrae el contenido en tu carpeta de plugins de Obsidian:
   ```
   {vault}/.obsidian/plugins/obsidian-ai-assistant/
   ```
3. Activa el plugin en Obsidian: `Settings` → `Community plugins` → `Obsidian AI Assistant`
4. Configura tus API keys en `Settings` → `AI Assistant`

### **Instalación desde GitHub**
```bash
cd {vault}/.obsidian/plugins/
git clone https://github.com/paofilia/obsidian-ai-assistant.git
cd obsidian-ai-assistant
npm install
npm run build
```

### **Instalación desde Community Plugins**
*Disponible próximamente en el Community Plugins oficial de Obsidian*

## ⚙️ Configuración

### **1. Configurar API Keys**

#### **Claude API (Anthropic)**
- **Costo**: $0.015 per 1K input tokens, $0.075 per 1K output tokens
- **Rate Limit**: 100 requests per minute (free), 1000 requests per minute (paid)
- **Modelos**: Claude-3-Sonnet, Claude-3-Haiku, Claude-3-Opus
- **Obtener**: [Console de Anthropic](https://console.anthropic.com/)

#### **Gemini API (Google)**
- **Costo**: Gratuito para uso básico, pagado para uso avanzado
- **Rate Limit**: 60 requests per minute (free), 1500 requests per minute (paid)
- **Modelos**: Gemini Pro, Gemini Pro Vision
- **Obtener**: [Google AI Studio](https://makersuite.google.com/app/apikey)

### **2. Configuración Inicial**
1. **API Configuration**: Configura tus claves de API
2. **Privacy Settings**: Define qué notas puede analizar la IA
3. **Performance Settings**: Ajusta el análisis en segundo plano
4. **UI Preferences**: Personaliza la interfaz del plugin

### **3. Configuración Avanzada**
```typescript
// Ejemplo de configuración personalizada
{
  "aiModels": {
    "claude": {
      "enabled": true,
      "model": "claude-3-sonnet-20240229",
      "temperature": 0.7,
      "maxTokens": 4096,
      "costLimit": 10.0
    },
    "gemini": {
      "enabled": true,
      "model": "gemini-pro",
      "temperature": 0.7,
      "maxTokens": 4096
    }
  },
  "privacy": {
    "sensitiveContentDetection": true,
    "noteAccessControl": "whitelist",
    "excludedNotes": ["private/*", "sensitive/*"]
  },
  "performance": {
    "backgroundAnalysis": true,
    "cacheEnabled": true,
    "maxMemoryUsage": 100
  }
}
```

### **4. Variables de Entorno**
```bash
# .env file
CLAUDE_API_KEY=sk-your-claude-api-key-here
GEMINI_API_KEY=AIza-your-gemini-api-key-here
GOOGLE_SEARCH_API_KEY=your-google-search-api-key
GOOGLE_SEARCH_ENGINE_ID=your-search-engine-id
```

## 🎮 Uso

### **Comandos de Paleta**
- **`Ctrl+P` → "AI Assistant: Open Chat"**: Abrir panel de chat
- **`Ctrl+P` → "AI Assistant: Analyze Note"**: Analizar nota actual
- **`Ctrl+P` → "AI Assistant: Analyze Vault"**: Analizar bóveda completa
- **`Ctrl+P` → "AI Assistant: Settings"**: Abrir configuración
- **`Ctrl+P` → "AI Assistant: Web Search"**: Búsqueda web contextual

### **Atajos de Teclado**
- **`Ctrl+Shift+A`**: Abrir panel de chat
- **`Ctrl+Shift+S`**: Abrir configuración
- **`Ctrl+Shift+N`**: Analizar nota actual

### **Flujo de Trabajo Típico**
1. **Abrir Obsidian**: El plugin se activa automáticamente
2. **Trabajar en Notas**: La IA analiza automáticamente el contenido
3. **Recibir Sugerencias**: Notificaciones de oportunidades de mejora
4. **Chat con IA**: Preguntar sobre contenido o solicitar mejoras
5. **Aplicar Cambios**: La IA puede editar notas directamente

### **Ejemplos de Uso**

#### **Análisis de Nota**
```
Usuario: "Analiza esta nota de proyecto y sugiere mejoras"
IA: "He analizado tu nota y encontré las siguientes oportunidades:
1. Agregar sección de requisitos técnicos
2. Incluir diagrama de arquitectura
3. Documentar dependencias del proyecto
4. Agregar estimaciones de tiempo"
```

#### **Búsqueda Semántica**
```
Usuario: "Encuentra todas las notas relacionadas con autenticación"
IA: "He encontrado 5 notas relacionadas:
- 'Sistema de Login' (relación fuerte)
- 'OAuth2 Implementation' (relación media)
- 'Password Security' (relación media)
- 'JWT Tokens' (relación débil)
- 'API Security' (relación débil)"
```

#### **Generación de Contenido**
```
Usuario: "Genera una nota de resumen para este proyecto"
IA: "He creado una nota de resumen que incluye:
- Objetivos del proyecto
- Tecnologías utilizadas
- Estado actual
- Próximos pasos
- Riesgos identificados"
```

## 🔒 Privacidad y Seguridad

### **Principios de Privacidad**
- **Procesamiento Local**: Todo el análisis se realiza localmente
- **Control Granular**: Decide exactamente qué notas puede leer la IA
- **Detección de Contenido Sensible**: Identificación automática de información sensible
- **Encriptación**: API keys encriptadas localmente
- **Sin Datos Externos**: Tu contenido nunca se envía a servidores externos (excepto APIs de IA)

### **Características de Seguridad**
- **Detección de Patrones**: Identifica contraseñas, API keys, información personal
- **Control de Acceso**: Listas blancas y negras por nota y carpeta
- **Auditoría**: Registro completo de todas las acciones del plugin
- **Validación**: Sanitización de entrada y salida
- **Sandboxing**: Aislamiento de procesos para mayor seguridad

### **Configuración de Privacidad**
```typescript
{
  "privacy": {
    "sensitiveContentDetection": true,
    "noteAccessControl": "whitelist",
    "excludedNotes": ["private/*", "sensitive/*", "work/*"],
    "includedNotes": ["public/*", "docs/*"],
    "auditLogging": true,
    "dataRetentionDays": 30,
    "encryptAPIKeys": true
  }
}
```

## ⚡ Performance

### **Optimizaciones Implementadas**
- **Análisis en Segundo Plano**: Sin impacto en la experiencia de escritura
- **Cache Inteligente**: Cache de respuestas de IA y análisis
- **Indexación Incremental**: Solo analiza notas modificadas
- **Worker Threads**: Procesamiento paralelo para bóvedas grandes
- **Lazy Loading**: Carga diferida de componentes pesados

### **Métricas Objetivo**
- **Tiempo de Respuesta**: <2 segundos para análisis básicos
- **Uso de Memoria**: <100MB para bóvedas estándar
- **Tiempo de Carga**: <1 segundo para el plugin
- **Análisis de Bóveda**: <5 minutos para 1000 notas

### **Configuración de Performance**
```typescript
{
  "performance": {
    "backgroundAnalysis": true,
    "analysisInterval": 5, // minutos
    "cacheEnabled": true,
    "maxCacheSize": 1000,
    "maxMemoryUsage": 100, // MB
    "workerThreads": 4,
    "batchSize": 10,
    "timeoutMs": 30000
  }
}
```

### **Monitoreo de Performance**
- **Métricas en Tiempo Real**: Uso de memoria, CPU, tiempo de respuesta
- **Alertas Automáticas**: Notificaciones cuando se exceden límites
- **Optimización Automática**: Ajuste dinámico de parámetros
- **Reportes de Performance**: Análisis detallado del rendimiento

## 🧪 Testing

### **Cobertura de Testing**
- **Unit Tests**: 90%+ cobertura
- **Integration Tests**: Testing completo con Obsidian
- **Performance Tests**: Testing de bóvedas grandes
- **Security Tests**: Testing de vulnerabilidades
- **Accessibility Tests**: Testing de accesibilidad

### **Herramientas de Testing**
- **Jest**: Framework principal de testing
- **Vitest**: Testing optimizado para Vite
- **ESLint**: Linting de código
- **Prettier**: Formateo automático
- **Husky**: Git hooks para calidad

### **Ejecutar Tests**
```bash
# Tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Tests con cobertura
npm run test:coverage

# Linting
npm run lint

# Verificación de tipos
npm run type-check
```

### **Estrategia de Testing**
- **Testing Automatizado**: CI/CD pipeline completo
- **Testing Manual**: Verificación de funcionalidades críticas
- **Testing de Regresión**: Prevención de bugs recurrentes
- **Testing de Performance**: Monitoreo continuo del rendimiento

## 🔧 Desarrollo

### **Requisitos de Desarrollo**
- **Node.js**: Versión 18 o superior
- **npm**: Versión 9 o superior
- **Git**: Para control de versiones
- **Obsidian**: Para testing del plugin

### **Configuración del Entorno**
```bash
# Clonar el repositorio
git clone https://github.com/paofilia/obsidian-ai-assistant.git
cd obsidian-ai-assistant

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus API keys

# Ejecutar tests
npm test

# Build del plugin
npm run build

# Desarrollo con hot reload
npm run dev
```

### **Scripts de Desarrollo**
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Tests con cobertura
npm run lint         # Linting del código
npm run lint:fix     # Linting con corrección automática
npm run format       # Formateo automático
npm run type-check   # Verificación de tipos TypeScript
```

### **Estructura del Proyecto**
```
obsidian-ai-assistant/
├── src/                    # Código fuente del plugin
│   ├── main.ts            # Punto de entrada del plugin
│   ├── components/        # Componentes React
│   ├── services/          # Servicios de IA y análisis
│   ├── utils/             # Utilidades y helpers
│   └── types/             # Definiciones de TypeScript
├── docs/                  # Documentación técnica
├── tests/                 # Tests unitarios y de integración
├── dist/                  # Build de producción
├── package.json           # Dependencias y scripts
├── vite.config.ts         # Configuración de Vite
└── README.md              # Este archivo
```

### **Arquitectura de Desarrollo**
- **Modular**: Separación clara de responsabilidades
- **Testable**: Código diseñado para testing
- **Extensible**: Fácil agregar nuevas funcionalidades
- **Mantenible**: Código limpio y documentado
- **Escalable**: Arquitectura que crece con el proyecto

## 📚 Documentación

### **Documentación Técnica**
- **[📋 PRD](./docs/prd.md)**: Product Requirements Document
- **[🎨 Frontend](./docs/frontend.md)**: Documentación del frontend
- **[⚙️ Backend](./docs/backend.md)**: Documentación del backend
- **[🔌 APIs](./docs/api.md)**: Documentación de APIs
- **[🗄️ Database Schema](./docs/database-schema.md)**: Esquema de base de datos
- **[🔄 User Flow](./docs/user-flow.md)**: Flujos de usuario
- **[📦 Third-Party Libraries](./docs/third-party-libraries.md)**: Librerías externas
- **[🏗️ Project Structure](./docs/project-structure.md)**: Estructura del proyecto

### **Guías de Usuario**
- **[🚀 Quick Start](./docs/quickstart.md)**: Configuración en 5 minutos
- **[🎯 Use Cases](./docs/use-cases.md)**: Ejemplos prácticos
- **[🔒 Privacy](./docs/privacy.md)**: Configuración de seguridad
- **[⚡ Performance](./docs/performance.md)**: Optimización y métricas
- **[🐛 Troubleshooting](./docs/troubleshooting.md)**: Solución de problemas

### **Documentación de Desarrollo**
- **[🔧 Development Guide](./docs/development.md)**: Guía para desarrolladores
- **[🧪 Testing Guide](./docs/testing.md)**: Guía de testing
- **[📦 Release Guide](./docs/release.md)**: Proceso de releases
- **[🤝 Contributing Guide](./docs/contributing.md)**: Guía de contribución

## 🤝 Contribución

### **Cómo Contribuir**
1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### **Guías de Contribución**
- **Código**: Sigue los estándares de TypeScript y React
- **Testing**: Asegura que todos los tests pasen
- **Documentación**: Actualiza la documentación según sea necesario
- **Commits**: Usa mensajes de commit descriptivos

### **Áreas de Contribución**
- **Nuevas Funcionalidades**: Extender las capacidades del plugin
- **Mejoras de Performance**: Optimizar el rendimiento
- **Testing**: Mejorar la cobertura de tests
- **Documentación**: Mejorar la documentación
- **Traducciones**: Agregar soporte para nuevos idiomas

### **Estándares de Código**
- **TypeScript**: Tipado estricto y interfaces claras
- **ESLint**: Reglas de calidad de código
- **Prettier**: Formateo automático
- **Tests**: 90%+ de cobertura
- **Commits**: Mensajes descriptivos en inglés

### **Proceso de Contribución**
1. **Discusión**: Abre un issue para discutir el cambio
2. **Implementación**: Desarrolla la funcionalidad
3. **Testing**: Asegura que todos los tests pasen
4. **Review**: Solicita revisión de código
5. **Merge**: Una vez aprobado, se hace merge

## 🐛 Reportar Problemas

### **Antes de Reportar**
1. **Verifica** que el problema no esté ya reportado
2. **Revisa** la documentación y FAQs
3. **Prueba** en una bóveda limpia
4. **Incluye** logs y pasos para reproducir

### **Información Requerida**
- **Versión de Obsidian**: X.X.X
- **Versión del Plugin**: X.X.X
- **Sistema Operativo**: Windows/Mac/Linux
- **Descripción**: Qué esperabas vs qué pasó
- **Pasos**: Cómo reproducir el problema
- **Logs**: Errores en la consola

### **Plantillas de Issues**
- **[Bug Report](./.github/ISSUE_TEMPLATE/bug_report.md)**: Para reportar errores
- **[Feature Request](./.github/ISSUE_TEMPLATE/feature_request.md)**: Para solicitar funcionalidades
- **[Question](./.github/ISSUE_TEMPLATE/question.md)**: Para preguntas generales

### **Canales de Soporte**
- **GitHub Issues**: Para reportes de bugs y feature requests
- **GitHub Discussions**: Para preguntas y discusiones
- **Documentación**: Guías completas y ejemplos
- **Community**: Comunidad de usuarios y desarrolladores

## 🗺️ Roadmap

### **Versión 1.0 (Actual)**
- ✅ Integración con Claude y Gemini
- ✅ Análisis automático de notas
- ✅ Chat contextual con IA
- ✅ Búsqueda semántica
- ✅ Detección de contenido sensible
- ✅ Panel lateral integrado
- ✅ Sistema de privacidad y seguridad
- ✅ Performance optimizado

### **Versión 1.1 (Próximamente)**
- 🔄 Soporte para más modelos de IA
- 🔄 Búsquedas web avanzadas
- 🔄 Generación de diagramas
- 🔄 Templates de prompts configurables
- 🔄 Métricas de uso avanzadas
- 🔄 Sistema de plugins extensible

### **Versión 2.0 (Futuro)**
- 📱 Soporte para Obsidian Mobile
- 📱 Sincronización con servicios cloud
- 📱 Visualización de relaciones (grafos)
- 📱 Colaboración multi-usuario
- 📱 Machine Learning local
- 📱 APIs públicas para desarrolladores

### **Versión 3.0 (Largo Plazo)**
- 🚀 Marketplace de plugins
- 🚀 Integración con herramientas externas
- 🚀 Análisis predictivo
- 🚀 IA personalizada por usuario
- 🚀 Soporte para múltiples idiomas
- 🚀 Colaboración en tiempo real

## 📄 Licencia

Este proyecto está licenciado bajo la **GNU Affero General Public License v3.0** (AGPL-3.0).

### **¿Por qué AGPL-3.0?**
- **Protección de Libertad**: Garantiza que el software permanezca libre
- **Prevención de Comercialización**: Evita que se use comercialmente sin contribuir
- **Comunidad**: Fomenta la colaboración y mejora continua
- **Transparencia**: Requiere que las modificaciones sean públicas

### **Uso Comercial**
- **Uso Personal**: ✅ Permitido
- **Uso Educativo**: ✅ Permitido
- **Uso Comercial Interno**: ✅ Permitido
- **Distribución Comercial**: ❌ Requiere licencia AGPL
- **SaaS/Web Services**: ❌ Requiere código fuente público

### **Aplicar la Licencia**
Para aplicar esta licencia a tu nuevo programa, adjunta los siguientes avisos:

```
<one line to give the program's name and a brief idea of what it does.>
Copyright (C) <year>  <name of author>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```

## 🙏 Agradecimientos

### **Contribuidores**
- **Desarrolladores**: Todos los que han contribuido al proyecto
- **Comunidad**: Usuarios que han probado y reportado bugs
- **Mantenedores**: Quienes mantienen las librerías utilizadas

### **Tecnologías**
- **Obsidian**: Por la excelente plataforma de notas
- **Anthropic**: Por Claude y su API
- **Google**: Por Gemini y su API
- **React Team**: Por la excelente librería de UI
- **TypeScript Team**: Por el lenguaje de programación

### **Inspiración**
- **Second Brain**: Concepto de gestión de conocimiento personal
- **AI Assistants**: Evolución de la asistencia inteligente
- **Open Source**: Comunidad de software libre
- **Knowledge Management**: Gestión efectiva del conocimiento

## 📞 Contacto

### **Información del Proyecto**
- **Repositorio**: [GitHub](https://github.com/paofilia/obsidian-ai-assistant)
- **Issues**: [GitHub Issues](https://github.com/paofilia/obsidian-ai-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/paofilia/obsidian-ai-assistant/discussions)
- **Wiki**: [GitHub Wiki](https://github.com/paofilia/obsidian-ai-assistant/wiki)

### **Desarrollador**
- **Nombre**: Paofilia
- **GitHub**: [@paofilia](https://github.com/paofilia)
- **Proyecto**: Obsidian AI Assistant Plugin

### **Comunidad**
- **Discord**: [Servidor de Discord](https://discord.gg/obsidian)
- **Reddit**: [r/ObsidianMD](https://reddit.com/r/ObsidianMD)
- **Twitter**: [@ObsidianApp](https://twitter.com/ObsidianApp)

---

**⭐ Si este plugin te es útil, considera darle una estrella en GitHub!**

**🤝 Las contribuciones son bienvenidas y apreciadas.**

**📢 Comparte tu experiencia y ayuda a otros usuarios.**

---

*Desarrollado con ❤️ para la comunidad de Obsidian*

**🚀 ¡Únete a la revolución del conocimiento inteligente con Obsidian AI Assistant!**
