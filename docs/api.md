# API Documentation
## Obsidian AI Assistant Plugin

### 1. API Overview

#### Architecture
El plugin utiliza una arquitectura de servicios con APIs externas para IA y búsqueda web, integradas a través de una capa de abstracción interna.

#### Base URLs
- **Claude API:** `https://api.anthropic.com/v1`
- **Gemini API:** `https://generativelanguage.googleapis.com/v1beta`
- **Google Search:** `https://www.googleapis.com/customsearch/v1`
- **DuckDuckGo:** `https://api.duckduckgo.com/`
- **Wikipedia:** `https://es.wikipedia.org/api/rest_v1/`

### 2. AI Service APIs

#### Claude API Integration

**Endpoint:** `POST /messages`

**Request Headers:**
```http
Authorization: Bearer {API_KEY}
Content-Type: application/json
anthropic-version: 2023-06-01
```

**Request Body:**
```json
{
  "model": "claude-3-sonnet-20240229",
  "max_tokens": 4096,
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Analiza la siguiente nota de Obsidian y sugiere mejoras..."
        }
      ]
    }
  ],
  "system": "Eres un asistente de IA especializado en análisis de notas de Obsidian..."
}
```

**Response:**
```json
{
  "id": "msg_123456789",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Análisis de la nota:\n\n1. **Estructura:** La nota tiene una buena organización..."
    }
  ],
  "model": "claude-3-sonnet-20240229",
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "usage": {
    "input_tokens": 150,
    "output_tokens": 300
  }
}
```

**Rate Limits:**
- **Free Tier:** 100 requests per minute
- **Paid Tier:** 1000 requests per minute
- **Cost:** $0.015 per 1K input tokens, $0.075 per 1K output tokens

#### Gemini API Integration

**Endpoint:** `POST /models/{model}:generateContent`

**Request Headers:**
```http
Authorization: Bearer {API_KEY}
Content-Type: application/json
```

**Request Body:**
```json
{
  "contents": [
    {
      "parts": [
        {
          "text": "Analiza la siguiente nota de Obsidian y sugiere mejoras..."
        }
      ]
    }
  ],
  "generationConfig": {
    "temperature": 0.7,
    "topK": 40,
    "topP": 0.95,
    "maxOutputTokens": 4096
  },
  "safetySettings": [
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    }
  ]
}
```

**Response:**
```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "Análisis de la nota:\n\n1. **Estructura:** La nota tiene una buena organización..."
          }
        ]
      },
      "finishReason": "STOP",
      "index": 0,
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE"
        }
      ]
    }
  ],
  "promptFeedback": {
    "safetyRatings": [
      {
        "category": "HARM_CATEGORY_HARASSMENT",
        "probability": "NEGLIGIBLE"
      }
    ]
  }
}
```

**Rate Limits:**
- **Free Tier:** 60 requests per minute
- **Paid Tier:** 1500 requests per minute
- **Cost:** Free for basic usage, paid for advanced features

### 3. Web Search APIs

#### Google Custom Search API

**Endpoint:** `GET /customsearch/v1`

**Query Parameters:**
```http
GET /customsearch/v1?key={API_KEY}&cx={SEARCH_ENGINE_ID}&q={QUERY}&num=10&start=1
```

**Response:**
```json
{
  "items": [
    {
      "kind": "customsearch#result",
      "title": "Título del resultado",
      "htmlTitle": "Título HTML del resultado",
      "link": "https://ejemplo.com",
      "displayLink": "ejemplo.com",
      "snippet": "Descripción del resultado...",
      "htmlSnippet": "Descripción HTML del resultado...",
      "pagemap": {
        "metatags": [
          {
            "og:title": "Título Open Graph",
            "og:description": "Descripción Open Graph"
          }
        ]
      }
    }
  ],
  "searchInformation": {
    "searchTime": 0.123456,
    "formattedSearchTime": "0.12",
    "totalResults": "1000000",
    "formattedTotalResults": "1,000,000"
  }
}
```

**Rate Limits:**
- **Free Tier:** 100 queries per day
- **Paid Tier:** 10,000 queries per day
- **Cost:** $5 per 1000 queries

#### DuckDuckGo Instant Answer API

**Endpoint:** `GET /`

**Query Parameters:**
```http
GET /?q={QUERY}&format=json&no_html=1&skip_disambig=1
```

**Response:**
```json
{
  "Abstract": "Descripción del resultado",
  "AbstractSource": "Fuente de la descripción",
  "AbstractText": "Texto de la descripción",
  "AbstractURL": "https://ejemplo.com",
  "Answer": "Respuesta directa",
  "AnswerType": "tipo_de_respuesta",
  "Definition": "Definición si aplica",
  "DefinitionSource": "Fuente de la definición",
  "DefinitionURL": "https://ejemplo.com/definicion",
  "Entity": "Entidad relacionada",
  "Heading": "Título principal",
  "Image": "https://ejemplo.com/imagen.jpg",
  "ImageHeight": 300,
  "ImageWidth": 400,
  "Infobox": {},
  "Redirect": "",
  "RelatedTopics": [],
  "Results": [],
  "Type": "A"
}
```

**Rate Limits:**
- **Free Tier:** No rate limits
- **Cost:** Free

#### Wikipedia API

**Endpoint:** `GET /page/summary/{title}`

**Response:**
```json
{
  "type": "standard",
  "title": "Título del artículo",
  "displaytitle": "Título de visualización",
  "namespace": {
    "id": 0,
    "text": ""
  },
  "wikibase_item": "Q12345",
  "titles": {
    "canonical": "Título canónico",
    "normalized": "Título normalizado",
    "display": "Título de visualización"
  },
  "pageid": 12345,
  "lang": "es",
  "dir": "ltr",
  "revision": "123456789",
  "tid": "2024-01-01T00:00:00Z",
  "timestamp": "2024-01-01T00:00:00Z",
  "description": "Descripción del artículo",
  "description_source": "local",
  "content_urls": {
    "desktop": {
      "page": "https://es.wikipedia.org/wiki/Título",
      "revisions": "https://es.wikipedia.org/w/index.php?title=Título&action=history",
      "edit": "https://es.wikipedia.org/w/index.php?title=Título&action=edit",
      "talk": "https://es.wikipedia.org/wiki/Discusión:Título"
    }
  },
  "extract": "Extracto del artículo...",
  "extract_html": "<p>Extracto HTML del artículo...</p>"
}
```

**Rate Limits:**
- **Free Tier:** No rate limits
- **Cost:** Free

### 4. Internal Plugin APIs

#### Note Analysis API

**Endpoint:** `POST /api/analyze-note`

**Request Body:**
```typescript
interface AnalyzeNoteRequest {
  notePath: string;
  aiModel: 'claude' | 'gemini';
  analysisType: 'content' | 'structure' | 'relationships' | 'full';
  includeContext: boolean;
  privacyLevel: 'public' | 'private' | 'sensitive';
}
```

**Response:**
```typescript
interface AnalyzeNoteResponse {
  success: boolean;
  analysis: {
    note: ObsidianNote;
    aiInsights: AIInsight[];
    suggestions: AISuggestion[];
    relationships: NoteRelationship[];
    metadata: NoteMetadata;
  };
  performance: {
    analysisTime: number;
    tokensUsed: number;
    cost: number;
  };
  privacy: {
    sensitiveContentDetected: boolean;
    accessLevel: string;
    recommendations: string[];
  };
}
```

#### Chat API

**Endpoint:** `POST /api/chat`

**Request Body:**
```typescript
interface ChatRequest {
  message: string;
  aiModel: 'claude' | 'gemini';
  context: {
    currentNote?: ObsidianNote;
    conversationHistory?: ChatMessage[];
    vaultContext?: VaultContext;
  };
  options: {
    includeWebSearch: boolean;
    searchSources: SearchSource[];
    generateDiagram: boolean;
    privacyLevel: PrivacyLevel;
  };
}
```

**Response:**
```typescript
interface ChatResponse {
  success: boolean;
  response: {
    message: string;
    aiModel: string;
    timestamp: Date;
    tokensUsed: number;
    cost: number;
  };
  context: {
    relatedNotes: ObsidianNote[];
    webSearchResults?: WebSearchResult[];
    diagram?: GeneratedDiagram;
    suggestions: AISuggestion[];
  };
  metadata: {
    responseTime: number;
    confidence: number;
    sources: string[];
  };
}
```

#### Vault Analysis API

**Endpoint:** `POST /api/analyze-vault`

**Request Body:**
```typescript
interface AnalyzeVaultRequest {
  analysisScope: 'full' | 'incremental' | 'specific-folders';
  folders?: string[];
  includeArchived: boolean;
  aiModel: 'claude' | 'gemini';
  background: boolean;
}
```

**Response:**
```typescript
interface AnalyzeVaultResponse {
  success: boolean;
  analysis: {
    vaultStats: VaultStats;
    noteAnalysis: NoteAnalysis[];
    insights: VaultInsight[];
    recommendations: VaultRecommendation[];
    relationships: VaultRelationship[];
  };
  performance: {
    totalTime: number;
    notesProcessed: number;
    averageTimePerNote: number;
    totalCost: number;
  };
  progress?: {
    current: number;
    total: number;
    percentage: number;
    estimatedTimeRemaining: number;
  };
}
```

### 5. Error Handling

#### Standard Error Response
```typescript
interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
    timestamp: Date;
    requestId: string;
  };
}
```

#### Error Codes
```typescript
enum ErrorCodes {
  // AI Service Errors
  AI_SERVICE_UNAVAILABLE = 'AI_SERVICE_UNAVAILABLE',
  AI_RATE_LIMIT_EXCEEDED = 'AI_RATE_LIMIT_EXCEEDED',
  AI_INVALID_API_KEY = 'AI_INVALID_API_KEY',
  AI_QUOTA_EXCEEDED = 'AI_QUOTA_EXCEEDED',
  
  // Note Analysis Errors
  NOTE_NOT_FOUND = 'NOTE_NOT_FOUND',
  NOTE_ACCESS_DENIED = 'NOTE_ACCESS_DENIED',
  NOTE_TOO_LARGE = 'NOTE_TOO_LARGE',
  NOTE_PARSE_ERROR = 'NOTE_PARSE_ERROR',
  
  // Privacy & Security Errors
  SENSITIVE_CONTENT_DETECTED = 'SENSITIVE_CONTENT_DETECTED',
  PRIVACY_VIOLATION = 'PRIVACY_VIOLATION',
  ENCRYPTION_ERROR = 'ENCRYPTION_ERROR',
  
  // Performance Errors
  ANALYSIS_TIMEOUT = 'ANALYSIS_TIMEOUT',
  MEMORY_LIMIT_EXCEEDED = 'MEMORY_LIMIT_EXCEEDED',
  BACKGROUND_ANALYSIS_FAILED = 'BACKGROUND_ANALYSIS_FAILED',
  
  // General Errors
  INVALID_REQUEST = 'INVALID_REQUEST',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR'
}
```

#### Retry Logic
```typescript
interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryableErrors: string[];
}

class RetryManager {
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    config: RetryConfig
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (attempt === config.maxRetries || 
            !this.isRetryableError(error, config.retryableErrors)) {
          throw error;
        }
        
        const delay = this.calculateDelay(attempt, config);
        await this.sleep(delay);
      }
    }
    
    throw lastError!;
  }
}
```

### 6. Rate Limiting & Cost Management

#### Rate Limiting Strategy
```typescript
class RateLimiter {
  private requests: Map<string, number[]>;
  private limits: RateLimitConfig;
  
  async checkLimit(identifier: string): Promise<boolean> {
    const now = Date.now();
    const windowStart = now - this.limits.windowMs;
    
    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, []);
    }
    
    const requests = this.requests.get(identifier)!;
    const validRequests = requests.filter(time => time > windowStart);
    
    if (validRequests.length >= this.limits.maxRequests) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return true;
  }
}
```

#### Cost Tracking
```typescript
class CostTracker {
  private costs: Map<string, CostRecord[]>;
  private budgets: Map<string, number>;
  
  async estimateCost(prompt: string, model: string): Promise<number> {
    const tokenCount = await this.countTokens(prompt);
    const costPerToken = this.getCostPerToken(model);
    
    return tokenCount * costPerToken;
  }
  
  async recordCost(response: AIResponse): Promise<void> {
    const cost = await this.calculateCost(response);
    const record: CostRecord = {
      timestamp: new Date(),
      model: response.model,
      cost,
      tokens: response.usage
    };
    
    if (!this.costs.has(response.model)) {
      this.costs.set(response.model, []);
    }
    
    this.costs.get(response.model)!.push(record);
    
    // Check budget limits
    await this.checkBudgetLimits(response.model);
  }
}
```

### 7. WebSocket Support (Future)

#### Real-time Communication
```typescript
interface WebSocketMessage {
  type: 'analysis_progress' | 'chat_message' | 'system_notification';
  payload: any;
  timestamp: Date;
  messageId: string;
}

class WebSocketManager {
  private ws: WebSocket;
  private messageHandlers: Map<string, MessageHandler>;
  
  async sendMessage(message: WebSocketMessage): Promise<void> {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }
  
  onMessage(handler: MessageHandler): void {
    this.messageHandlers.set(handler.type, handler);
  }
}
```

### 8. API Versioning

#### Version Strategy
- **Current Version:** v1.0.0
- **Versioning Scheme:** Semantic Versioning (MAJOR.MINOR.PATCH)
- **Deprecation Policy:** 6 months notice for breaking changes
- **Backward Compatibility:** Maintained for at least 2 major versions

#### Version Headers
```http
X-API-Version: 1.0.0
X-API-Deprecated: false
X-API-Sunset-Date: null
```

### 9. API Documentation Tools

#### OpenAPI/Swagger
```yaml
openapi: 3.0.0
info:
  title: Obsidian AI Assistant Plugin API
  version: 1.0.0
  description: API para el plugin de asistente de IA de Obsidian
servers:
  - url: https://api.obsidian-ai-assistant.com/v1
    description: Production server
paths:
  /analyze-note:
    post:
      summary: Analizar una nota específica
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AnalyzeNoteRequest'
      responses:
        '200':
          description: Análisis exitoso
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AnalyzeNoteResponse'
```

#### Postman Collection
```json
{
  "info": {
    "name": "Obsidian AI Assistant API",
    "description": "Colección de Postman para el plugin de Obsidian",
    "version": "1.0.0"
  },
  "item": [
    {
      "name": "Analyze Note",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"notePath\": \"/path/to/note.md\",\n  \"aiModel\": \"claude\",\n  \"analysisType\": \"full\"\n}"
        },
        "url": {
          "raw": "{{base_url}}/api/analyze-note",
          "host": ["{{base_url}}"],
          "path": ["api", "analyze-note"]
        }
      }
    }
  ]
}
```
