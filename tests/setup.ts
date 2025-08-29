import '@testing-library/jest-dom';

// Mock Obsidian API
global.obsidian = {
  Plugin: class MockPlugin {
    constructor() {}
    onload() {}
    onunload() {}
  },
  PluginSettingTab: class MockSettingTab {
    constructor() {}
    display() {}
  },
  App: class MockApp {
    vault = {
      getMarkdownFiles: jest.fn(),
      getAbstractFileByPath: jest.fn(),
      create: jest.fn(),
      modify: jest.fn(),
      delete: jest.fn()
    };
    workspace = {
      getActiveFile: jest.fn(),
      getActiveLeaf: jest.fn(),
      onLayoutReady: jest.fn(),
      onFileOpen: jest.fn(),
      onFileClose: jest.fn()
    };
  },
  TFile: class MockTFile {
    constructor(public path: string, public name: string) {}
  },
  TFolder: class MockTFolder {
    constructor(public path: string, public name: string) {}
  },
  Notice: jest.fn(),
  Modal: class MockModal {
    constructor() {}
    open() {}
    close() {}
  },
  Setting: class MockSetting {
    constructor() {}
    setName() { return this; }
    setDesc() { return this; }
    addText() { return this; }
    addToggle() { return this; }
    addDropdown() { return this; }
    addButton() { return this; }
  }
};

// Mock crypto API for Node.js environment
if (typeof global.crypto === 'undefined') {
  global.crypto = require('crypto').webcrypto;
}

// Mock fetch API
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock console methods in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
