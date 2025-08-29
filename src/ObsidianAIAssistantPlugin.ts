import { Plugin, PluginSettingTab, Setting, App, Notice } from 'obsidian';
import { AIService } from '@/services/AIService';
import { NoteAnalyzer } from '@/services/NoteAnalyzer';
import { PrivacyManager } from '@/services/PrivacyManager';
import { PerformanceOptimizer } from '@/services/PerformanceOptimizer';
import { SettingsManager } from '@/services/SettingsManager';
import { AIChatPanel } from '@/components/AIChatPanel';
import { PluginSettings } from '@/types/settings';

export class ObsidianAIAssistantPlugin {
  private plugin: Plugin;
  private app: App;
  private settings: PluginSettings;
  private aiService: AIService;
  private noteAnalyzer: NoteAnalyzer;
  private privacyManager: PrivacyManager;
  private performanceOptimizer: PerformanceOptimizer;
  private settingsManager: SettingsManager;
  private chatPanel: AIChatPanel;
  private settingsTab: ObsidianAIAssistantSettingTab;

  constructor(plugin: Plugin) {
    this.plugin = plugin;
    this.app = plugin.app;
  }

  async initialize(): Promise<void> {
    try {
      // Initialize settings
      this.settingsManager = new SettingsManager(this.plugin);
      this.settings = await this.settingsManager.loadSettings();

      // Initialize services
      this.aiService = new AIService(this.settings);
      this.noteAnalyzer = new NoteAnalyzer(this.aiService, this.app);
      this.privacyManager = new PrivacyManager(this.settings);
      this.performanceOptimizer = new PerformanceOptimizer(this.settings);

      // Initialize UI components
      this.chatPanel = new AIChatPanel(this.app, this.aiService, this.noteAnalyzer);
      
      // Register settings tab
      this.settingsTab = new ObsidianAIAssistantSettingTab(this.plugin, this);
      this.plugin.addSettingTab(this.settingsTab);

      // Register commands
      this.registerCommands();

      // Register event listeners
      this.registerEventListeners();

      // Start background analysis if enabled
      if (this.settings.performance.backgroundAnalysis) {
        await this.performanceOptimizer.startBackgroundAnalysis();
      }

      console.log('Obsidian AI Assistant Plugin initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Obsidian AI Assistant Plugin:', error);
      throw error;
    }
  }

  private registerCommands(): void {
    // Register command palette commands
    this.plugin.addCommand({
      id: 'ai-assistant-open-chat',
      name: 'Open AI Chat',
      callback: () => this.chatPanel.open(),
    });

    this.plugin.addCommand({
      id: 'ai-assistant-analyze-note',
      name: 'Analyze Current Note',
      callback: async () => {
        const activeFile = this.app.workspace.getActiveFile();
        if (activeFile) {
          await this.noteAnalyzer.analyzeNote(activeFile.path);
        } else {
          new Notice('No active note to analyze');
        }
      },
    });

    this.plugin.addCommand({
      id: 'ai-assistant-analyze-vault',
      name: 'Analyze Entire Vault',
      callback: async () => {
        await this.noteAnalyzer.analyzeVault();
      },
    });

    this.plugin.addCommand({
      id: 'ai-assistant-settings',
      name: 'Open AI Assistant Settings',
      callback: () => this.settingsTab.open(),
    });
  }

  private registerEventListeners(): void {
    // Listen for file changes
    this.app.workspace.on('file-open', async (file) => {
      if (file && this.settings.ui.autoSuggestions) {
        // Auto-analyze note when opened
        setTimeout(async () => {
          try {
            await this.noteAnalyzer.analyzeNote(file.path);
          } catch (error) {
            console.error('Auto-analysis failed:', error);
          }
        }, 1000); // Delay to avoid blocking UI
      }
    });

    // Listen for file modifications
    this.app.vault.on('modify', async (file) => {
      if (this.settings.performance.backgroundAnalysis) {
        // Queue note for background analysis
        this.performanceOptimizer.queueNoteForAnalysis(file.path);
      }
    });
  }

  async cleanup(): Promise<void> {
    try {
      // Stop background analysis
      if (this.performanceOptimizer) {
        await this.performanceOptimizer.stopBackgroundAnalysis();
      }

      // Close chat panel
      if (this.chatPanel) {
        this.chatPanel.close();
      }

      // Save settings
      if (this.settingsManager) {
        await this.settingsManager.saveSettings(this.settings);
      }

      console.log('Obsidian AI Assistant Plugin cleaned up successfully');
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }

  // Getter methods for external access
  getAIService(): AIService {
    return this.aiService;
  }

  getNoteAnalyzer(): NoteAnalyzer {
    return this.noteAnalyzer;
  }

  getSettings(): PluginSettings {
    return this.settings;
  }

  async updateSettings(newSettings: Partial<PluginSettings>): Promise<void> {
    this.settings = { ...this.settings, ...newSettings };
    await this.settingsManager.saveSettings(this.settings);
    
    // Reinitialize services with new settings
    this.aiService.updateSettings(this.settings);
    this.privacyManager.updateSettings(this.settings);
    this.performanceOptimizer.updateSettings(this.settings);
  }
}

// Settings Tab for the plugin
class ObsidianAIAssistantSettingTab extends PluginSettingTab {
  plugin: ObsidianAIAssistantPlugin;

  constructor(plugin: Plugin, aiPlugin: ObsidianAIAssistantPlugin) {
    super(plugin.app, plugin);
    this.plugin = aiPlugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'AI Assistant Settings' });

    // AI Models Section
    this.createAIModelsSection(containerEl);

    // Privacy Section
    this.createPrivacySection(containerEl);

    // Performance Section
    this.createPerformanceSection(containerEl);

    // UI Section
    this.createUISection(containerEl);
  }

  private createAIModelsSection(containerEl: HTMLElement): void {
    containerEl.createEl('h3', { text: 'AI Models' });

    // Claude Configuration
    new Setting(containerEl)
      .setName('Claude API Key')
      .setDesc('Enter your Claude API key')
      .addText(text => text
        .setPlaceholder('sk-...')
        .setValue(this.plugin.getSettings().aiModels.claude.apiKey)
        .onChange(async (value) => {
          const settings = this.plugin.getSettings();
          settings.aiModels.claude.apiKey = value;
          await this.plugin.updateSettings(settings);
        }));

    new Setting(containerEl)
      .setName('Enable Claude')
      .setDesc('Enable Claude AI model')
      .addToggle(toggle => toggle
        .setValue(this.plugin.getSettings().aiModels.claude.enabled)
        .onChange(async (value) => {
          const settings = this.plugin.getSettings();
          settings.aiModels.claude.enabled = value;
          await this.plugin.updateSettings(settings);
        }));

    // Gemini Configuration
    new Setting(containerEl)
      .setName('Gemini API Key')
      .setDesc('Enter your Gemini API key')
      .addText(text => text
        .setPlaceholder('AIza...')
        .setValue(this.plugin.getSettings().aiModels.gemini.apiKey)
        .onChange(async (value) => {
          const settings = this.plugin.getSettings();
          settings.aiModels.gemini.apiKey = value;
          await this.plugin.updateSettings(settings);
        }));

    new Setting(containerEl)
      .setName('Enable Gemini')
      .setDesc('Enable Gemini AI model')
      .addToggle(toggle => toggle
        .setValue(this.plugin.getSettings().aiModels.gemini.enabled)
        .onChange(async (value) => {
          const settings = this.plugin.getSettings();
          settings.aiModels.gemini.enabled = value;
          await this.plugin.updateSettings(settings);
        }));
  }

  private createPrivacySection(containerEl: HTMLElement): void {
    containerEl.createEl('h3', { text: 'Privacy & Security' });

    new Setting(containerEl)
      .setName('Sensitive Content Detection')
      .setDesc('Automatically detect sensitive content in notes')
      .addToggle(toggle => toggle
        .setValue(this.plugin.getSettings().privacy.sensitiveContentDetection)
        .onChange(async (value) => {
          const settings = this.plugin.getSettings();
          settings.privacy.sensitiveContentDetection = value;
          await this.plugin.updateSettings(settings);
        }));

    new Setting(containerEl)
      .setName('Note Access Control')
      .setDesc('Control which notes the AI can access')
      .addDropdown(dropdown => dropdown
        .addOption('all', 'All Notes')
        .addOption('whitelist', 'Whitelist Only')
        .addOption('blacklist', 'Blacklist Only')
        .setValue(this.plugin.getSettings().privacy.noteAccessControl)
        .onChange(async (value) => {
          const settings = this.plugin.getSettings();
          settings.privacy.noteAccessControl = value as any;
          await this.plugin.updateSettings(settings);
        }));
  }

  private createPerformanceSection(containerEl: HTMLElement): void {
    containerEl.createEl('h3', { text: 'Performance' });

    new Setting(containerEl)
      .setName('Background Analysis')
      .setDesc('Enable background analysis of notes')
      .addToggle(toggle => toggle
        .setValue(this.plugin.getSettings().performance.backgroundAnalysis)
        .onChange(async (value) => {
          const settings = this.plugin.getSettings();
          settings.performance.backgroundAnalysis = value;
          await this.plugin.updateSettings(settings);
        }));

    new Setting(containerEl)
      .setName('Cache Enabled')
      .setDesc('Enable response caching for better performance')
      .addToggle(toggle => toggle
        .setValue(this.plugin.getSettings().performance.cacheEnabled)
        .onChange(async (value) => {
          const settings = this.plugin.getSettings();
          settings.performance.cacheEnabled = value;
          await this.plugin.updateSettings(settings);
        }));
  }

  private createUISection(containerEl: HTMLElement): void {
    containerEl.createEl('h3', { text: 'User Interface' });

    new Setting(containerEl)
      .setName('Auto Suggestions')
      .setDesc('Show AI suggestions automatically')
      .addToggle(toggle => toggle
        .setValue(this.plugin.getSettings().ui.autoSuggestions)
        .onChange(async (value) => {
          const settings = this.plugin.getSettings();
          settings.ui.autoSuggestions = value;
          await this.plugin.updateSettings(settings);
        }));

    new Setting(containerEl)
      .setName('Context Panel')
      .setDesc('Show note context panel')
      .addToggle(toggle => toggle
        .setValue(this.plugin.getSettings().ui.contextPanel)
        .onChange(async (value) => {
          const settings = this.plugin.getSettings();
          settings.ui.contextPanel = value;
          await this.plugin.updateSettings(settings);
        }));
  }
}
