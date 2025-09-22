// src/config/environment.js

/**
 * Environment-specific configuration
 */
const config = {
  development: {
    apiBaseUrl: 'http://localhost:3000',
    contentSource: 'local',
    debugMode: true,
    serviceWorkerEnabled: false,
    analytics: false
  },
  
  production: {
    apiBaseUrl: 'https://kofadam.github.io/asahi-x-family',
    contentSource: 'github-pages',
    debugMode: false,
    serviceWorkerEnabled: true,
    analytics: true,
    cachingStrategy: 'aggressive'
  },
  
  shared: {
    appName: 'Asahi x Family',
    version: process.env.REACT_APP_VERSION || '0.1.0',
    culturalThemes: ['traditional', 'modern', 'anime'],
    supportedLanguages: ['en'], // Start with English, expand later
    defaultStudyTime: 15, // Minutes
    streakProtections: 2, // Free protections per week
    offlineCapabilities: true
  }
};

const environment = process.env.NODE_ENV || 'development';
export default { ...config.shared, ...config[environment] };