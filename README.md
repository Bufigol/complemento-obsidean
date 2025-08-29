# Obsidian AI Assistant Plugin

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Obsidian](https://img.shields.io/badge/Obsidian-Plugin-green.svg)](https://obsidian.md/)

> Tu asistente de IA personal para maximizar el valor de tu bóveda de conocimiento

## 🚀 Descripción

**Obsidian AI Assistant** es un plugin inteligente que integra modelos de IA avanzados (Claude y Gemini) con tu bóveda de Obsidian. El plugin analiza automáticamente tus notas, proporciona sugerencias inteligentes, y te permite interactuar con tu conocimiento a través de un chat contextual.

### ✨ Características Principales

- 🤖 **IA Inteligente**: Integración con Claude Code y Gemini
- 📚 **Análisis Automático**: Análisis en segundo plano de toda tu bóveda
- 🔍 **Búsqueda Semántica**: Búsqueda por significado, no solo texto
- 💬 **Chat Contextual**: Chat inteligente que entiende el contexto de tus notas
- 🔗 **Relaciones Inteligentes**: Descubre conexiones entre tus notas
- 🛡️ **Privacidad Total**: Todo se procesa localmente, control granular de acceso
- 🌐 **Búsquedas Web**: Integración con Google, DuckDuckGo, Wikipedia y más
- 📊 **Métricas de Performance**: Monitoreo en tiempo real del rendimiento

## 🎯 Casos de Uso

### 👨‍💻 Desarrolladores
- **Gestión de Proyectos**: Análisis automático de documentación técnica
- **Lógica de Negocio**: Sugerencias de mejora y optimización
- **Arquitectura**: Descubrimiento de patrones y relaciones
- **Documentación**: Generación automática de documentación

### ✍️ Escritores Creativos
- **Desarrollo de Lore**: Expansión de universos y personajes
- **Consistencia Narrativa**: Mantenimiento de coherencia en historias
- **Investigación**: Búsqueda automática de información relacionada
- **Organización**: Sugerencias de estructura y organización

### 🧠 Profesionales del Conocimiento
- **Gestión de Información**: Análisis automático de contenido
- **Descubrimiento de Patrones**: Identificación de conexiones ocultas
- **Optimización de Flujos**: Mejora de procesos de trabajo
- **Colaboración**: Compartir insights y conocimiento

## 🏗️ Arquitectura

### Stack Tecnológico
- **Frontend**: TypeScript + React + CSS Modules
- **Backend**: Node.js + TypeScript
- **Build Tool**: Vite + Rollup
- **Database**: SQLite + JSON files
- **AI Integration**: Claude API + Gemini API
- **Search**: Lunr.js + HNSW + Sentence Transformers

### Componentes Principales
```
Obsidian Plugin
├── Core Plugin Class
├── AI Service Layer (Claude + Gemini)
├── Note Analysis Engine
├── Privacy & Security Manager
├── Performance Optimizer
├── Web Search Integration
└── UI Components (React)
```

## 📦 Instalación

### Prerrequisitos
- **Obsidian**: Versión 1.0 o superior
- **Sistema Operativo**: Windows 10+, macOS 10.15+, Ubuntu 18.04+
- **Memoria**: Mínimo 4GB RAM, recomendado 8GB+
- **Conexión**: Internet para APIs de IA

### Instalación Manual
1. Descarga el archivo `.zip` del plugin
2. Extrae el contenido en `.obsidian/plugins/ai-assistant/`
3. Activa el plugin en Obsidian
4. Configura tus API keys de Claude y/o Gemini
5. ¡Listo para usar!

### Instalación desde Community Plugins
*Disponible próximamente en el Community Plugins oficial de Obsidian*

## ⚙️ Configuración

### API Keys
El plugin requiere al menos una de las siguientes API keys:

#### Claude API (Anthropic)
- **Costo**: $0.015 per 1K input tokens, $0.075 per 1K output tokens
- **Rate Limit**: 100 requests per minute (free), 1000 requests per minute (paid)
- **Modelos**: Claude-3-Sonnet, Claude-3-Haiku, Claude-3-Opus

#### Gemini API (Google)
- **Costo**: Gratuito para uso básico
- **Rate Limit**: 60 requests per minute (free), 1500 requests per minute (paid)
- **Modelos**: Gemini Pro, Gemini Pro Vision

### Configuración Inicial
1. **API Configuration**: Configura tus claves de API
2. **Privacy Settings**: Define qué notas puede analizar la IA
3. **Performance Settings**: Ajusta el análisis en segundo plano
4. **UI Preferences**: Personaliza la interfaz del plugin

## 🚀 Uso

### Comandos Principales
- **`Ctrl+P` → "AI Assistant: Open Chat"**: Abrir panel de chat
- **`Ctrl+P` → "AI Assistant: Analyze Note"**: Analizar nota actual
- **`Ctrl+P` → "AI Assistant: Analyze Vault"**: Analizar bóveda completa
- **`Ctrl+P` → "AI Assistant: Settings"**: Abrir configuración

### Flujo de Trabajo Típico
1. **Abrir Obsidian**: El plugin se activa automáticamente
2. **Trabajar en Notas**: La IA analiza automáticamente el contenido
3. **Recibir Sugerencias**: Notificaciones de oportunidades de mejora
4. **Chat con IA**: Preguntar sobre contenido o solicitar mejoras
5. **Aplicar Cambios**: La IA puede editar notas directamente

### Ejemplos de Uso

#### Análisis de Nota
```
Usuario: "Analiza esta nota de proyecto y sugiere mejoras"
IA: "He analizado tu nota y encontré las siguientes oportunidades:
1. Agregar sección de requisitos técnicos
2. Incluir diagrama de arquitectura
3. Documentar dependencias del proyecto
4. Agregar estimaciones de tiempo"
```

#### Búsqueda Semántica
```
Usuario: "Encuentra todas las notas relacionadas con autenticación"
IA: "He encontrado 5 notas relacionadas:
- 'Sistema de Login' (relación fuerte)
- 'OAuth2 Implementation' (relación media)
- 'Password Security' (relación media)
- 'JWT Tokens' (relación débil)
- 'API Security' (relación débil)"
```

#### Generación de Contenido
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

### Principios de Privacidad
- **Procesamiento Local**: Todo el análisis se realiza localmente
- **Control Granular**: Decide exactamente qué notas puede leer la IA
- **Detección de Contenido Sensible**: Identificación automática de información sensible
- **Encriptación**: API keys encriptadas localmente
- **Sin Datos Externos**: Tu contenido nunca se envía a servidores externos (excepto APIs de IA)

### Características de Seguridad
- **Detección de Patrones**: Identifica contraseñas, API keys, información personal
- **Control de Acceso**: Listas blancas y negras por nota y carpeta
- **Auditoría**: Registro completo de todas las acciones del plugin
- **Validación**: Sanitización de entrada y salida
- **Sandboxing**: Aislamiento de procesos para mayor seguridad

## 📊 Performance

### Optimizaciones
- **Análisis en Segundo Plano**: Sin impacto en la experiencia de escritura
- **Cache Inteligente**: Cache de respuestas de IA y análisis
- **Indexación Incremental**: Solo analiza notas modificadas
- **Worker Threads**: Procesamiento paralelo para bóvedas grandes
- **Lazy Loading**: Carga diferida de componentes pesados

### Métricas Objetivo
- **Tiempo de Respuesta**: <2 segundos para análisis básicos
- **Uso de Memoria**: <100MB para bóvedas estándar
- **Tiempo de Carga**: <1 segundo para el plugin
- **Análisis de Bóveda**: <5 minutos para 1000 notas

## 🧪 Testing

### Cobertura de Testing
- **Unit Tests**: 90%+ cobertura
- **Integration Tests**: Testing completo con Obsidian
- **Performance Tests**: Testing de bóvedas grandes
- **Security Tests**: Testing de vulnerabilidades
- **Accessibility Tests**: Testing de accesibilidad

### Herramientas de Testing
- **Jest**: Framework principal de testing
- **Vitest**: Testing optimizado para Vite
- **ESLint**: Linting de código
- **Prettier**: Formateo automático
- **Husky**: Git hooks para calidad

## 🛠️ Desarrollo

### Requisitos de Desarrollo
- **Node.js**: Versión 18 o superior
- **npm**: Versión 9 o superior
- **Git**: Para control de versiones
- **Obsidian**: Para testing del plugin

### Configuración del Entorno
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/obsidian-ai-assistant.git
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

### Estructura del Proyecto
```
obsidian-ai-assistant/
├── src/
│   ├── main.ts                 # Punto de entrada del plugin
│   ├── components/             # Componentes React
│   ├── services/               # Servicios de IA y análisis
│   ├── utils/                  # Utilidades y helpers
│   └── types/                  # Definiciones de TypeScript
├── docs/                       # Documentación técnica
├── tests/                      # Tests unitarios y de integración
├── dist/                       # Build de producción
├── package.json                # Dependencias y scripts
├── vite.config.ts              # Configuración de Vite
└── README.md                   # Este archivo
```

## 📚 Documentación

### Documentación Técnica
- **[PRD](./docs/prd.md)**: Product Requirements Document
- **[Frontend](./docs/frontend.md)**: Documentación del frontend
- **[Backend](./docs/backend.md)**: Documentación del backend
- **[API](./docs/api.md)**: Documentación de APIs
- **[Database Schema](./docs/database-schema.md)**: Esquema de base de datos
- **[User Flow](./docs/user-flow.md)**: Flujos de usuario
- **[Third-Party Libraries](./docs/third-party-libraries.md)**: Librerías externas

### Guías de Usuario
- **[Guía de Inicio Rápido](./docs/quickstart.md)**: Configuración en 5 minutos
- **[Manual de Usuario](./docs/user-manual.md)**: Guía completa de funcionalidades
- **[FAQ](./docs/faq.md)**: Preguntas frecuentes
- **[Troubleshooting](./docs/troubleshooting.md)**: Solución de problemas

## 🤝 Contribución

### Cómo Contribuir
1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Guías de Contribución
- **Código**: Sigue los estándares de TypeScript y React
- **Testing**: Asegura que todos los tests pasen
- **Documentación**: Actualiza la documentación según sea necesario
- **Commits**: Usa mensajes de commit descriptivos

### Áreas de Contribución
- **Nuevas Funcionalidades**: Extender las capacidades del plugin
- **Mejoras de Performance**: Optimizar el rendimiento
- **Testing**: Mejorar la cobertura de tests
- **Documentación**: Mejorar la documentación
- **Traducciones**: Agregar soporte para nuevos idiomas

## 📄 Licencia

Este proyecto está licenciado bajo la **GNU Affero General Public License v3.0** (AGPL-3.0).

### ¿Por qué AGPL-3.0?
- **Protección de Libertad**: Garantiza que el software permanezca libre
- **Prevención de Comercialización**: Evita que se use comercialmente sin contribuir
- **Comunidad**: Fomenta la colaboración y mejora continua
- **Transparencia**: Requiere que las modificaciones sean públicas

### Uso Comercial
- **Uso Personal**: ✅ Permitido
- **Uso Educativo**: ✅ Permitido
- **Uso Comercial Interno**: ✅ Permitido
- **Distribución Comercial**: ❌ Requiere licencia AGPL
- **SaaS/Web Services**: ❌ Requiere código fuente público

## 🆘 Soporte

### Canales de Soporte
- **GitHub Issues**: Para reportes de bugs y feature requests
- **GitHub Discussions**: Para preguntas y discusiones
- **Documentación**: Guías completas y ejemplos
- **Community**: Comunidad de usuarios y desarrolladores

### Reportar Bugs
Al reportar un bug, incluye:
- **Versión de Obsidian**: Versión exacta
- **Versión del Plugin**: Versión del plugin
- **Sistema Operativo**: Windows/macOS/Linux y versión
- **Pasos para Reproducir**: Instrucciones detalladas
- **Comportamiento Esperado**: Qué debería pasar
- **Comportamiento Actual**: Qué está pasando
- **Logs**: Logs de error si están disponibles

## 🗺️ Roadmap

### Versión 1.0 (Actual)
- ✅ Integración con Claude y Gemini
- ✅ Análisis automático de notas
- ✅ Chat contextual con IA
- ✅ Búsqueda semántica
- ✅ Detección de contenido sensible
- ✅ Panel lateral integrado

### Versión 1.1 (Próximamente)
- 🔄 Soporte para más modelos de IA
- 🔄 Búsquedas web avanzadas
- 🔄 Generación de diagramas
- 🔄 Templates de prompts configurables
- 🔄 Métricas de uso avanzadas

### Versión 2.0 (Futuro)
- 📱 Soporte para Obsidian Mobile
- 📱 Sincronización con servicios cloud
- 📱 Visualización de relaciones (grafos)
- 📱 Colaboración multi-usuario
- 📱 Machine Learning local

### Versión 3.0 (Largo Plazo)
- 🚀 APIs públicas para desarrolladores
- 🚀 Marketplace de plugins
- 🚀 Integración con herramientas externas
- 🚀 Análisis predictivo
- 🚀 IA personalizada por usuario

## 🙏 Agradecimientos

### Contribuidores
- **Desarrolladores**: Todos los que han contribuido al proyecto
- **Comunidad**: Usuarios que han probado y reportado bugs
- **Mantenedores**: Quienes mantienen las librerías utilizadas

### Tecnologías
- **Obsidian**: Por la excelente plataforma de notas
- **Anthropic**: Por Claude y su API
- **Google**: Por Gemini y su API
- **React Team**: Por la excelente librería de UI
- **TypeScript Team**: Por el lenguaje de programación

### Inspiración
- **Second Brain**: Concepto de gestión de conocimiento personal
- **AI Assistants**: Evolución de la asistencia inteligente
- **Open Source**: Comunidad de software libre
- **Knowledge Management**: Gestión efectiva del conocimiento

## 📞 Contacto

### Información del Proyecto
- **Repositorio**: [GitHub](https://github.com/tu-usuario/obsidian-ai-assistant)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/obsidian-ai-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tu-usuario/obsidian-ai-assistant/discussions)
- **Wiki**: [GitHub Wiki](https://github.com/tu-usuario/obsidian-ai-assistant/wiki)

### Desarrollador
- **Nombre**: Tu Nombre
- **GitHub**: [@tu-usuario](https://github.com/tu-usuario)
- **Email**: tu-email@ejemplo.com
- **Website**: [tu-website.com](https://tu-website.com)

### Comunidad
- **Discord**: [Servidor de Discord](https://discord.gg/tu-servidor)
- **Reddit**: [r/ObsidianMD](https://reddit.com/r/ObsidianMD)
- **Twitter**: [@tu-usuario](https://twitter.com/tu-usuario)

---

**⭐ Si este plugin te es útil, considera darle una estrella en GitHub!**

**🤝 Las contribuciones son bienvenidas y apreciadas.**

**📢 Comparte tu experiencia y ayuda a otros usuarios.**

---

*Desarrollado con ❤️ para la comunidad de Obsidian*
