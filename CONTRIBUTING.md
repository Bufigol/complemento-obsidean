# Contributing to Obsidian AI Assistant Plugin

¡Gracias por tu interés en contribuir al **Obsidian AI Assistant Plugin**! 🎉

Este documento te guiará a través del proceso de contribución. Tu ayuda es invaluable para hacer este plugin aún mejor.

## 📋 Tabla de Contenidos

- [¿Cómo Puedo Contribuir?](#cómo-puedo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Estándares de Código](#estándares-de-código)
- [Testing](#testing)
- [Documentación](#documentación)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Funcionalidades](#solicitar-funcionalidades)
- [Preguntas Frecuentes](#preguntas-frecuentes)

## 🤔 ¿Cómo Puedo Contribuir?

### 🐛 Reportar Bugs
- **Issues**: Crea un issue detallado en GitHub
- **Reproducción**: Incluye pasos para reproducir el bug
- **Contexto**: Proporciona información del sistema y versión

### 💡 Solicitar Funcionalidades
- **Feature Requests**: Describe la funcionalidad deseada
- **Casos de Uso**: Explica por qué sería útil
- **Alternativas**: Menciona si hay soluciones existentes

### 🔧 Contribuir Código
- **Bug Fixes**: Corrige bugs reportados
- **Nuevas Funcionalidades**: Implementa features solicitadas
- **Mejoras**: Optimiza código existente
- **Tests**: Mejora la cobertura de testing

### 📚 Mejorar Documentación
- **README**: Actualiza la documentación principal
- **Guías**: Crea tutoriales y ejemplos
- **Traducciones**: Traduce a otros idiomas
- **API Docs**: Mejora la documentación técnica

### 🧪 Testing y QA
- **Unit Tests**: Escribe tests para nuevas funcionalidades
- **Integration Tests**: Prueba la integración con Obsidian
- **Performance Tests**: Verifica el rendimiento
- **Security Tests**: Identifica vulnerabilidades

## 🛠️ Configuración del Entorno

### Prerrequisitos
- **Node.js**: Versión 18 o superior
- **npm**: Versión 9 o superior
- **Git**: Para control de versiones
- **Obsidian**: Para testing del plugin

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/obsidian-ai-assistant.git
cd obsidian-ai-assistant

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus API keys de prueba
```

### Scripts Disponibles
```bash
# Desarrollo con hot reload
npm run dev

# Build de producción
npm run build

# Ejecutar tests
npm test

# Linting y formateo
npm run lint
npm run format

# Verificar tipos TypeScript
npm run type-check
```

## 🔄 Flujo de Trabajo

### 1. Fork y Clone
```bash
# Fork del repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/Bufigol/obsidian-ai-assistant.git
cd obsidian-ai-assistant

# Agregar el repositorio original como upstream
git remote add upstream https://github.com/Bufigol/obsidian-ai-assistant.git
```

### 2. Crear Rama de Feature
```bash
# Actualizar tu rama principal
git checkout main
git pull upstream main

# Crear rama para tu feature
git checkout -b feature/nombre-de-la-funcionalidad
```

### 3. Desarrollo
- **Código**: Implementa tu funcionalidad
- **Tests**: Escribe tests para tu código
- **Documentación**: Actualiza la documentación
- **Commits**: Usa mensajes descriptivos

### 4. Commit y Push
```bash
# Agregar cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar nueva funcionalidad de búsqueda semántica

- Implementa búsqueda por embeddings
- Agrega tests unitarios
- Actualiza documentación"

# Push a tu fork
git push origin feature/nombre-de-la-funcionalidad
```

### 5. Pull Request
- **Crear PR**: Desde tu fork al repositorio principal
- **Descripción**: Explica qué hace tu PR
- **Tests**: Asegúrate de que todos los tests pasen
- **Review**: Solicita review de otros contribuidores

## 📝 Estándares de Código

### TypeScript
- **Versión**: TypeScript 5.3+
- **Configuración**: Sigue `tsconfig.json`
- **Tipos**: Define interfaces para todas las estructuras de datos
- **Generics**: Usa generics cuando sea apropiado

### React
- **Versión**: React 18.2+
- **Hooks**: Usa hooks funcionales
- **Props**: Define interfaces para props
- **State**: Usa Context API para estado global

### Estilo de Código
```typescript
// ✅ Bueno
interface AIServiceConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
}

class AIService {
  private config: AIServiceConfig;
  
  constructor(config: AIServiceConfig) {
    this.config = config;
  }
  
  async generateResponse(prompt: string): Promise<string> {
    // Implementación
  }
}

// ❌ Evitar
class AIService {
  private config: any; // Sin tipos
  
  constructor(config: any) {
    this.config = config;
  }
}
```

### Convenciones de Naming
- **Variables**: `camelCase` (ej: `apiKey`, `maxTokens`)
- **Constantes**: `UPPER_SNAKE_CASE` (ej: `MAX_RETRY_ATTEMPTS`)
- **Interfaces**: `PascalCase` (ej: `AIServiceConfig`)
- **Archivos**: `kebab-case` (ej: `ai-service.ts`)
- **Componentes**: `PascalCase` (ej: `AIChatPanel.tsx`)

### Comentarios
```typescript
/**
 * Analiza una nota usando IA y genera insights
 * @param note - La nota a analizar
 * @param options - Opciones de análisis
 * @returns Promise con el análisis de la nota
 */
async function analyzeNote(
  note: ObsidianNote, 
  options: AnalysisOptions
): Promise<NoteAnalysis> {
  // Implementación
}
```

## 🧪 Testing

### Cobertura Objetivo
- **Unit Tests**: 90%+ cobertura
- **Integration Tests**: Testing completo con Obsidian
- **Performance Tests**: Para funcionalidades críticas

### Escribir Tests
```typescript
// tests/services/ai-service.test.ts
import { AIService } from '../../src/services/ai-service';

describe('AIService', () => {
  let aiService: AIService;
  
  beforeEach(() => {
    aiService = new AIService({
      apiKey: 'test-key',
      model: 'test-model',
      maxTokens: 1000
    });
  });
  
  describe('generateResponse', () => {
    it('should generate response successfully', async () => {
      const prompt = 'Test prompt';
      const response = await aiService.generateResponse(prompt);
      
      expect(response).toBeDefined();
      expect(typeof response).toBe('string');
    });
    
    it('should handle API errors gracefully', async () => {
      // Test de manejo de errores
    });
  });
});
```

### Ejecutar Tests
```bash
# Todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:coverage

# Tests específicos
npm test -- --grep "AIService"
```

## 📚 Documentación

### Estándares de Documentación
- **README**: Mantén actualizado
- **JSDoc**: Documenta todas las funciones públicas
- **Ejemplos**: Incluye ejemplos de uso
- **Changelog**: Documenta cambios importantes

### Estructura de Documentación
```
docs/
├── prd.md                    # Product Requirements
├── frontend.md               # Frontend Architecture
├── backend.md                # Backend Architecture
├── api.md                    # API Documentation
├── database-schema.md        # Database Schema
├── user-flow.md              # User Flows
├── third-party-libraries.md  # External Libraries
└── project-structure.md      # Project Structure
```

## 🐛 Reportar Bugs

### Template de Bug Report
```markdown
## Descripción del Bug
[Descripción clara y concisa del bug]

## Pasos para Reproducir
1. Ir a '...'
2. Hacer clic en '...'
3. Desplazarse hacia abajo hasta '...'
4. Ver error

## Comportamiento Esperado
[Descripción de lo que debería pasar]

## Comportamiento Actual
[Descripción de lo que está pasando]

## Información del Sistema
- **Obsidian**: [Versión]
- **Plugin**: [Versión]
- **Sistema Operativo**: [Windows/macOS/Linux + versión]
- **Navegador**: [Si aplica]

## Logs de Error
[Logs relevantes, screenshots, etc.]

## Contexto Adicional
[Cualquier otra información que pueda ayudar]
```

## 💡 Solicitar Funcionalidades

### Template de Feature Request
```markdown
## Descripción de la Funcionalidad
[Descripción clara de la funcionalidad deseada]

## Caso de Uso
[Explicar por qué esta funcionalidad sería útil]

## Alternativas Consideradas
[Describir alternativas que has considerado]

## Información Adicional
[Screenshots, mockups, ejemplos, etc.]
```

## ❓ Preguntas Frecuentes

### ¿Necesito experiencia con Obsidian para contribuir?
**No necesariamente**. Aunque es útil, puedes contribuir en áreas como testing, documentación, o mejoras generales del código.

### ¿Qué pasa si mi PR no es aceptado?
**No te desanimes**. Los maintainers te darán feedback constructivo. Usa esa información para mejorar tu contribución.

### ¿Puedo contribuir sin escribir código?
**¡Absolutamente!** Las contribuciones no-código son igual de valiosas:
- Reportar bugs
- Mejorar documentación
- Sugerir funcionalidades
- Ayudar a otros usuarios

### ¿Cómo sé si mi contribución es lo suficientemente buena?
**Cualquier contribución es bienvenida**. Los maintainers te ayudarán a mejorar tu código si es necesario.

## 🎯 Áreas de Contribución Prioritarias

### Alta Prioridad
- **Bug Fixes**: Corrección de errores críticos
- **Performance**: Optimizaciones de rendimiento
- **Security**: Mejoras de seguridad
- **Testing**: Mejorar cobertura de tests

### Media Prioridad
- **Documentation**: Mejorar documentación existente
- **UI/UX**: Mejoras de interfaz de usuario
- **Error Handling**: Mejorar manejo de errores
- **Accessibility**: Mejoras de accesibilidad

### Baja Prioridad
- **New Features**: Funcionalidades adicionales
- **Refactoring**: Mejoras de código
- **Translations**: Soporte para nuevos idiomas
- **Examples**: Ejemplos y tutoriales

## 🤝 Reconocimiento

### Contribuidores
Todos los contribuidores serán reconocidos en:
- **README**: Lista de contribuidores
- **Changelog**: Créditos por contribuciones
- **Releases**: Agradecimientos en releases

### Badges
- **Contributor**: Para contribuciones menores
- **Maintainer**: Para contribuidores regulares
- **Core Team**: Para contribuidores principales

## 📞 Contacto

### Canales de Comunicación
- **GitHub Issues**: [Reportar bugs y solicitar features](https://github.com/Bufigol/obsidian-ai-assistant/issues)
- **GitHub Discussions**: [Discusiones generales](https://github.com/Bufigol/obsidian-ai-assistant/discussions)
- **Pull Requests**: [Contribuir código](https://github.com/Bufigol/obsidian-ai-assistant/pulls)

### Maintainers
- **Lead Developer**: [@Bufigol](https://github.com/Bufigol)
- **Reviewers**: Equipo de code review
- **Community**: Moderadores de la comunidad

---

## 🎉 ¡Gracias por Contribuir!

Tu contribución hace que el **Obsidian AI Assistant Plugin** sea mejor para todos. Cada línea de código, cada bug reportado, y cada sugerencia nos ayuda a crear una herramienta más poderosa para la gestión de conocimiento.

**¡Juntos construimos el futuro de la IA en Obsidian!** 🚀