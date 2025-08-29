import { Plugin } from 'obsidian';
import { ObsidianAIAssistantPlugin } from './ObsidianAIAssistantPlugin';
import { Notice } from 'obsidian';

export default class ObsidianAIAssistant extends Plugin {
  private aiAssistant: ObsidianAIAssistantPlugin;

  async onload(): Promise<void> {
    console.log('Loading Obsidian AI Assistant plugin...');

    try {
      // Initialize the main plugin class
      this.aiAssistant = new ObsidianAIAssistantPlugin(this);
      await this.aiAssistant.initialize();

      console.log('Obsidian AI Assistant plugin loaded successfully');
    } catch (error) {
      console.error('Failed to load Obsidian AI Assistant plugin:', error);
      new Notice('Failed to load AI Assistant plugin. Check console for details.');
    }
  }

  async onunload(): Promise<void> {
    console.log('Unloading Obsidian AI Assistant plugin...');

    try {
      if (this.aiAssistant) {
        await this.aiAssistant.cleanup();
      }
      console.log('Obsidian AI Assistant plugin unloaded successfully');
    } catch (error) {
      console.error('Error unloading Obsidian AI Assistant plugin:', error);
    }
  }
}
