# Frontend Documentation
## Obsidian AI Assistant Plugin

### 1. UI Framework & Architecture

#### Framework Selection
- **Framework:** TypeScript + React (compatible con Obsidian)
- **Build Tool:** Vite (más robusto y moderno)
- **Styling:** CSS Modules + CSS Variables (integración nativa con Obsidian)

#### Obsidian Integration
- **Plugin Type:** Plugin nativo de Obsidian
- **UI Components:** Extensión de la interfaz nativa de Obsidian
- **Theme Support:** Compatible con temas claros y oscuros de Obsidian

### 2. UI Library & Components

#### Core Components

**1. AI Chat Panel (Panel Lateral Derecho)**
```typescript
interface AIChatPanel {
  isOpen: boolean;
  currentConversation: Conversation;
  aiModels: AIModel[];
  settings: ChatSettings;
}
```

**2. Chat Interface**
```typescript
interface ChatInterface {
  messages: ChatMessage[];
  inputField: string;
  sendButton: boolean;
  modelSelector: AIModel;
  contextIndicator: boolean;
}
```

**3. Note Context Display**
```typescript
interface NoteContext {
  currentNote: ObsidianNote;
  relatedNotes: ObsidianNote[];
  aiSuggestions: AISuggestion[];
  actionButtons: ActionButton[];
}
```

**4. Settings Modal**
```typescript
interface SettingsModal {
  apiKeys: APIKeyConfig;
  privacySettings: PrivacySettings;
  aiPreferences: AIPreferences;
  performanceSettings: PerformanceSettings;
}
```

### 3. Navigation & Layout

#### Panel Layout
- **Panel Lateral Derecho:** Chat principal con IA
- **Header:** Selector de modelo IA, estado de conexión, configuración
- **Chat Area:** Historial de mensajes, input de usuario
- **Context Panel:** Información de la nota actual y sugerencias
- **Footer:** Controles de privacidad, exportar conversación

#### Navigation Structure
```
AI Assistant Panel
├── Header
│   ├── Model Selector (Claude/Gemini)
│   ├── Connection Status
│   └── Settings Button
├── Chat Area
│   ├── Message History
│   ├── User Input
│   └── Send Button
├── Context Panel
│   ├── Current Note Info
│   ├── AI Suggestions
│   └── Action Buttons
└── Footer
    ├── Privacy Controls
    ├── Export Chat
    └── Help
```

### 4. Styling & Theming

#### CSS Architecture
```css
/* Variables de tema de Obsidian */
:root {
  --ai-primary: var(--interactive-accent);
  --ai-secondary: var(--interactive-normal);
  --ai-background: var(--background-primary);
  --ai-text: var(--text-normal);
  --ai-border: var(--background-modifier-border);
}

/* Componentes del plugin */
.ai-chat-panel {
  background: var(--ai-background);
  border-left: 1px solid var(--ai-border);
  color: var(--ai-text);
}
```

#### Responsive Design
- **Desktop:** Panel lateral completo con todas las funcionalidades
- **Tablet:** Panel adaptativo con controles optimizados
- **Mobile:** Solo funcionalidades esenciales (futuro)

### 5. Forms & User Input

#### Chat Input Form
```typescript
interface ChatInputForm {
  message: string;
  attachments: File[];
  context: NoteContext;
  aiModel: AIModel;
  privacyLevel: PrivacyLevel;
}
```

#### Settings Forms
```typescript
interface APIKeyForm {
  claudeKey: string;
  geminiKey: string;
  encryption: boolean;
}

interface PrivacyForm {
  sensitiveContentDetection: boolean;
  noteAccessControl: NoteAccessLevel[];
  exportSettings: ExportOptions;
}
```

### 6. State Management

#### Local State (Component Level)
```typescript
// Estado del chat
const [messages, setMessages] = useState<ChatMessage[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(false);
const [currentModel, setCurrentModel] = useState<AIModel>('claude');

// Estado de la nota actual
const [currentNote, setCurrentNote] = useState<ObsidianNote | null>(null);
const [noteContext, setNoteContext] = useState<NoteContext | null>(null);
```

#### Global State (Plugin Level)
```typescript
interface PluginState {
  settings: PluginSettings;
  conversations: ConversationHistory;
  aiModels: AIModelConfig[];
  privacySettings: PrivacySettings;
  performanceMetrics: PerformanceData;
}
```

#### State Persistence
```typescript
// Persistencia en Obsidian
class StateManager {
  async saveSettings(settings: PluginSettings): Promise<void>;
  async loadSettings(): Promise<PluginSettings>;
  async saveConversation(conversation: Conversation): Promise<void>;
  async loadConversationHistory(): Promise<Conversation[]>;
}
```

### 7. Key Components & Functionality

#### AI Chat Component
```typescript
class AIChatComponent extends React.Component<AIChatProps, AIChatState> {
  // Funcionalidades principales
  sendMessage(message: string): Promise<void>;
  receiveAIResponse(response: AIResponse): void;
  handleContextChange(note: ObsidianNote): void;
  exportConversation(): void;
}
```

#### Note Context Component
```typescript
class NoteContextComponent extends React.Component<NoteContextProps, NoteContextState> {
  // Funcionalidades de contexto
  displayNoteInfo(note: ObsidianNote): void;
  showAISuggestions(suggestions: AISuggestion[]): void;
  handleNoteAction(action: NoteAction): void;
  updateNoteContent(content: string): void;
}
```

#### Settings Component
```typescript
class SettingsComponent extends React.Component<SettingsProps, SettingsState> {
  // Funcionalidades de configuración
  updateAPIKeys(keys: APIKeyConfig): void;
  updatePrivacySettings(settings: PrivacySettings): void;
  updateAIPreferences(preferences: AIPreferences): void;
  testAPIConnection(): Promise<boolean>;
}
```

### 8. User Experience Features

#### Auto-Suggestions
- **Sugerencias automáticas** basadas en contexto de la nota
- **Indicadores visuales** de cuando la IA está analizando
- **Notificaciones** de oportunidades de mejora

#### Contextual Awareness
- **Detección automática** del tipo de nota (desarrollo, escritura, etc.)
- **Adaptación de respuestas** según el contexto
- **Sugerencias relevantes** basadas en el contenido actual

#### Accessibility
- **Navegación por teclado** completa
- **Screen reader support** para usuarios con discapacidad visual
- **Contraste y legibilidad** optimizados para todos los temas

### 9. Performance Optimization

#### Lazy Loading
```typescript
// Carga diferida de componentes pesados
const AIChatPanel = lazy(() => import('./AIChatPanel'));
const SettingsModal = lazy(() => import('./SettingsModal'));
```

#### Memoization
```typescript
// Memoización de componentes costosos
const MemoizedNoteContext = memo(NoteContextComponent);
const MemoizedChatHistory = memo(ChatHistoryComponent);
```

#### Virtual Scrolling
```typescript
// Scroll virtual para historial de chat largo
const VirtualizedChatHistory = memo(({ messages }: ChatHistoryProps) => {
  return (
    <FixedSizeList
      height={400}
      itemCount={messages.length}
      itemSize={60}
      itemData={messages}
    >
      {ChatMessageRow}
    </FixedSizeList>
  );
});
```

### 10. Integration Points

#### Obsidian API Integration
```typescript
// Integración con APIs nativas de Obsidian
class ObsidianIntegration {
  getCurrentNote(): ObsidianNote | null;
  updateNoteContent(note: ObsidianNote, content: string): Promise<void>;
  createNewNote(title: string, content: string, folder: string): Promise<ObsidianNote>;
  getNoteByPath(path: string): ObsidianNote | null;
}
```

#### Theme Integration
```typescript
// Integración con temas de Obsidian
class ThemeIntegration {
  detectCurrentTheme(): ObsidianTheme;
  applyThemeVariables(theme: ObsidianTheme): void;
  handleThemeChange(): void;
}
```

#### Plugin Communication
```typescript
// Comunicación con otros plugins
class PluginCommunication {
  registerCommands(): void;
  handleObsidianEvents(): void;
  notifyOtherPlugins(event: PluginEvent): void;
}
```
