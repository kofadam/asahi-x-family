// scripts/deploy.js

/**
 * Deployment script for GitHub Pages with PWA optimization
 */
const fs = require('fs-extra');
const path = require('path');

class DeploymentManager {
  constructor() {
    this.buildDir = path.join(__dirname, '../build');
    this.contentDir = path.join(__dirname, '../content');
  }

  async prepareBuild() {
    console.log('🌅 Preparing Asahi x Family for deployment...');
    
    // Validate all content before deployment
    await this.validateContent();
    
    // Optimize content for production
    await this.optimizeContent();
    
    // Generate sitemap for SEO
    await this.generateSitemap();
    
    // Prepare PWA assets
    await this.preparePWAAssets();
    
    console.log('✅ Build prepared successfully!');
  }

  async validateContent() {
    console.log('Validating cultural content...');
    
    const contentValidator = require('./validate-content.js');
    const validationResults = await contentValidator.validateAllContent();
    
    if (!validationResults.passed) {
      console.error('❌ Content validation failed:');
      validationResults.errors.forEach(error => console.error(`  - ${error}`));
      process.exit(1);
    }
    
    console.log(`✅ Content validation passed (Cultural Accuracy: ${validationResults.culturalAccuracyScore}%)`);
  }

  async optimizeContent() {
    console.log('Optimizing content for production...');
    
    // Compress images
    await this.optimizeImages();
    
    // Minify JSON content
    await this.minifyContentFiles();
    
    // Generate content manifest for offline caching
    await this.generateContentManifest();
    
    console.log('✅ Content optimization complete');
  }

  async generateSitemap() {
    const lessons = await this.loadAllLessons();
    const scenarios = await this.loadAllScenarios();
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kofadam.github.io/asahi-x-family/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${lessons.map(lesson => `
  <url>
    <loc>https://kofadam.github.io/asahi-x-family/lessons/${lesson.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

    await fs.writeFile(path.join(this.buildDir, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated');
  }

  async preparePWAAssets() {
    console.log('Preparing PWA assets...');
    
    // Ensure service worker is properly configured
    await this.validateServiceWorker();
    
    // Generate app icons if needed
    await this.generateAppIcons();
    
    // Create offline fallback page
    await this.createOfflinePage();
    
    console.log('✅ PWA assets ready');
  }
}

// Run deployment preparation
if (require.main === module) {
  const deployment = new DeploymentManager();
  deployment.prepareBuild().catch(console.error);
}

module.exports = DeploymentManager;