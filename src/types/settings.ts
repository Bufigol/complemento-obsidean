export interface PluginSettings {
  // AI Model Configuration
  aiModels: {
    claude: {
      enabled: boolean;
      apiKey: string;
      model: string;
      maxTokens: number;
      temperature: number;
      costLimit: number;
    };
    gemini: {
      enabled: boolean;
      apiKey: string;
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
    analysisInterval: number; // minutes
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

export type SearchSource = 
  | 'google'
  | 'duckduckgo'
  | 'wikipedia'
  | 'bing'
  | 'brave'
  | 'serpapi';

export interface AISettings {
  model: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export interface ClaudeSettings extends AISettings {
  systemPrompt: string;
  anthropicVersion: string;
}

export interface GeminiSettings extends AISettings {
  topK: number;
  candidateCount: number;
  stopSequences: string[];
}

export interface PrivacySettings {
  sensitiveContentDetection: boolean;
  noteAccessControl: 'all' | 'whitelist' | 'blacklist';
  excludedNotes: string[];
  includedNotes: string[];
  exportConversations: boolean;
  conversationFolder: string;
  auditLogging: boolean;
  dataRetentionDays: number;
}

export interface PerformanceSettings {
  backgroundAnalysis: boolean;
  analysisInterval: number;
  cacheEnabled: boolean;
  maxCacheSize: number;
  maxMemoryUsage: number;
  workerThreads: number;
  batchSize: number;
  timeoutMs: number;
}

export interface UISettings {
  autoSuggestions: boolean;
  contextPanel: boolean;
  themeIntegration: boolean;
  chatPanelWidth: number;
  defaultModel: 'claude' | 'gemini';
  showStatusBar: boolean;
  keyboardShortcuts: boolean;
  animations: boolean;
}

export interface SearchSettings {
  defaultSources: SearchSource[];
  maxResults: number;
  includeWikipedia: boolean;
  language: string;
  searchTimeout: number;
  cacheResults: boolean;
}

// Default settings
export const DEFAULT_SETTINGS: PluginSettings = {
  aiModels: {
    claude: {
      enabled: true,
      apiKey: '',
      model: 'claude-3-sonnet-20240229',
      maxTokens: 4096,
      temperature: 0.7,
      costLimit: 10.0, // $10 per month
    },
    gemini: {
      enabled: true,
      apiKey: '',
      model: 'gemini-pro',
      maxTokens: 4096,
      temperature: 0.7,
    },
  },
  privacy: {
    sensitiveContentDetection: true,
    noteAccessControl: 'all',
    excludedNotes: [],
    includedNotes: [],
    exportConversations: true,
    conversationFolder: 'AI Conversations',
  },
  performance: {
    backgroundAnalysis: true,
    analysisInterval: 5, // 5 minutes
    cacheEnabled: true,
    maxCacheSize: 1000,
    maxMemoryUsage: 100, // 100MB
    workerThreads: 4,
  },
  ui: {
    autoSuggestions: true,
    contextPanel: true,
    themeIntegration: true,
    chatPanelWidth: 400,
    defaultModel: 'claude',
  },
  search: {
    defaultSources: ['google', 'duckduckgo', 'wikipedia'],
    maxResults: 10,
    includeWikipedia: true,
    language: 'es',
  },
};
