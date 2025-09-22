#!/bin/bash

# Asahi x Family - Complete Directory Structure Setup Script
# This script creates the full directory structure for the project

echo "🌅 Creating Asahi x Family directory structure..."

# Main project directory (assuming we're already in it)
PROJECT_ROOT="."

# Create main directories
echo "Creating main directories..."
mkdir -p "$PROJECT_ROOT/.github/workflows"
mkdir -p "$PROJECT_ROOT/.github/ISSUE_TEMPLATE"
mkdir -p "$PROJECT_ROOT/public/icons"
mkdir -p "$PROJECT_ROOT/public/screenshots"

# Create src directory structure
echo "Creating src directory structure..."
mkdir -p "$PROJECT_ROOT/src/components/core"
mkdir -p "$PROJECT_ROOT/src/components/learning"
mkdir -p "$PROJECT_ROOT/src/components/gamification"
mkdir -p "$PROJECT_ROOT/src/components/spaced-repetition"
mkdir -p "$PROJECT_ROOT/src/components/shared"
mkdir -p "$PROJECT_ROOT/src/hooks"
mkdir -p "$PROJECT_ROOT/src/contexts"
mkdir -p "$PROJECT_ROOT/src/utils"
mkdir -p "$PROJECT_ROOT/src/data/schemas"
mkdir -p "$PROJECT_ROOT/src/styles/components"
mkdir -p "$PROJECT_ROOT/src/__tests__/components"
mkdir -p "$PROJECT_ROOT/src/__tests__/utils"
mkdir -p "$PROJECT_ROOT/src/__tests__/integration"
mkdir -p "$PROJECT_ROOT/src/config"

# Create content directory structure
echo "Creating content directory structure..."
mkdir -p "$PROJECT_ROOT/content/lessons/01-cultural-awareness"
mkdir -p "$PROJECT_ROOT/content/lessons/02-katakana-mastery"
mkdir -p "$PROJECT_ROOT/content/lessons/03-stranger-interactions"
mkdir -p "$PROJECT_ROOT/content/lessons/04-confidence-building"
mkdir -p "$PROJECT_ROOT/content/scenarios/basic"
mkdir -p "$PROJECT_ROOT/content/scenarios/intermediate"
mkdir -p "$PROJECT_ROOT/content/scenarios/advanced"
mkdir -p "$PROJECT_ROOT/content/achievements"
mkdir -p "$PROJECT_ROOT/content/cultural-explanations"
mkdir -p "$PROJECT_ROOT/content/schemas"

# Create docs directory structure
echo "Creating docs directory structure..."
mkdir -p "$PROJECT_ROOT/docs"

# Create scripts directory
echo "Creating scripts directory..."
mkdir -p "$PROJECT_ROOT/scripts"

# Create tests directory structure
echo "Creating tests directory structure..."
mkdir -p "$PROJECT_ROOT/tests/components"
mkdir -p "$PROJECT_ROOT/tests/utils"
mkdir -p "$PROJECT_ROOT/tests/integration"
mkdir -p "$PROJECT_ROOT/tests/content"

# Create placeholder files to preserve directory structure in git
echo "Creating placeholder files..."

# GitHub templates
touch "$PROJECT_ROOT/.github/pull_request_template.md"
touch "$PROJECT_ROOT/.github/ISSUE_TEMPLATE/bug_report.md"
touch "$PROJECT_ROOT/.github/ISSUE_TEMPLATE/feature_request.md"
touch "$PROJECT_ROOT/.github/ISSUE_TEMPLATE/cultural_content.md"
touch "$PROJECT_ROOT/.github/ISSUE_TEMPLATE/scenario_contribution.md"
touch "$PROJECT_ROOT/.github/workflows/ci.yml"
touch "$PROJECT_ROOT/.github/workflows/content-validation.yml"
touch "$PROJECT_ROOT/.github/workflows/deploy.yml"

# Public files
touch "$PROJECT_ROOT/public/index.html"
touch "$PROJECT_ROOT/public/manifest.json"
touch "$PROJECT_ROOT/public/sw.js"
touch "$PROJECT_ROOT/public/offline.html"
touch "$PROJECT_ROOT/public/icons/.gitkeep"
touch "$PROJECT_ROOT/public/screenshots/.gitkeep"

# Core components
touch "$PROJECT_ROOT/src/components/core/Layout.jsx"
touch "$PROJECT_ROOT/src/components/core/Navigation.jsx"
touch "$PROJECT_ROOT/src/components/core/ProgressIndicator.jsx"

# Learning components
touch "$PROJECT_ROOT/src/components/learning/LessonContainer.jsx"
touch "$PROJECT_ROOT/src/components/learning/ScenarioPlayer.jsx"
touch "$PROJECT_ROOT/src/components/learning/CulturalExplainer.jsx"
touch "$PROJECT_ROOT/src/components/learning/InteractionPractice.jsx"

# Gamification components
touch "$PROJECT_ROOT/src/components/gamification/AchievementSystem.jsx"
touch "$PROJECT_ROOT/src/components/gamification/StreakTracker.jsx"
touch "$PROJECT_ROOT/src/components/gamification/ProgressVisualization.jsx"

# Spaced repetition components
touch "$PROJECT_ROOT/src/components/spaced-repetition/ReviewScheduler.jsx"
touch "$PROJECT_ROOT/src/components/spaced-repetition/FSRSEngine.jsx"
touch "$PROJECT_ROOT/src/components/spaced-repetition/ReviewSession.jsx"

# Shared components
touch "$PROJECT_ROOT/src/components/shared/Button.jsx"
touch "$PROJECT_ROOT/src/components/shared/Card.jsx"
touch "$PROJECT_ROOT/src/components/shared/Modal.jsx"
touch "$PROJECT_ROOT/src/components/shared/LoadingSpinner.jsx"

# Hooks
touch "$PROJECT_ROOT/src/hooks/useLocalStorage.js"
touch "$PROJECT_ROOT/src/hooks/useSpacedRepetition.js"
touch "$PROJECT_ROOT/src/hooks/useProgress.js"
touch "$PROJECT_ROOT/src/hooks/useCulturalScenarios.js"
touch "$PROJECT_ROOT/src/hooks/useAchievements.js"
touch "$PROJECT_ROOT/src/hooks/useStreak.js"

# Contexts
touch "$PROJECT_ROOT/src/contexts/LearningContext.jsx"
touch "$PROJECT_ROOT/src/contexts/ProgressContext.jsx"
touch "$PROJECT_ROOT/src/contexts/SettingsContext.jsx"
touch "$PROJECT_ROOT/src/contexts/AppContext.jsx"

# Utils
touch "$PROJECT_ROOT/src/utils/fsrs.js"
touch "$PROJECT_ROOT/src/utils/culturalValidation.js"
touch "$PROJECT_ROOT/src/utils/progressCalculations.js"
touch "$PROJECT_ROOT/src/utils/contentLoader.js"
touch "$PROJECT_ROOT/src/utils/achievementSystem.js"
touch "$PROJECT_ROOT/src/utils/streakSystem.js"
touch "$PROJECT_ROOT/src/utils/adaptiveDifficulty.js"
touch "$PROJECT_ROOT/src/utils/contentValidation.js"

# Data files
touch "$PROJECT_ROOT/src/data/achievements.json"
touch "$PROJECT_ROOT/src/data/culturalPrinciples.json"
touch "$PROJECT_ROOT/src/data/schemas/userProgress.js"
touch "$PROJECT_ROOT/src/data/schemas/content.js"
touch "$PROJECT_ROOT/src/data/schemas/achievements.js"

# Config
touch "$PROJECT_ROOT/src/config/environment.js"

# Styles
touch "$PROJECT_ROOT/src/styles/index.css"
touch "$PROJECT_ROOT/src/styles/components/.gitkeep"

# Main app files
touch "$PROJECT_ROOT/src/App.jsx"
touch "$PROJECT_ROOT/src/index.js"

# Content structure
touch "$PROJECT_ROOT/content/lessons/01-cultural-awareness/lesson.json"
touch "$PROJECT_ROOT/content/lessons/01-cultural-awareness/scenarios.json"
touch "$PROJECT_ROOT/content/lessons/01-cultural-awareness/cultural-context.md"
touch "$PROJECT_ROOT/content/lessons/schema.json"
touch "$PROJECT_ROOT/content/scenarios/schema.json"
touch "$PROJECT_ROOT/content/achievements/achievements.json"
touch "$PROJECT_ROOT/content/cultural-explanations/principles.md"

# Schema files
touch "$PROJECT_ROOT/content/schemas/lesson.json"
touch "$PROJECT_ROOT/content/schemas/scenario.json"
touch "$PROJECT_ROOT/content/schemas/achievement.json"
touch "$PROJECT_ROOT/content/schemas/cultural-explanation.json"

# Documentation
touch "$PROJECT_ROOT/docs/ARCHITECTURE.md"
touch "$PROJECT_ROOT/docs/CULTURAL_GUIDELINES.md"
touch "$PROJECT_ROOT/docs/CONTENT_CREATION.md"
touch "$PROJECT_ROOT/docs/DEVELOPMENT_SETUP.md"
touch "$PROJECT_ROOT/docs/DEPLOYMENT.md"
touch "$PROJECT_ROOT/docs/API_REFERENCE.md"

# Scripts
touch "$PROJECT_ROOT/scripts/build-content.js"
touch "$PROJECT_ROOT/scripts/validate-content.js"
touch "$PROJECT_ROOT/scripts/generate-schemas.js"
touch "$PROJECT_ROOT/scripts/setup-dev.js"
touch "$PROJECT_ROOT/scripts/cultural-accuracy-check.js"
touch "$PROJECT_ROOT/scripts/deploy.js"

# Test files
touch "$PROJECT_ROOT/tests/components/Layout.test.js"
touch "$PROJECT_ROOT/tests/components/LessonContainer.test.js"
touch "$PROJECT_ROOT/tests/utils/fsrs.test.js"
touch "$PROJECT_ROOT/tests/utils/culturalValidation.test.js"
touch "$PROJECT_ROOT/tests/integration/learning-flow.test.js"
touch "$PROJECT_ROOT/tests/content/cultural-accuracy.test.js"

# Root configuration files
touch "$PROJECT_ROOT/package.json"
touch "$PROJECT_ROOT/README.md"
touch "$PROJECT_ROOT/LICENSE"
touch "$PROJECT_ROOT/CONTRIBUTING.md"
touch "$PROJECT_ROOT/.gitignore"
touch "$PROJECT_ROOT/.eslintrc.js"
touch "$PROJECT_ROOT/jest.config.js"
touch "$PROJECT_ROOT/tailwind.config.js"
touch "$PROJECT_ROOT/vite.config.js"

echo ""
echo "✅ Directory structure created successfully!"
echo ""
echo "📁 Project structure summary:"
echo "   📂 .github/          - GitHub templates and workflows"
echo "   📂 public/           - Static assets and PWA files"
echo "   📂 src/              - React application source code"
echo "   📂 content/          - Learning content (lessons, scenarios)"
echo "   📂 docs/             - Project documentation"
echo "   📂 scripts/          - Build and utility scripts"
echo "   📂 tests/            - Test files"
echo ""
echo "🚀 Next steps:"
echo "   1. Initialize git repository: git init"
echo "   2. Create package.json with dependencies"
echo "   3. Start implementing components and content"
echo "   4. Set up GitHub repository and push code"
echo ""
echo "🌅 Ready to build Asahi x Family!"