# Backend Documentation
## Obsidian AI Assistant Plugin

### 1. Backend Framework & Architecture

#### Framework Selection
- **Framework:** TypeScript + Node.js (compatible con Obsidian)
- **Architecture:** Plugin nativo de Obsidian con servicios de IA externos
- **Pattern:** Service-oriented architecture con abstracción de APIs

#### Plugin Architecture
```
Obsidian Plugin
├── Core Plugin Class
├── AI Service Layer
├── Note Analysis Engine
├── Privacy & Security Manager
├── Performance Optimizer
└── Integration Layer
```

### 2. Core Plugin Structure

#### Main Plugin Class
```typescript
class ObsidianAIAssistantPlugin extends Plugin {
  private aiService: AIService;
  private noteAnalyzer: NoteAnalyzer;
  private privacyManager: PrivacyManager;
  private performanceOptimizer: PerformanceOptimizer;
  private settings: PluginSettings;

  async onload(): Promise<void> {
    // Inicialización del plugin
    await this.initializeServices();
    await this.registerCommands();
    await this.setupEventListeners();
    await this.startBackgroundAnalysis();
  }

  async onunload(): Promise<void> {
    // Limpieza al desactivar
    await this.cleanupServices();
    await this.stopBackgroundAnalysis();
  }
}
```

#### Service Layer
```typescript
// Capa de servicios de IA
class AIService {
  private claudeClient: ClaudeClient;
  private geminiClient: GeminiClient;
  private webSearchClient: WebSearchClient;
  private cache: ResponseCache;

  async analyzeNote(note: ObsidianNote, context: AnalysisContext): Promise<AIAnalysis>;
  async generateContent(prompt: string, context: GenerationContext): Promise<GeneratedContent>;
  async searchWeb(query: string, sources: SearchSource[]): Promise<WebSearchResult[]>;
}
```

### 3. AI Integration Services

#### Claude API Integration
```typescript
class ClaudeClient {
  private apiKey: string;
  private baseURL: string;
  private rateLimiter: RateLimiter;
  private costTracker: CostTracker;

  constructor(apiKey: string) {
    this.apiKey = this.encryptAPIKey(apiKey);
    this.baseURL = 'https://api.anthropic.com/v1';
    this.rateLimiter = new RateLimiter(100, 60000); // 100 requests per minute
    this.costTracker = new CostTracker();
  }

  async generateResponse(prompt: string, context: ClaudeContext): Promise<ClaudeResponse> {
    await this.rateLimiter.checkLimit();
    await this.costTracker.estimateCost(prompt);
    
    const response = await this.makeAPIRequest(prompt, context);
    await this.costTracker.recordCost(response);
    
    return response;
  }

  private encryptAPIKey(key: string): string {
    return crypto.encrypt(key, process.env.ENCRYPTION_KEY);
  }
}
```

#### Gemini API Integration
```typescript
class GeminiClient {
  private apiKey: string;
  private baseURL: string;
  private modelSelector: ModelSelector;

  constructor(apiKey: string) {
    this.apiKey = this.encryptAPIKey(apiKey);
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta';
    this.modelSelector = new ModelSelector();
  }

  async generateResponse(prompt: string, context: GeminiContext): Promise<GeminiResponse> {
    const model = this.modelSelector.selectOptimalModel(prompt, context);
    const response = await this.makeAPIRequest(prompt, context, model);
    
    return response;
  }
}
```

#### Web Search Integration
```typescript
class WebSearchClient {
  private searchEngines: SearchEngine[];
  private wikipediaClient: WikipediaClient;

  constructor() {
    this.searchEngines = [
      new GoogleSearchEngine(),
      new DuckDuckGoSearchEngine(),
      new BingSearchEngine(),
      new BraveSearchEngine(),
      new SerpAPISearchEngine()
    ];
    this.wikipediaClient = new WikipediaClient();
  }

  async search(query: string, sources: SearchSource[]): Promise<WebSearchResult[]> {
    const results: WebSearchResult[] = [];
    
    for (const source of sources) {
      const engine = this.searchEngines.find(e => e.name === source);
      if (engine) {
        const result = await engine.search(query);
        results.push(...result);
      }
    }

    // Agregar resultados de Wikipedia
    const wikiResults = await this.wikipediaClient.search(query);
    results.push(...wikiResults);

    return this.rankResults(results);
  }
}
```

### 4. Note Analysis Engine

#### Core Analysis Engine
```typescript
class NoteAnalyzer {
  private aiService: AIService;
  private vaultIndexer: VaultIndexer;
  private contextBuilder: ContextBuilder;
  private relationshipMapper: RelationshipMapper;

  async analyzeNote(note: ObsidianNote): Promise<NoteAnalysis> {
    const context = await this.contextBuilder.buildContext(note);
    const aiAnalysis = await this.aiService.analyzeNote(note, context);
    const relationships = await this.relationshipMapper.mapRelationships(note);
    
    return {
      note,
      aiAnalysis,
      relationships,
      suggestions: this.generateSuggestions(aiAnalysis, relationships),
      metadata: this.extractMetadata(note, aiAnalysis)
    };
  }

  async analyzeVault(): Promise<VaultAnalysis> {
    const notes = await this.vaultIndexer.getAllNotes();
    const analysis = await Promise.all(
      notes.map(note => this.analyzeNote(note))
    );
    
    return {
      totalNotes: notes.length,
      analysis,
      insights: this.generateVaultInsights(analysis),
      recommendations: this.generateRecommendations(analysis)
    };
  }
}
```

#### Vault Indexing
```typescript
class VaultIndexer {
  private obsidianAPI: ObsidianAPI;
  private index: VaultIndex;
  private changeWatcher: FileChangeWatcher;

  async buildIndex(): Promise<VaultIndex> {
    const notes = await this.obsidianAPI.getAllNotes();
    const folders = await this.obsidianAPI.getAllFolders();
    
    this.index = {
      notes: new Map(notes.map(note => [note.path, note])),
      folders: new Map(folders.map(folder => [folder.path, folder])),
      relationships: new Map(),
      metadata: new Map(),
      lastUpdated: new Date()
    };

    await this.indexRelationships();
    await this.indexMetadata();
    
    return this.index;
  }

  async watchForChanges(): Promise<void> {
    this.changeWatcher = new FileChangeWatcher(this.obsidianAPI);
    this.changeWatcher.on('noteChanged', async (note) => {
      await this.updateNoteInIndex(note);
    });
  }
}
```

### 5. Privacy & Security Manager

#### Privacy Manager
```typescript
class PrivacyManager {
  private sensitiveContentDetector: SensitiveContentDetector;
  private accessControl: AccessControl;
  private encryptionService: EncryptionService;
  private auditLogger: AuditLogger;

  async checkNotePrivacy(note: ObsidianNote): Promise<PrivacyCheck> {
    const sensitiveContent = await this.sensitiveContentDetector.detect(note);
    const accessLevel = await this.accessControl.getAccessLevel(note);
    
    return {
      isSensitive: sensitiveContent.length > 0,
      sensitiveContent,
      accessLevel,
      recommendations: this.generatePrivacyRecommendations(sensitiveContent, accessLevel)
    };
  }

  async encryptSensitiveData(data: string): Promise<string> {
    return await this.encryptionService.encrypt(data);
  }

  async logAccess(note: ObsidianNote, action: string, user: string): Promise<void> {
    await this.auditLogger.log({
      timestamp: new Date(),
      note: note.path,
      action,
      user,
      ipAddress: await this.getClientIP()
    });
  }
}
```

#### Sensitive Content Detection
```typescript
class SensitiveContentDetector {
  private patterns: RegExp[];
  private keywords: string[];
  private mlModel: MLModel;

  constructor() {
    this.patterns = [
      /password\s*[:=]\s*\w+/i,
      /api[_-]?key\s*[:=]\s*\w+/i,
      /secret\s*[:=]\s*\w+/i,
      /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/ // Credit card pattern
    ];
    
    this.keywords = ['password', 'secret', 'private', 'confidential', 'sensitive'];
    this.mlModel = new MLModel('sensitive-content-detection');
  }

  async detect(note: ObsidianNote): Promise<SensitiveContent[]> {
    const content = note.content;
    const detected: SensitiveContent[] = [];

    // Pattern matching
    for (const pattern of this.patterns) {
      const matches = content.match(pattern);
      if (matches) {
        detected.push({
          type: 'pattern',
          pattern: pattern.source,
          matches,
          confidence: 0.9
        });
      }
    }

    // Keyword detection
    for (const keyword of this.keywords) {
      if (content.toLowerCase().includes(keyword.toLowerCase())) {
        detected.push({
          type: 'keyword',
          keyword,
          confidence: 0.7
        });
      }
    }

    // ML-based detection
    const mlResults = await this.mlModel.predict(content);
    if (mlResults.confidence > 0.8) {
      detected.push({
        type: 'ml',
        confidence: mlResults.confidence,
        reason: mlResults.reason
      });
    }

    return detected;
  }
}
```

### 6. Performance Optimization

#### Background Analysis Engine
```typescript
class BackgroundAnalyzer {
  private analyzer: NoteAnalyzer;
  private queue: AnalysisQueue;
  private workerPool: WorkerPool;
  private performanceMonitor: PerformanceMonitor;

  async startAnalysis(): Promise<void> {
    this.workerPool = new WorkerPool(4); // 4 workers concurrentes
    
    setInterval(async () => {
      if (this.queue.hasItems()) {
        const batch = this.queue.getBatch(10);
        await this.processBatch(batch);
      }
    }, 5000); // Procesar cada 5 segundos
  }

  private async processBatch(batch: AnalysisTask[]): Promise<void> {
    const startTime = performance.now();
    
    const promises = batch.map(task => 
      this.workerPool.execute(() => this.analyzer.analyzeNote(task.note))
    );
    
    const results = await Promise.allSettled(promises);
    const endTime = performance.now();
    
    await this.performanceMonitor.recordBatchPerformance({
      batchSize: batch.length,
      duration: endTime - startTime,
      successRate: results.filter(r => r.status === 'fulfilled').length / results.length
    });
  }
}
```

#### Caching System
```typescript
class ResponseCache {
  private cache: Map<string, CachedResponse>;
  private ttl: number;
  private maxSize: number;

  constructor(ttl: number = 3600000, maxSize: number = 1000) { // 1 hora, 1000 items
    this.cache = new Map();
    this.ttl = ttl;
    this.maxSize = maxSize;
  }

  async get(key: string): Promise<CachedResponse | null> {
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached;
  }

  async set(key: string, value: any): Promise<void> {
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }
    
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      accessCount: 0
    });
  }

  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();
    
    for (const [key, value] of this.cache.entries()) {
      if (value.timestamp < oldestTime) {
        oldestTime = value.timestamp;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }
}
```

### 7. Error Handling & Logging

#### Error Handler
```typescript
class ErrorHandler {
  private logger: Logger;
  private notificationService: NotificationService;
  private retryManager: RetryManager;

  async handleError(error: Error, context: ErrorContext): Promise<void> {
    // Log del error
    await this.logger.error({
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date(),
      userId: context.userId
    });

    // Notificación al usuario
    if (context.showNotification) {
      await this.notificationService.showError(error.message, context);
    }

    // Reintento automático si es apropiado
    if (this.shouldRetry(error, context)) {
      await this.retryManager.scheduleRetry(context, error);
    }
  }

  private shouldRetry(error: Error, context: ErrorContext): boolean {
    const retryableErrors = ['NetworkError', 'RateLimitError', 'TimeoutError'];
    return retryableErrors.some(type => error.name === type);
  }
}
```

#### Logging System
```typescript
class Logger {
  private logLevel: LogLevel;
  private outputs: LogOutput[];
  private formatter: LogFormatter;

  async log(level: LogLevel, message: string, data?: any): Promise<void> {
    if (level < this.logLevel) return;
    
    const logEntry = this.formatter.format({
      level,
      message,
      data,
      timestamp: new Date(),
      context: this.getContext()
    });
    
    for (const output of this.outputs) {
      await output.write(logEntry);
    }
  }

  async error(message: string, data?: any): Promise<void> {
    await this.log(LogLevel.ERROR, message, data);
  }

  async warn(message: string, data?: any): Promise<void> {
    await this.log(LogLevel.WARN, message, data);
  }

  async info(message: string, data?: any): Promise<void> {
    await this.log(LogLevel.INFO, message, data);
  }

  async debug(message: string, data?: any): Promise<void> {
    await this.log(LogLevel.DEBUG, message, data);
  }
}
```

### 8. Testing & Quality Assurance

#### Unit Testing Structure
```typescript
// Ejemplo de test unitario
describe('AIService', () => {
  let aiService: AIService;
  let mockClaudeClient: jest.Mocked<ClaudeClient>;
  let mockGeminiClient: jest.Mocked<GeminiClient>;

  beforeEach(() => {
    mockClaudeClient = createMockClaudeClient();
    mockGeminiClient = createMockGeminiClient();
    aiService = new AIService(mockClaudeClient, mockGeminiClient);
  });

  describe('analyzeNote', () => {
    it('should analyze note using Claude when specified', async () => {
      const note = createMockNote();
      const context = createMockContext();
      
      mockClaudeClient.generateResponse.mockResolvedValue(createMockResponse());
      
      const result = await aiService.analyzeNote(note, context, 'claude');
      
      expect(mockClaudeClient.generateResponse).toHaveBeenCalledWith(
        expect.stringContaining(note.content),
        context
      );
      expect(result).toBeDefined();
    });
  });
});
```

#### Integration Testing
```typescript
describe('Plugin Integration', () => {
  let plugin: ObsidianAIAssistantPlugin;
  let mockObsidianAPI: jest.Mocked<ObsidianAPI>;

  beforeEach(async () => {
    mockObsidianAPI = createMockObsidianAPI();
    plugin = new ObsidianAIAssistantPlugin();
    await plugin.onload();
  });

  afterEach(async () => {
    await plugin.onunload();
  });

  it('should register commands successfully', () => {
    const commands = plugin.getRegisteredCommands();
    expect(commands).toContain('ai-assistant:open-chat');
    expect(commands).toContain('ai-assistant:analyze-note');
  });
});
```

### 9. Configuration Management

#### Settings Manager
```typescript
class SettingsManager {
  private settings: PluginSettings;
  private obsidianAPI: ObsidianAPI;
  private validator: SettingsValidator;

  async loadSettings(): Promise<PluginSettings> {
    const savedSettings = await this.obsidianAPI.loadData('ai-assistant-settings');
    
    this.settings = {
      ...this.getDefaultSettings(),
      ...savedSettings
    };
    
    await this.validator.validate(this.settings);
    return this.settings;
  }

  async updateSettings(newSettings: Partial<PluginSettings>): Promise<void> {
    this.settings = { ...this.settings, ...newSettings };
    
    await this.validator.validate(this.settings);
    await this.obsidianAPI.saveData('ai-assistant-settings', this.settings);
    
    await this.notifySettingsChanged(this.settings);
  }

  private getDefaultSettings(): PluginSettings {
    return {
      aiModels: {
        claude: { enabled: true, apiKey: '', model: 'claude-3-sonnet' },
        gemini: { enabled: true, apiKey: '', model: 'gemini-pro' }
      },
      privacy: {
        sensitiveContentDetection: true,
        noteAccessControl: 'all',
        exportConversations: true
      },
      performance: {
        backgroundAnalysis: true,
        cacheEnabled: true,
        maxCacheSize: 1000
      },
      ui: {
        autoSuggestions: true,
        contextPanel: true,
        themeIntegration: true
      }
    };
  }
}
```

### 10. Monitoring & Metrics

#### Performance Monitor
```typescript
class PerformanceMonitor {
  private metrics: PerformanceMetrics;
  private observers: PerformanceObserver[];

  async recordMetric(name: string, value: number, tags?: Record<string, string>): Promise<void> {
    const metric = {
      name,
      value,
      tags,
      timestamp: Date.now()
    };
    
    this.metrics[name] = this.metrics[name] || [];
    this.metrics[name].push(metric);
    
    // Mantener solo los últimos 1000 valores
    if (this.metrics[name].length > 1000) {
      this.metrics[name] = this.metrics[name].slice(-1000);
    }
    
    await this.notifyObservers(metric);
  }

  async getMetrics(name: string, timeRange: TimeRange): Promise<MetricSummary> {
    const metrics = this.metrics[name] || [];
    const filtered = metrics.filter(m => 
      m.timestamp >= timeRange.start && m.timestamp <= timeRange.end
    );
    
    return {
      count: filtered.length,
      average: filtered.reduce((sum, m) => sum + m.value, 0) / filtered.length,
      min: Math.min(...filtered.map(m => m.value)),
      max: Math.max(...filtered.map(m => m.value)),
      p95: this.calculatePercentile(filtered, 95),
      p99: this.calculatePercentile(filtered, 99)
    };
  }

  private calculatePercentile(metrics: PerformanceMetric[], percentile: number): number {
    const sorted = metrics.map(m => m.value).sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index] || 0;
  }
}
```
