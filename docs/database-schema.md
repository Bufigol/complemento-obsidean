# Database Schema Documentation
## Obsidian AI Assistant Plugin

### 1. Overview

#### Storage Strategy
El plugin utiliza una combinación de **archivos JSON** para configuraciones y **base de datos local SQLite** para datos de performance y cache. Los datos se almacenan localmente en la bóveda de Obsidian para mantener la privacidad del usuario.

#### Data Types
- **Configuraciones:** JSON files en `.obsidian/plugins/ai-assistant/`
- **Cache y métricas:** SQLite database en `.obsidian/plugins/ai-assistant/data/`
- **Conversaciones:** Markdown files en carpeta configurable por el usuario
- **Análisis:** JSON files con metadatos de análisis

### 2. Core Data Models

#### Plugin Settings
```typescript
interface PluginSettings {
  // AI Model Configuration
  aiModels: {
    claude: {
      enabled: boolean;
      apiKey: string; // Encriptado
      model: string;
      maxTokens: number;
      temperature: number;
      costLimit: number;
    };
    gemini: {
      enabled: boolean;
      apiKey: string; // Encriptado
      model: string;
      maxTokens: number;
      temperature: number;
    };
  };
  
  // Privacy Settings
  privacy: {
    sensitiveContentDetection: boolean;
    noteAccessControl: 'all' | 'whitelist' | 'blacklist';
    excludedNotes: string[];
    includedNotes: string[];
    exportConversations: boolean;
    conversationFolder: string;
  };
  
  // Performance Settings
  performance: {
    backgroundAnalysis: boolean;
    analysisInterval: number; // minutos
    cacheEnabled: boolean;
    maxCacheSize: number;
    maxMemoryUsage: number; // MB
    workerThreads: number;
  };
  
  // UI Settings
  ui: {
    autoSuggestions: boolean;
    contextPanel: boolean;
    themeIntegration: boolean;
    chatPanelWidth: number;
    defaultModel: 'claude' | 'gemini';
  };
  
  // Search Settings
  search: {
    defaultSources: SearchSource[];
    maxResults: number;
    includeWikipedia: boolean;
    language: string;
  };
}
```

#### Note Analysis Data
```typescript
interface NoteAnalysis {
  id: string;
  notePath: string;
  noteHash: string; // Para detectar cambios
  analysisType: 'content' | 'structure' | 'relationships' | 'full';
  aiModel: string;
  timestamp: Date;
  
  // AI Analysis Results
  aiInsights: AIInsight[];
  suggestions: AISuggestion[];
  relationships: NoteRelationship[];
  metadata: NoteMetadata;
  
  // Performance Data
  analysisTime: number;
  tokensUsed: number;
  cost: number;
  
  // Privacy Data
  sensitiveContentDetected: boolean;
  accessLevel: string;
  privacyRecommendations: string[];
}

interface AIInsight {
  id: string;
  type: 'structure' | 'content' | 'style' | 'organization';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface AISuggestion {
  id: string;
  type: 'improvement' | 'addition' | 'reorganization' | 'link';
  title: string;
  description: string;
  content?: string;
  confidence: number;
  applied: boolean;
  appliedAt?: Date;
}

interface NoteRelationship {
  id: string;
  sourceNote: string;
  targetNote: string;
  relationshipType: 'similar' | 'related' | 'depends_on' | 'references';
  strength: number; // 0-1
  aiGenerated: boolean;
  userConfirmed: boolean;
}
```

#### Conversation Data
```typescript
interface Conversation {
  id: string;
  title: string;
  aiModel: string;
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'completed' | 'archived';
  
  // Messages
  messages: ChatMessage[];
  
  // Context
  context: {
    currentNote?: string;
    vaultContext?: VaultContext;
    searchResults?: WebSearchResult[];
  };
  
  // Metadata
  totalTokens: number;
  totalCost: number;
  notePath?: string; // Si se guardó como nota
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  tokens: number;
  cost?: number;
  
  // AI-specific data
  aiModel?: string;
  confidence?: number;
  sources?: string[];
  
  // Attachments
  attachments?: MessageAttachment[];
}

interface MessageAttachment {
  id: string;
  type: 'note' | 'image' | 'file' | 'diagram';
  path: string;
  name: string;
  size: number;
}
```

### 3. SQLite Database Schema

#### Database Structure
```sql
-- Tabla principal de análisis de notas
CREATE TABLE note_analyses (
    id TEXT PRIMARY KEY,
    note_path TEXT NOT NULL,
    note_hash TEXT NOT NULL,
    analysis_type TEXT NOT NULL,
    ai_model TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    analysis_time REAL NOT NULL,
    tokens_used INTEGER NOT NULL,
    cost REAL NOT NULL,
    sensitive_content_detected BOOLEAN NOT NULL,
    access_level TEXT NOT NULL,
    data TEXT NOT NULL -- JSON serializado
);

-- Tabla de insights de IA
CREATE TABLE ai_insights (
    id TEXT PRIMARY KEY,
    analysis_id TEXT NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    confidence REAL NOT NULL,
    actionable BOOLEAN NOT NULL,
    priority TEXT NOT NULL,
    FOREIGN KEY (analysis_id) REFERENCES note_analyses(id)
);

-- Tabla de sugerencias de IA
CREATE TABLE ai_suggestions (
    id TEXT PRIMARY KEY,
    analysis_id TEXT NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT,
    confidence REAL NOT NULL,
    applied BOOLEAN NOT NULL DEFAULT FALSE,
    applied_at DATETIME,
    FOREIGN KEY (analysis_id) REFERENCES note_analyses(id)
);

-- Tabla de relaciones entre notas
CREATE TABLE note_relationships (
    id TEXT PRIMARY KEY,
    source_note TEXT NOT NULL,
    target_note TEXT NOT NULL,
    relationship_type TEXT NOT NULL,
    strength REAL NOT NULL,
    ai_generated BOOLEAN NOT NULL,
    user_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL
);

-- Tabla de conversaciones
CREATE TABLE conversations (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    ai_model TEXT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    status TEXT NOT NULL,
    total_tokens INTEGER NOT NULL,
    total_cost REAL NOT NULL,
    note_path TEXT,
    context_data TEXT -- JSON serializado
);

-- Tabla de mensajes de chat
CREATE TABLE chat_messages (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    tokens INTEGER NOT NULL,
    cost REAL,
    ai_model TEXT,
    confidence REAL,
    sources_data TEXT, -- JSON serializado
    FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

-- Tabla de métricas de performance
CREATE TABLE performance_metrics (
    id TEXT PRIMARY KEY,
    metric_name TEXT NOT NULL,
    metric_value REAL NOT NULL,
    tags TEXT, -- JSON serializado
    timestamp DATETIME NOT NULL
);

-- Tabla de cache de respuestas
CREATE TABLE response_cache (
    id TEXT PRIMARY KEY,
    cache_key TEXT NOT NULL UNIQUE,
    response_data TEXT NOT NULL, -- JSON serializado
    timestamp DATETIME NOT NULL,
    access_count INTEGER NOT NULL DEFAULT 0,
    last_accessed DATETIME NOT NULL
);

-- Tabla de auditoría de acceso
CREATE TABLE access_audit (
    id TEXT PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    note_path TEXT NOT NULL,
    action TEXT NOT NULL,
    user_id TEXT NOT NULL,
    ip_address TEXT,
    success BOOLEAN NOT NULL,
    error_message TEXT
);

-- Tabla de costos por modelo de IA
CREATE TABLE ai_costs (
    id TEXT PRIMARY KEY,
    model_name TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    input_tokens INTEGER NOT NULL,
    output_tokens INTEGER NOT NULL,
    cost REAL NOT NULL,
    request_type TEXT NOT NULL
);

-- Tabla de búsquedas web
CREATE TABLE web_searches (
    id TEXT PRIMARY KEY,
    query TEXT NOT NULL,
    sources TEXT NOT NULL, -- JSON serializado
    results_count INTEGER NOT NULL,
    timestamp DATETIME NOT NULL,
    response_time REAL NOT NULL,
    success BOOLEAN NOT NULL
);
```

#### Indexes for Performance
```sql
-- Índices para búsquedas rápidas
CREATE INDEX idx_note_analyses_path ON note_analyses(note_path);
CREATE INDEX idx_note_analyses_timestamp ON note_analyses(timestamp);
CREATE INDEX idx_note_analyses_model ON note_analyses(ai_model);

CREATE INDEX idx_ai_insights_analysis ON ai_insights(analysis_id);
CREATE INDEX idx_ai_insights_type ON ai_insights(type);
CREATE INDEX idx_ai_insights_priority ON ai_insights(priority);

CREATE INDEX idx_ai_suggestions_analysis ON ai_suggestions(analysis_id);
CREATE INDEX idx_ai_suggestions_applied ON ai_suggestions(applied);
CREATE INDEX idx_ai_suggestions_type ON ai_suggestions(type);

CREATE INDEX idx_note_relationships_source ON note_relationships(source_note);
CREATE INDEX idx_note_relationships_target ON note_relationships(target_note);
CREATE INDEX idx_note_relationships_type ON note_relationships(relationship_type);

CREATE INDEX idx_conversations_status ON conversations(status);
CREATE INDEX idx_conversations_model ON conversations(ai_model);
CREATE INDEX idx_conversations_start_time ON conversations(start_time);

CREATE INDEX idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX idx_chat_messages_timestamp ON chat_messages(timestamp);

CREATE INDEX idx_performance_metrics_name ON performance_metrics(metric_name);
CREATE INDEX idx_performance_metrics_timestamp ON performance_metrics(timestamp);

CREATE INDEX idx_response_cache_key ON response_cache(cache_key);
CREATE INDEX idx_response_cache_timestamp ON response_cache(timestamp);

CREATE INDEX idx_access_audit_timestamp ON access_audit(timestamp);
CREATE INDEX idx_access_audit_note ON access_audit(note_path);

CREATE INDEX idx_ai_costs_model ON ai_costs(model_name);
CREATE INDEX idx_ai_costs_timestamp ON ai_costs(timestamp);

CREATE INDEX idx_web_searches_query ON web_searches(query);
CREATE INDEX idx_web_searches_timestamp ON web_searches(timestamp);
```

### 4. Data Persistence Layer

#### Database Manager
```typescript
class DatabaseManager {
  private db: Database;
  private migrations: Migration[];
  private connectionPool: ConnectionPool;

  async initialize(): Promise<void> {
    this.db = await this.openDatabase();
    await this.runMigrations();
    await this.createIndexes();
  }

  async getNoteAnalysis(notePath: string): Promise<NoteAnalysis | null> {
    const query = `
      SELECT * FROM note_analyses 
      WHERE note_path = ? 
      ORDER BY timestamp DESC 
      LIMIT 1
    `;
    
    const result = await this.db.get(query, [notePath]);
    return result ? this.deserializeAnalysis(result) : null;
  }

  async saveNoteAnalysis(analysis: NoteAnalysis): Promise<void> {
    const query = `
      INSERT OR REPLACE INTO note_analyses 
      (id, note_path, note_hash, analysis_type, ai_model, timestamp, 
       analysis_time, tokens_used, cost, sensitive_content_detected, 
       access_level, data)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const data = JSON.stringify(analysis);
    await this.db.run(query, [
      analysis.id,
      analysis.notePath,
      analysis.noteHash,
      analysis.analysisType,
      analysis.aiModel,
      analysis.timestamp.toISOString(),
      analysis.analysisTime,
      analysis.tokensUsed,
      analysis.cost,
      analysis.sensitiveContentDetected,
      analysis.accessLevel,
      data
    ]);

    // Guardar insights, sugerencias y relaciones
    await this.saveAnalysisComponents(analysis);
  }

  private async saveAnalysisComponents(analysis: NoteAnalysis): Promise<void> {
    // Guardar insights
    for (const insight of analysis.aiInsights) {
      await this.saveAIInsight(insight, analysis.id);
    }

    // Guardar sugerencias
    for (const suggestion of analysis.suggestions) {
      await this.saveAISuggestion(suggestion, analysis.id);
    }

    // Guardar relaciones
    for (const relationship of analysis.relationships) {
      await this.saveNoteRelationship(relationship);
    }
  }
}
```

#### Cache Manager
```typescript
class CacheManager {
  private db: Database;
  private memoryCache: Map<string, CachedItem>;
  private maxMemorySize: number;

  async get(key: string): Promise<any | null> {
    // Primero buscar en memoria
    if (this.memoryCache.has(key)) {
      const item = this.memoryCache.get(key)!;
      if (this.isValid(item)) {
        return item.value;
      }
      this.memoryCache.delete(key);
    }

    // Buscar en base de datos
    const query = `
      SELECT response_data, timestamp, access_count 
      FROM response_cache 
      WHERE cache_key = ?
    `;
    
    const result = await this.db.get(query, [key]);
    if (!result) return null;

    const item = JSON.parse(result.response_data);
    if (this.isValid(item)) {
      // Actualizar contador de acceso
      await this.updateAccessCount(key);
      
      // Mover a memoria si es pequeño
      if (JSON.stringify(item.value).length < 10000) {
        this.memoryCache.set(key, item);
      }
      
      return item.value;
    }

    // Eliminar item expirado
    await this.remove(key);
    return null;
  }

  async set(key: string, value: any, ttl: number = 3600000): Promise<void> {
    const item: CachedItem = {
      value,
      timestamp: Date.now(),
      ttl,
      size: JSON.stringify(value).length
    };

    // Guardar en memoria si es pequeño
    if (item.size < 10000) {
      this.memoryCache.set(key, item);
      this.ensureMemoryLimit();
    }

    // Guardar en base de datos
    const query = `
      INSERT OR REPLACE INTO response_cache 
      (cache_key, response_data, timestamp, access_count, last_accessed)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    await this.db.run(query, [
      key,
      JSON.stringify(item),
      item.timestamp,
      0,
      item.timestamp
    ]);
  }

  private ensureMemoryLimit(): void {
    if (this.memoryCache.size <= this.maxMemorySize) return;

    // Eliminar items más antiguos
    const sortedItems = Array.from(this.memoryCache.entries())
      .sort(([, a], [, b]) => a.timestamp - b.timestamp);
    
    const itemsToRemove = sortedItems.slice(0, this.maxMemorySize / 2);
    for (const [key] of itemsToRemove) {
      this.memoryCache.delete(key);
    }
  }
}
```

### 5. Data Migration & Versioning

#### Migration System
```typescript
interface Migration {
  version: number;
  description: string;
  up: (db: Database) => Promise<void>;
  down: (db: Database) => Promise<void>;
}

class MigrationManager {
  private migrations: Migration[] = [
    {
      version: 1,
      description: 'Initial schema creation',
      up: async (db: Database) => {
        await db.exec(`
          CREATE TABLE IF NOT EXISTS note_analyses (
            id TEXT PRIMARY KEY,
            note_path TEXT NOT NULL,
            note_hash TEXT NOT NULL,
            analysis_type TEXT NOT NULL,
            ai_model TEXT NOT NULL,
            timestamp DATETIME NOT NULL,
            analysis_time REAL NOT NULL,
            tokens_used INTEGER NOT NULL,
            cost REAL NOT NULL,
            sensitive_content_detected BOOLEAN NOT NULL,
            access_level TEXT NOT NULL,
            data TEXT NOT NULL
          );
        `);
      },
      down: async (db: Database) => {
        await db.exec('DROP TABLE IF EXISTS note_analyses;');
      }
    },
    {
      version: 2,
      description: 'Add AI insights table',
      up: async (db: Database) => {
        await db.exec(`
          CREATE TABLE IF NOT EXISTS ai_insights (
            id TEXT PRIMARY KEY,
            analysis_id TEXT NOT NULL,
            type TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            confidence REAL NOT NULL,
            actionable BOOLEAN NOT NULL,
            priority TEXT NOT NULL,
            FOREIGN KEY (analysis_id) REFERENCES note_analyses(id)
          );
        `);
      },
      down: async (db: Database) => {
        await db.exec('DROP TABLE IF EXISTS ai_insights;');
      }
    }
  ];

  async runMigrations(db: Database): Promise<void> {
    const currentVersion = await this.getCurrentVersion(db);
    
    for (const migration of this.migrations) {
      if (migration.version > currentVersion) {
        await migration.up(db);
        await this.setVersion(db, migration.version);
      }
    }
  }

  private async getCurrentVersion(db: Database): Promise<number> {
    try {
      const result = await db.get('PRAGMA user_version');
      return result.user_version || 0;
    } catch {
      return 0;
    }
  }

  private async setVersion(db: Database, version: number): Promise<void> {
    await db.exec(`PRAGMA user_version = ${version}`);
  }
}
```

### 6. Data Backup & Recovery

#### Backup Strategy
```typescript
class BackupManager {
  private db: Database;
  private backupPath: string;
  private maxBackups: number;

  async createBackup(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(this.backupPath, `ai-assistant-${timestamp}.db`);
    
    // Crear backup de la base de datos
    await this.db.exec(`VACUUM INTO '${backupFile}'`);
    
    // Comprimir el backup
    const compressedFile = `${backupFile}.gz`;
    await this.compressFile(backupFile, compressedFile);
    
    // Eliminar archivo sin comprimir
    await fs.unlink(backupFile);
    
    // Limpiar backups antiguos
    await this.cleanupOldBackups();
    
    return compressedFile;
  }

  async restoreBackup(backupFile: string): Promise<void> {
    // Descomprimir backup
    const tempFile = backupFile.replace('.gz', '');
    await this.decompressFile(backupFile, tempFile);
    
    // Restaurar base de datos
    await this.db.close();
    await fs.copyFile(tempFile, this.getDatabasePath());
    await this.db.open();
    
    // Limpiar archivo temporal
    await fs.unlink(tempFile);
  }

  private async cleanupOldBackups(): Promise<void> {
    const files = await fs.readdir(this.backupPath);
    const backupFiles = files
      .filter(f => f.startsWith('ai-assistant-') && f.endsWith('.gz'))
      .map(f => ({
        name: f,
        path: path.join(this.backupPath, f),
        timestamp: this.extractTimestamp(f)
      }))
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    // Mantener solo los últimos maxBackups
    for (let i = this.maxBackups; i < backupFiles.length; i++) {
      await fs.unlink(backupFiles[i].path);
    }
  }
}
```

### 7. Data Privacy & Security

#### Encryption Manager
```typescript
class EncryptionManager {
  private algorithm: string = 'aes-256-gcm';
  private key: Buffer;
  private salt: Buffer;

  constructor(masterPassword: string) {
    this.salt = crypto.randomBytes(32);
    this.key = this.deriveKey(masterPassword, this.salt);
  }

  async encrypt(data: string): Promise<string> {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, this.key);
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return JSON.stringify({
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
      salt: this.salt.toString('hex')
    });
  }

  async decrypt(encryptedData: string): Promise<string> {
    const { encrypted, iv, authTag, salt } = JSON.parse(encryptedData);
    
    const decipher = crypto.createDecipher(this.algorithm, this.key);
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  private deriveKey(password: string, salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  }
}
```

#### Privacy Manager
```typescript
class PrivacyManager {
  private db: Database;
  private encryptionManager: EncryptionManager;

  async anonymizeData(data: any, privacyLevel: PrivacyLevel): Promise<any> {
    switch (privacyLevel) {
      case 'public':
        return data;
      
      case 'private':
        return this.anonymizePrivateData(data);
      
      case 'sensitive':
        return this.anonymizeSensitiveData(data);
      
      default:
        return this.anonymizePrivateData(data);
    }
  }

  private anonymizePrivateData(data: any): any {
    const anonymized = { ...data };
    
    // Anonimizar rutas de archivos
    if (anonymized.notePath) {
      anonymized.notePath = this.hashPath(anonymized.notePath);
    }
    
    // Anonimizar contenido de notas
    if (anonymized.content) {
      anonymized.content = this.hashContent(anonymized.content);
    }
    
    return anonymized;
  }

  private anonymizeSensitiveData(data: any): any {
    const anonymized = { ...data };
    
    // Solo mantener metadatos básicos
    delete anonymized.content;
    delete anonymized.notePath;
    delete anonymized.userId;
    
    // Anonimizar timestamps
    if (anonymized.timestamp) {
      anonymized.timestamp = this.roundTimestamp(anonymized.timestamp);
    }
    
    return anonymized;
  }

  private hashPath(path: string): string {
    return crypto.createHash('sha256').update(path).digest('hex').substring(0, 8);
  }

  private hashContent(content: string): string {
    return crypto.createHash('sha256').update(content).digest('hex').substring(0, 16);
  }

  private roundTimestamp(timestamp: Date): Date {
    const rounded = new Date(timestamp);
    rounded.setHours(Math.floor(rounded.getHours() / 6) * 6, 0, 0, 0);
    return rounded;
  }
}
```

### 8. Performance Optimization

#### Query Optimization
```typescript
class QueryOptimizer {
  private db: Database;
  private queryCache: Map<string, QueryPlan>;

  async optimizeQuery(sql: string, params: any[]): Promise<string> {
    // Verificar cache de consultas
    const cacheKey = this.generateCacheKey(sql, params);
    if (this.queryCache.has(cacheKey)) {
      return this.queryCache.get(cacheKey)!.optimizedSql;
    }

    // Analizar plan de ejecución
    const plan = await this.analyzeQueryPlan(sql);
    const optimizedSql = this.optimizeSql(sql, plan);
    
    // Cachear resultado
    this.queryCache.set(cacheKey, {
      originalSql: sql,
      optimizedSql,
      plan,
      timestamp: Date.now()
    });
    
    return optimizedSql;
  }

  private async analyzeQueryPlan(sql: string): Promise<QueryPlan> {
    const explainResult = await this.db.all(`EXPLAIN QUERY PLAN ${sql}`);
    
    return {
      steps: explainResult,
      estimatedCost: this.calculateEstimatedCost(explainResult),
      usesIndex: explainResult.some(step => step.detail?.includes('USING INDEX')),
      scanType: this.determineScanType(explainResult)
    };
  }

  private optimizeSql(sql: string, plan: QueryPlan): string {
    let optimized = sql;
    
    // Agregar hints de índice si es necesario
    if (!plan.usesIndex && plan.estimatedCost > 1000) {
      optimized = this.addIndexHints(optimized);
    }
    
    // Optimizar ORDER BY si es necesario
    if (sql.includes('ORDER BY') && !plan.usesIndex) {
      optimized = this.optimizeOrderBy(optimized);
    }
    
    return optimized;
  }
}
```

#### Connection Pooling
```typescript
class ConnectionPool {
  private connections: Database[] = [];
  private maxConnections: number;
  private availableConnections: Database[] = [];
  private inUseConnections: Set<Database> = new Set();

  async getConnection(): Promise<Database> {
    if (this.availableConnections.length > 0) {
      const connection = this.availableConnections.pop()!;
      this.inUseConnections.add(connection);
      return connection;
    }

    if (this.connections.length < this.maxConnections) {
      const connection = await this.createConnection();
      this.connections.push(connection);
      this.inUseConnections.add(connection);
      return connection;
    }

    // Esperar a que haya una conexión disponible
    return this.waitForConnection();
  }

  async releaseConnection(connection: Database): Promise<void> {
    if (this.inUseConnections.has(connection)) {
      this.inUseConnections.delete(connection);
      this.availableConnections.push(connection);
    }
  }

  private async waitForConnection(): Promise<Database> {
    return new Promise((resolve) => {
      const checkForConnection = () => {
        if (this.availableConnections.length > 0) {
          const connection = this.availableConnections.pop()!;
          this.inUseConnections.add(connection);
          resolve(connection);
        } else {
          setTimeout(checkForConnection, 100);
        }
      };
      checkForConnection();
    });
  }
}
```

### 9. Data Validation & Integrity

#### Schema Validator
```typescript
class SchemaValidator {
  private schemas: Map<string, JSONSchema>;

  async validateData(table: string, data: any): Promise<ValidationResult> {
    const schema = this.schemas.get(table);
    if (!schema) {
      return { valid: true, errors: [] };
    }

    const result = await this.validateAgainstSchema(data, schema);
    return result;
  }

  private async validateAgainstSchema(data: any, schema: JSONSchema): Promise<ValidationResult> {
    const errors: ValidationError[] = [];
    
    // Validar tipos
    for (const [field, fieldSchema] of Object.entries(schema.properties || {})) {
      if (data.hasOwnProperty(field)) {
        const fieldResult = this.validateField(data[field], fieldSchema, field);
        errors.push(...fieldResult);
      } else if (fieldSchema.required) {
        errors.push({
          field,
          message: `Campo requerido: ${field}`,
          code: 'REQUIRED_FIELD'
        });
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  private validateField(value: any, schema: any, fieldName: string): ValidationError[] {
    const errors: ValidationError[] = [];
    
    // Validar tipo
    if (schema.type && typeof value !== schema.type) {
      errors.push({
        field: fieldName,
        message: `Campo ${fieldName} debe ser de tipo ${schema.type}`,
        code: 'TYPE_MISMATCH'
      });
    }
    
    // Validar longitud para strings
    if (schema.type === 'string' && schema.maxLength && value.length > schema.maxLength) {
      errors.push({
        field: fieldName,
        message: `Campo ${fieldName} excede la longitud máxima de ${schema.maxLength}`,
        code: 'LENGTH_EXCEEDED'
      });
    }
    
    // Validar rango para números
    if (schema.type === 'number') {
      if (schema.minimum !== undefined && value < schema.minimum) {
        errors.push({
          field: fieldName,
          message: `Campo ${fieldName} debe ser mayor o igual a ${schema.minimum}`,
          code: 'VALUE_TOO_SMALL'
        });
      }
      
      if (schema.maximum !== undefined && value > schema.maximum) {
        errors.push({
          field: fieldName,
          message: `Campo ${fieldName} debe ser menor o igual a ${schema.maximum}`,
          code: 'VALUE_TOO_LARGE'
        });
      }
    }
    
    return errors;
  }
}
```

### 10. Monitoring & Analytics

#### Database Metrics
```typescript
class DatabaseMetrics {
  private db: Database;
  private metrics: Map<string, MetricData[]>;

  async recordQueryMetrics(sql: string, executionTime: number, rowsReturned: number): Promise<void> {
    const metric: QueryMetric = {
      sql: this.normalizeSql(sql),
      executionTime,
      rowsReturned,
      timestamp: Date.now(),
      cached: false
    };
    
    await this.saveQueryMetric(metric);
    await this.updatePerformanceMetrics(metric);
  }

  async getPerformanceReport(timeRange: TimeRange): Promise<PerformanceReport> {
    const query = `
      SELECT 
        AVG(execution_time) as avg_execution_time,
        MAX(execution_time) as max_execution_time,
        COUNT(*) as total_queries,
        SUM(rows_returned) as total_rows_returned
      FROM query_metrics 
      WHERE timestamp BETWEEN ? AND ?
    `;
    
    const result = await this.db.get(query, [timeRange.start, timeRange.end]);
    
    return {
      averageExecutionTime: result.avg_execution_time,
      maxExecutionTime: result.max_execution_time,
      totalQueries: result.total_queries,
      totalRowsReturned: result.total_rows_returned,
      queriesPerSecond: result.total_queries / (timeRange.end - timeRange.start) * 1000
    };
  }

  private normalizeSql(sql: string): string {
    // Normalizar SQL para agrupar consultas similares
    return sql
      .replace(/\s+/g, ' ')
      .replace(/\d+/g, 'N')
      .replace(/['"][^'"]*['"]/g, 'S')
      .trim();
  }
}
```
