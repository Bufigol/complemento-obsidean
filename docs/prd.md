# Product Requirements Document (PRD)
## Obsidian AI Assistant Plugin

### 1. App Overview

**Name:** Obsidian AI Assistant  
**Description:** Plugin inteligente que integra IA (Gemini y Claude) con la bóveda de Obsidian para análisis, creación y mejora de notas  
**Tagline:** "Tu asistente de IA personal para maximizar el valor de tu bóveda de conocimiento"

### 2. Target Audience & User Personas

#### Primary Users
- **Desarrolladores Fullstack** que gestionan múltiples proyectos y lógica de negocio
- **Escritores de ciencia ficción** que desarrollan lore y universos complejos
- **Profesionales del conocimiento** que necesitan gestionar información estructurada

#### User Personas

**Persona 1: Desarrollador Fullstack (Tú)**
- **Demographics:** Desarrollador experimentado, usuario avanzado de Obsidian
- **Goals:** Optimizar gestión de proyectos, documentación técnica, y lógica de negocio
- **Pain Points:** Necesita extraer más valor de sus notas, crear conexiones entre conceptos
- **Workflow:** Sistema de carpetas organizado (Inbox, Areas, Proyectos, Recursos, Archivos, Templates)

**Persona 2: Escritor Creativo**
- **Demographics:** Escritor de ciencia ficción, desarrollador de lore
- **Goals:** Crear universos coherentes, desarrollar personajes, mantener consistencia narrativa
- **Pain Points:** Necesita ayuda para expandir conceptos y mantener coherencia en el universo
- **Workflow:** Notas de personajes, lugares, eventos, y conceptos del universo

### 3. Key Features & Prioritization

#### Priority 1 (Crítico)
1. **Lectura y análisis** de notas existentes en la bóveda
2. **Chat con IA** (Claude Code y Gemini) integrado en panel lateral derecho
3. **Creación automática** de nuevas notas según necesidades del usuario

#### Priority 2 (Alto)
4. **Integración con sistema de carpetas** (Inbox, Areas, Proyectos, Recursos, Archivos, Templates)
5. **Edición de notas existentes** para agregar valor
6. **Búsquedas en internet** para ampliar conocimiento (Google, DuckDuckGo, Wikipedia, +3 opciones)

#### Priority 3 (Medio)
7. **Comprensión de contexto** entre diferentes tipos de notas
8. **Sugerencia de enlaces** entre notas relacionadas
9. **Generación de diagramas** y visualizaciones basadas en notas

#### Priority 4 (Bajo)
10. **Configuraciones avanzadas** personalizables
11. **Perfiles de IA** que se adaptan al contexto
12. **Templates de prompts** configurables

### 4. Success Metrics

#### User Engagement
- **Tiempo de uso** del plugin por sesión
- **Frecuencia de uso** del chat con IA
- **Número de notas** creadas/mejoradas por la IA

#### Quality Metrics
- **Precisión de análisis** de la IA
- **Relevancia de sugerencias** automáticas
- **Satisfacción del usuario** con las respuestas de la IA

#### Technical Metrics
- **Performance** con bóvedas grandes (miles de notas)
- **Tiempo de respuesta** de la IA
- **Estabilidad** del plugin

### 5. Assumptions & Risks

#### Assumptions
- **Conexión a internet** siempre disponible
- **APIs de IA** (Gemini, Claude) funcionando correctamente
- **Compatibilidad** con versiones actuales y futuras de Obsidian
- **Usuario técnico** capaz de configurar API keys

#### Risks
- **Costos de API** de Claude Code (mitigación: límites de uso configurables)
- **Cambios en APIs** de IA (mitigación: abstracción de APIs)
- **Performance** con bóvedas muy grandes (mitigación: análisis en segundo plano, cache)
- **Privacidad de datos** (mitigación: control granular, detección de contenido sensible)

### 6. Technical Constraints

#### Obsidian Compatibility
- **Versión mínima:** Obsidian 1.0+
- **Plataforma:** Desktop (Windows, Mac, Linux)
- **Arquitectura:** Plugin nativo de Obsidian

#### API Limitations
- **Rate limits** de APIs de IA
- **Tamaño de contexto** de modelos de IA
- **Costos** de APIs premium

#### Performance Requirements
- **Tiempo de respuesta:** <2 segundos para análisis básicos
- **Uso de memoria:** <100MB para bóvedas estándar
- **Análisis en segundo plano:** Sin impacto en experiencia de escritura

### 7. Future Considerations

#### Phase 2 Features
- **Soporte móvil** para Obsidian Mobile
- **Sincronización** con servicios cloud
- **Visualización de relaciones** entre notas (grafos de conocimiento)
- **Múltiples idiomas** (inglés, francés, alemán)

#### Phase 3 Features
- **Colaboración** entre múltiples usuarios
- **Integración** con otras herramientas de productividad
- **Machine Learning** local para personalización avanzada
- **APIs públicas** para desarrolladores externos
