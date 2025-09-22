#!/usr/bin/env node

/**
 * Cultural Accuracy Check Script for Asahi x Family
 * Validates cultural content for accuracy, respectfulness, and educational value
 * 
 * Location: scripts/cultural-accuracy-check.js
 */

const fs = require('fs-extra');
const path = require('path');
const { ContentCreationGuidelines } = require('../src/data/contentGuidelines.js');

class CulturalAccuracyChecker {
  constructor() {
    this.contentDir = path.join(__dirname, '../content');
    this.reportsDir = path.join(__dirname, '../reports');
    this.culturalKeywords = this.loadCulturalKeywords();
    this.respectfulLanguagePatterns = this.loadRespectfulLanguagePatterns();
    this.commonMisconceptions = this.loadCommonMisconceptions();
    this.results = {
      totalFiles: 0,
      passedFiles: 0,
      failedFiles: 0,
      warningFiles: 0,
      culturalAccuracyScore: 0,
      respectfulnessScore: 0,
      errors: [],
      warnings: [],
      recommendations: []
    };
  }

  /**
   * Main validation function - checks all cultural content
   */
  async validateAllContent() {
    console.log('🌅 Starting Cultural Accuracy Check for Asahi x Family...\n');
    
    try {
      // Ensure reports directory exists
      await fs.ensureDir(this.reportsDir);
      
      // Validate lessons
      await this.validateLessons();
      
      // Validate scenarios  
      await this.validateScenarios();
      
      // Validate cultural explanations
      await this.validateCulturalExplanations();
      
      // Generate comprehensive report
      await this.generateReport();
      
      // Output summary
      this.outputSummary();
      
      return this.results;
      
    } catch (error) {
      console.error('❌ Cultural accuracy check failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Validate lesson content for cultural accuracy
   */
  async validateLessons() {
    console.log('📚 Validating lesson content...');
    
    const lessonsPath = path.join(this.contentDir, 'lessons');
    
    if (!await fs.pathExists(lessonsPath)) {
      this.results.warnings.push('Lessons directory not found');
      return;
    }
    
    const lessonDirs = await fs.readdir(lessonsPath, { withFileTypes: true });
    const lessonFolders = lessonDirs.filter(dirent => dirent.isDirectory());
    
    for (const folder of lessonFolders) {
      const lessonPath = path.join(lessonsPath, folder.name);
      await this.validateLessonContent(lessonPath, folder.name);
    }
  }

  /**
   * Validate individual lesson content
   */
  async validateLessonContent(lessonPath, lessonId) {
    const lessonFile = path.join(lessonPath, 'lesson.json');
    const culturalContextFile = path.join(lessonPath, 'cultural-context.md');
    
    this.results.totalFiles++;
    
    try {
      // Validate lesson JSON
      if (await fs.pathExists(lessonFile)) {
        const lessonContent = await fs.readJSON(lessonFile);
        const lessonValidation = await this.validateLessonStructure(lessonContent, lessonId);
        
        if (!lessonValidation.passed) {
          this.results.failedFiles++;
          this.results.errors.push(...lessonValidation.errors);
        } else if (lessonValidation.warnings.length > 0) {
          this.results.warningFiles++;
          this.results.warnings.push(...lessonValidation.warnings);
        } else {
          this.results.passedFiles++;
        }
        
        // Update accuracy scores
        this.results.culturalAccuracyScore += lessonValidation.culturalAccuracy;
        this.results.respectfulnessScore += lessonValidation.respectfulness;
      }
      
      // Validate cultural context markdown
      if (await fs.pathExists(culturalContextFile)) {
        const contextContent = await fs.readFile(culturalContextFile, 'utf8');
        const contextValidation = await this.validateCulturalContext(contextContent, lessonId);
        
        this.results.warnings.push(...contextValidation.warnings);
        this.results.recommendations.push(...contextValidation.recommendations);
      }
      
    } catch (error) {
      this.results.failedFiles++;
      this.results.errors.push(`Lesson ${lessonId}: ${error.message}`);
    }
  }

  /**
   * Validate lesson structure and cultural content
   */
  async validateLessonStructure(lesson, lessonId) {
    const validation = {
      passed: true,
      errors: [],
      warnings: [],
      culturalAccuracy: 0,
      respectfulness: 0
    };

    // Check required fields
    const requiredFields = ['id', 'title', 'culturalPrinciple', 'learningObjectives', 'scenarios'];
    for (const field of requiredFields) {
      if (!lesson[field]) {
        validation.errors.push(`Lesson ${lessonId}: Missing required field '${field}'`);
        validation.passed = false;
      }
    }

    // Validate cultural principle
    if (lesson.culturalPrinciple) {
      const culturalValidation = this.validateCulturalPrinciple(lesson.culturalPrinciple);
      validation.culturalAccuracy += culturalValidation.accuracy;
      validation.respectfulness += culturalValidation.respectfulness;
      validation.warnings.push(...culturalValidation.warnings);
    }

    // Validate scenarios for cultural appropriateness
    if (lesson.scenarios && Array.isArray(lesson.scenarios)) {
      for (const scenario of lesson.scenarios) {
        const scenarioValidation = this.validateScenarioContent(scenario, lessonId);
        validation.culturalAccuracy += scenarioValidation.culturalAccuracy;
        validation.respectfulness += scenarioValidation.respectfulness;
        validation.warnings.push(...scenarioValidation.warnings);
      }
    }

    // Check for common cultural misconceptions
    const misconceptionCheck = this.checkForMisconceptions(JSON.stringify(lesson));
    if (misconceptionCheck.found.length > 0) {
      validation.warnings.push(`Lesson ${lessonId}: Potential cultural misconceptions detected`);
      validation.culturalAccuracy -= 0.2;
    }

    // Normalize scores
    validation.culturalAccuracy = Math.max(0, Math.min(1, validation.culturalAccuracy));
    validation.respectfulness = Math.max(0, Math.min(1, validation.respectfulness));

    return validation;
  }

  /**
   * Validate cultural principle accuracy
   */
  validateCulturalPrinciple(principle) {
    const validation = {
      accuracy: 0.8, // Start with high base score
      respectfulness: 0.8,
      warnings: []
    };

    // Check for respectful language
    const respectfulnessCheck = this.assessRespectfulLanguage(principle);
    validation.respectfulness = respectfulnessCheck.score;
    validation.warnings.push(...respectfulnessCheck.warnings);

    // Check for cultural depth
    if (principle.length < 50) {
      validation.warnings.push('Cultural principle explanation is too brief for proper understanding');
      validation.accuracy -= 0.1;
    }

    // Check for actionable guidance
    const actionableWords = ['how', 'when', 'why', 'because', 'shows', 'demonstrates', 'indicates'];
    const hasActionableGuidance = actionableWords.some(word => 
      principle.toLowerCase().includes(word)
    );
    
    if (!hasActionableGuidance) {
      validation.warnings.push('Cultural principle should explain how/why/when it applies');
      validation.accuracy -= 0.1;
    }

    return validation;
  }

  /**
   * Validate scenario content for cultural appropriateness
   */
  validateScenarioContent(scenario, lessonId) {
    const validation = {
      culturalAccuracy: 0.8,
      respectfulness: 0.8,
      warnings: []
    };

    // Check for cultural cues
    if (!scenario.culturalCues || scenario.culturalCues.length === 0) {
      validation.warnings.push(`Scenario in lesson ${lessonId}: Missing cultural cues`);
      validation.culturalAccuracy -= 0.2;
    }

    // Check for cultural explanation
    if (!scenario.culturalExplanation) {
      validation.warnings.push(`Scenario in lesson ${lessonId}: Missing cultural explanation`);
      validation.culturalAccuracy -= 0.3;
    } else if (scenario.culturalExplanation.length < 100) {
      validation.warnings.push(`Scenario in lesson ${lessonId}: Cultural explanation too brief`);
      validation.culturalAccuracy -= 0.1;
    }

    // Check choices for cultural appropriateness
    if (scenario.choices && Array.isArray(scenario.choices)) {
      let hasGoodChoice = false;
      let hasBadChoice = false;
      
      for (const choice of scenario.choices) {
        if (choice.culturalAppropriateness > 0.7) hasGoodChoice = true;
        if (choice.culturalAppropriateness < 0.4) hasBadChoice = true;
      }
      
      if (!hasGoodChoice) {
        validation.warnings.push(`Scenario in lesson ${lessonId}: No culturally appropriate choices available`);
        validation.culturalAccuracy -= 0.2;
      }
      
      if (!hasBadChoice) {
        validation.warnings.push(`Scenario in lesson ${lessonId}: Consider adding less appropriate choice for learning contrast`);
      }
    }

    return validation;
  }

  /**
   * Validate scenario files
   */
  async validateScenarios() {
    console.log('🎭 Validating scenario content...');
    
    const scenariosPath = path.join(this.contentDir, 'scenarios');
    
    if (!await fs.pathExists(scenariosPath)) {
      this.results.warnings.push('Scenarios directory not found');
      return;
    }
    
    const scenarioFiles = await this.getAllJsonFiles(scenariosPath);
    
    for (const filePath of scenarioFiles) {
      try {
        const scenarioContent = await fs.readJSON(filePath);
        const filename = path.basename(filePath, '.json');
        
        this.results.totalFiles++;
        
        const validation = this.validateIndependentScenario(scenarioContent, filename);
        
        if (!validation.passed) {
          this.results.failedFiles++;
          this.results.errors.push(...validation.errors);
        } else if (validation.warnings.length > 0) {
          this.results.warningFiles++;
          this.results.warnings.push(...validation.warnings);
        } else {
          this.results.passedFiles++;
        }
        
        this.results.culturalAccuracyScore += validation.culturalAccuracy;
        this.results.respectfulnessScore += validation.respectfulness;
        
      } catch (error) {
        this.results.failedFiles++;
        this.results.errors.push(`Scenario file ${filePath}: ${error.message}`);
      }
    }
  }

  /**
   * Validate independent scenario file
   */
  validateIndependentScenario(scenario, filename) {
    const validation = {
      passed: true,
      errors: [],
      warnings: [],
      culturalAccuracy: 0.8,
      respectfulness: 0.8
    };

    // Check required scenario fields
    const requiredFields = ['id', 'title', 'setting', 'culturalCues', 'culturalExplanation'];
    for (const field of requiredFields) {
      if (!scenario[field]) {
        validation.errors.push(`Scenario ${filename}: Missing required field '${field}'`);
        validation.passed = false;
      }
    }

    // Validate setting appropriateness
    if (scenario.setting) {
      const settingValidation = this.validateScenarioSetting(scenario.setting);
      validation.warnings.push(...settingValidation.warnings);
    }

    // Check for real-world applicability
    if (!scenario.realWorldApplication) {
      validation.warnings.push(`Scenario ${filename}: Missing real-world application guidance`);
      validation.culturalAccuracy -= 0.1;
    }

    return validation;
  }

  /**
   * Validate cultural explanations
   */
  async validateCulturalExplanations() {
    console.log('📖 Validating cultural explanations...');
    
    const explanationsPath = path.join(this.contentDir, 'cultural-explanations');
    
    if (!await fs.pathExists(explanationsPath)) {
      this.results.warnings.push('Cultural explanations directory not found');
      return;
    }
    
    const explanationFiles = await this.getAllMarkdownFiles(explanationsPath);
    
    for (const filePath of explanationFiles) {
      try {
        const content = await fs.readFile(filePath, 'utf8');
        const filename = path.basename(filePath, '.md');
        
        this.results.totalFiles++;
        
        const validation = this.validateCulturalExplanation(content, filename);
        
        if (!validation.passed) {
          this.results.failedFiles++;
          this.results.errors.push(...validation.errors);
        } else if (validation.warnings.length > 0) {
          this.results.warningFiles++;
          this.results.warnings.push(...validation.warnings);
        } else {
          this.results.passedFiles++;
        }
        
        this.results.culturalAccuracyScore += validation.culturalAccuracy;
        this.results.respectfulnessScore += validation.respectfulness;
        
      } catch (error) {
        this.results.failedFiles++;
        this.results.errors.push(`Cultural explanation ${filePath}: ${error.message}`);
      }
    }
  }

  /**
   * Validate cultural explanation content
   */
  validateCulturalExplanation(content, filename) {
    const validation = {
      passed: true,
      errors: [],
      warnings: [],
      culturalAccuracy: 0.8,
      respectfulness: 0.8
    };

    // Check for respectful language
    const respectfulnessCheck = this.assessRespectfulLanguage(content);
    validation.respectfulness = respectfulnessCheck.score;
    validation.warnings.push(...respectfulnessCheck.warnings);

    // Check for cultural depth
    if (content.length < 200) {
      validation.warnings.push(`Cultural explanation ${filename}: Content too brief for proper cultural understanding`);
      validation.culturalAccuracy -= 0.2;
    }

    // Check for actionable advice
    const actionablePatterns = [
      /when you/gi,
      /you should/gi,
      /you can/gi,
      /try to/gi,
      /consider/gi,
      /remember to/gi
    ];
    
    const hasActionableAdvice = actionablePatterns.some(pattern => pattern.test(content));
    
    if (!hasActionableAdvice) {
      validation.warnings.push(`Cultural explanation ${filename}: Should include actionable advice for visitors`);
      validation.culturalAccuracy -= 0.1;
    }

    // Check for source attribution or expertise indication
    const hasAttribution = /source|reference|according to|research|study/i.test(content);
    
    if (!hasAttribution && content.length > 500) {
      validation.warnings.push(`Cultural explanation ${filename}: Consider adding sources or cultural expertise references`);
    }

    return validation;
  }

  /**
   * Assess respectful language usage
   */
  assessRespectfulLanguage(text) {
    const assessment = {
      score: 1.0,
      warnings: []
    };

    // Check for problematic language patterns
    const problematicPatterns = [
      { pattern: /\b(weird|strange|odd)\b/gi, issue: 'Avoid labeling cultural differences as weird/strange' },
      { pattern: /\b(wrong|right)\b/gi, issue: 'Consider cultural context rather than absolute right/wrong' },
      { pattern: /\balways\b/gi, issue: 'Cultural norms often have exceptions - consider "usually" or "typically"' },
      { pattern: /\bnever\b/gi, issue: 'Absolute statements about culture may not account for all contexts' },
      { pattern: /\b(primitive|backward|advanced)\b/gi, issue: 'Avoid language that implies cultural hierarchy' }
    ];

    for (const { pattern, issue } of problematicPatterns) {
      const matches = text.match(pattern);
      if (matches) {
        assessment.score -= 0.1 * matches.length;
        assessment.warnings.push(issue);
      }
    }

    // Check for positive, respectful framing
    const respectfulPatterns = [
      /\b(respect|understanding|appreciate|consider)\b/gi,
      /\b(cultural context|social norms|traditions)\b/gi,
      /\b(visitors can|travelers should|when in japan)\b/gi
    ];

    const respectfulMatches = respectfulPatterns.reduce((count, pattern) => {
      const matches = text.match(pattern);
      return count + (matches ? matches.length : 0);
    }, 0);

    // Bonus for respectful language
    if (respectfulMatches > 3) {
      assessment.score += 0.1;
    }

    assessment.score = Math.max(0, Math.min(1, assessment.score));

    return assessment;
  }

  /**
   * Check for common cultural misconceptions
   */
  checkForMisconceptions(content) {
    const misconceptions = [
      {
        pattern: /all japanese people/gi,
        warning: 'Avoid generalizations about all Japanese people'
      },
      {
        pattern: /japanese always/gi,
        warning: 'Cultural behaviors vary by context and individual'
      },
      {
        pattern: /ancient tradition/gi,
        warning: 'Many "traditions" are actually modern - verify historical accuracy'
      },
      {
        pattern: /samurai|geisha|ninja/gi,
        warning: 'Historical elements should be contextually appropriate for modern travel'
      }
    ];

    const found = [];
    
    for (const { pattern, warning } of misconceptions) {
      if (pattern.test(content)) {
        found.push(warning);
      }
    }

    return { found };
  }

  /**
   * Generate comprehensive report
   */
  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.results.totalFiles,
        passedFiles: this.results.passedFiles,
        failedFiles: this.results.failedFiles,
        warningFiles: this.results.warningFiles,
        passRate: this.results.totalFiles > 0 ? 
          Math.round((this.results.passedFiles / this.results.totalFiles) * 100) : 0
      },
      culturalAccuracy: Math.round(
        (this.results.culturalAccuracyScore / Math.max(1, this.results.totalFiles)) * 100
      ),
      respectfulness: Math.round(
        (this.results.respectfulnessScore / Math.max(1, this.results.totalFiles)) * 100
      ),
      errors: this.results.errors,
      warnings: this.results.warnings,
      recommendations: [
        ...this.results.recommendations,
        ...this.generateRecommendations()
      ]
    };

    // Save report for CI/CD
    await fs.writeJSON(
      path.join(this.reportsDir, 'content-review-report.json'),
      report,
      { spaces: 2 }
    );

    // Save detailed report
    await fs.writeJSON(
      path.join(this.reportsDir, `cultural-accuracy-${Date.now()}.json`),
      { ...report, detailedResults: this.results },
      { spaces: 2 }
    );

    return report;
  }

  /**
   * Generate improvement recommendations
   */
  generateRecommendations() {
    const recommendations = [];

    if (this.results.culturalAccuracyScore / this.results.totalFiles < 0.8) {
      recommendations.push('Consider consulting with Japanese cultural experts for content review');
      recommendations.push('Add more detailed cultural context and explanations');
    }

    if (this.results.respectfulnessScore / this.results.totalFiles < 0.8) {
      recommendations.push('Review language for respectful, non-judgmental tone');
      recommendations.push('Focus on cultural understanding rather than absolute rules');
    }

    if (this.results.warningFiles > this.results.passedFiles) {
      recommendations.push('Address warning items to improve overall content quality');
    }

    return recommendations;
  }

  /**
   * Output summary to console
   */
  outputSummary() {
    const culturalAccuracy = Math.round(
      (this.results.culturalAccuracyScore / Math.max(1, this.results.totalFiles)) * 100
    );
    const respectfulness = Math.round(
      (this.results.respectfulnessScore / Math.max(1, this.results.totalFiles)) * 100
    );

    console.log('\n🌅 Cultural Accuracy Check Summary:');
    console.log(`📁 Total files checked: ${this.results.totalFiles}`);
    console.log(`✅ Passed: ${this.results.passedFiles}`);
    console.log(`⚠️  Warnings: ${this.results.warningFiles}`);
    console.log(`❌ Failed: ${this.results.failedFiles}`);
    console.log(`🎌 Cultural Accuracy: ${culturalAccuracy}%`);
    console.log(`🤝 Respectfulness: ${respectfulness}%`);

    if (this.results.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.results.errors.forEach(error => console.log(`   ${error}`));
    }

    if (this.results.warnings.length > 0 && this.results.warnings.length <= 10) {
      console.log('\n⚠️  Warnings:');
      this.results.warnings.slice(0, 10).forEach(warning => console.log(`   ${warning}`));
      
      if (this.results.warnings.length > 10) {
        console.log(`   ... and ${this.results.warnings.length - 10} more warnings`);
      }
    }

    const overallSuccess = this.results.failedFiles === 0 && culturalAccuracy >= 80;
    
    if (overallSuccess) {
      console.log('\n🎉 Cultural accuracy check passed! Content is ready for respectful learning.');
    } else {
      console.log('\n🔄 Cultural accuracy check needs attention. Please review errors and warnings.');
      
      if (culturalAccuracy < 80) {
        console.log('   Cultural accuracy score is below 80% - consider expert review.');
      }
    }
  }

  /**
   * Load cultural keywords for validation
   */
  loadCulturalKeywords() {
    return [
      'respect', 'harmony', 'group', 'hierarchy', 'politeness',
      'bow', 'gift', 'service', 'quietness', 'consideration',
      'omotenashi', 'tatemae', 'honne', 'wa', 'meishi'
    ];
  }

  /**
   * Load respectful language patterns
   */
  loadRespectfulLanguagePatterns() {
    return {
      positive: ['cultural context', 'respectful', 'understanding', 'appreciate', 'consider'],
      negative: ['weird', 'strange', 'primitive', 'wrong', 'stupid']
    };
  }

  /**
   * Load common misconceptions to check for
   */
  loadCommonMisconceptions() {
    return [
      'All Japanese people bow constantly',
      'Everyone knows martial arts',
      'Everything is about anime and manga',
      'Business cards are sacred objects',
      'Shoes are never worn indoors anywhere'
    ];
  }

  /**
   * Helper: Get all JSON files recursively
   */
  async getAllJsonFiles(directory) {
    const files = [];
    
    const items = await fs.readdir(directory, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(directory, item.name);
      
      if (item.isDirectory()) {
        const subFiles = await this.getAllJsonFiles(fullPath);
        files.push(...subFiles);
      } else if (item.isFile() && item.name.endsWith('.json')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  /**
   * Helper: Get all Markdown files recursively
   */
  async getAllMarkdownFiles(directory) {
    const files = [];
    
    const items = await fs.readdir(directory, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(directory, item.name);
      
      if (item.isDirectory()) {
        const subFiles = await this.getAllMarkdownFiles(fullPath);
        files.push(...subFiles);
      } else if (item.isFile() && (item.name.endsWith('.md') || item.name.endsWith('.markdown'))) {
        files.push(fullPath);
      }
    }
    
    return files;
  }
}

// Run the cultural accuracy check
if (require.main === module) {
  const checker = new CulturalAccuracyChecker();
  checker.validateAllContent()
    .then(results => {
      const culturalAccuracy = Math.round(
        (results.culturalAccuracyScore / Math.max(1, results.totalFiles)) * 100
      );
      
      // Exit with error code if cultural accuracy is too low or there are errors
      if (results.failedFiles > 0 || culturalAccuracy < 70) {
        process.exit(1);
      }
      
      process.exit(0);
    })
    .catch(error => {
      console.error('Cultural accuracy check failed:', error);
      process.exit(1);
    });
}

module.exports = CulturalAccuracyChecker;