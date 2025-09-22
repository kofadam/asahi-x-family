# Contributing to Asahi x Family 🌅

Welcome to the Asahi x Family community! We're building something special together - a respectful, effective way to learn Japanese cultural competency through anime-inspired learning.

## Our Mission

Help anime-loving adults become respectful, confident visitors to Japan by bridging the gap between passive cultural recognition and active cultural competency.

## How to Contribute

### 🎌 Cultural Content (Most Needed!)

We need community members who understand Japanese culture to help create and verify content:

**What we need:**
- Cultural scenario creation (daily interactions foreigners encounter)
- Cultural accuracy review of existing content
- Real-world situation documentation
- Respectful explanation of cultural principles

**Requirements:**
- Understanding of Japanese social norms and etiquette
- Commitment to respectful, accurate representation
- Ability to explain cultural concepts clearly to foreign learners

### 💻 Technical Contributions

**Areas we need help with:**
- React component development
- PWA optimization
- Accessibility improvements
- Performance optimization
- Testing and bug fixes

### 🎨 Design and UX

- UI/UX improvements that maintain cultural respect
- Illustration creation (must be original, no copyrighted material)
- User experience testing and feedback
- Accessibility design

## Cultural Content Guidelines

### ✅ What We Want
- Accurate, respectful representation of Japanese culture
- Practical, actionable advice for foreign visitors
- Scenarios based on real-world situations
- Explanations of cultural "why" behind behaviors
- Content that helps users avoid common cultural mistakes

### ❌ What We Don't Want
- Stereotypes or oversimplifications
- Copyrighted material from anime, manga, or other sources
- Judgmental language about either Japanese or foreign behavior
- Content that assumes one "right way" without cultural context
- Advice that could lead to disrespectful behavior

## Content Contribution Process

### 1. Propose Your Content
Create a GitHub issue using our Cultural Content template:
- Describe the cultural scenario or concept
- Explain why it's important for respectful travel
- Provide your cultural background/expertise
- Outline your proposed approach

### 2. Community Discussion
- Community members provide feedback
- Cultural accuracy reviewers weigh in
- Maintainers approve the direction

### 3. Create Content
Follow our content schemas and templates:
- Use provided JSON/Markdown templates
- Include cultural explanations and context
- Provide multiple practice variations
- Follow respectful language guidelines

### 4. Review Process
**Technical Review:** Code quality, structure, integration
**Cultural Review:** Accuracy, respectfulness, appropriateness
**Educational Review:** Learning effectiveness, clarity
**Community Feedback:** Open comment period

### 5. Integration
Approved content gets integrated into the learning system with:
- Attribution for contributors
- Achievement recognition
- Community appreciation

## Technical Guidelines

### Code Standards

#### JavaScript/React Style
```javascript
// Use clear, descriptive names that explain cultural context
const culturalScenario = {
  setting: 'restaurant',
  formalityLevel: 'polite',
  culturalCues: ['quiet atmosphere', 'formal service']
};

// Comment cultural concepts thoroughly
// In Japan, entering a restaurant requires reading social cues
// to determine if seating is assigned or self-selected
const handleRestaurantEntry = (restaurantType, customerCount) => {
  // Wait for host acknowledgment before proceeding
  if (restaurantType === 'traditional') {
    return waitForHostGuidance();
  }
  
  // Modern casual restaurants may allow self-seating
  return checkForSelfSeatingSignage();
};

// Use descriptive variable names for cultural concepts
const appropriateBowDepth = calculateRespectLevel(situation, relationship);
const culturalResponseScore = evaluateAppropriateness(userChoice, context);
```

#### Cultural Code Comments
When implementing cultural features, always explain the cultural reasoning:

```javascript
// Cultural Note: Bowing depth indicates respect level in Japanese culture
// For tourists, a 15-degree nod shows respect without appearing to mock formal customs
const calculateBowAngle = (situation, relationshipLevel) => {
  if (situation === 'shop-entry' && relationshipLevel === 'customer') {
    return 15; // Respectful acknowledgment without over-formality
  }
  
  // Deeper bow for more formal situations
  if (situation === 'temple-visit') {
    return 30; // Shows proper respect for sacred space
  }
  
  return 10; // Default respectful nod
};

// Cultural Context: "Sumimasen" serves multiple functions in Japanese
// It's not just "sorry" - it's a social lubricant for polite interaction
const getSumimasenUsage = (context) => {
  const usageMap = {
    'getting-attention': 'Excuse me (to get attention politely)',
    'minor-apology': 'Sorry (for small inconveniences)',
    'gratitude': 'Thank you (when someone helps you)',
    'passing-through': 'Excuse me (when moving past people)'
  };
  
  return usageMap[context] || 'General polite acknowledgment';
};
```

#### Component Structure Standards
```jsx
// Cultural learning components should follow this pattern
const CulturalScenarioComponent = ({
  scenario,
  onUserChoice,
  onCulturalFeedback
}) => {
  const [userResponse, setUserResponse] = useState(null);
  const [culturalAccuracy, setCulturalAccuracy] = useState(0);
  
  // Always provide cultural context before interaction
  const provideCulturalContext = () => {
    return (
      <div className="cultural-context">
        <h3>Cultural Insight</h3>
        <p>{scenario.culturalBackground}</p>
        <div className="cultural-cues">
          <h4>What to observe:</h4>
          <ul>
            {scenario.culturalCues.map(cue => (
              <li key={cue}>{cue}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  // Evaluate responses for cultural appropriateness, not just correctness
  const evaluateResponse = (choice) => {
    const culturalScore = calculateCulturalAppropriateness(choice, scenario);
    const linguisticScore = evaluateLinguisticCorrectness(choice);
    
    // Weight cultural appropriateness higher than linguistic perfection
    const overallScore = (culturalScore * 0.7) + (linguisticScore * 0.3);
    
    return {
      overall: overallScore,
      cultural: culturalScore,
      linguistic: linguisticScore,
      feedback: generateCulturalFeedback(choice, scenario)
    };
  };
  
  return (
    <div className="cultural-scenario">
      {provideCulturalContext()}
      <ScenarioPresentation scenario={scenario} />
      <InteractionChoices
        choices={scenario.choices}
        onSelect={handleChoice}
        culturalGuidance={true}
      />
      {userResponse && (
        <CulturalFeedback
          response={userResponse}
          culturalAccuracy={culturalAccuracy}
          improvementTips={scenario.culturalTips}
        />
      )}
    </div>
  );
};
```

### File Naming Conventions
- **Components**: PascalCase (`CulturalScenario.jsx`, `StreakTracker.jsx`)
- **Utilities**: camelCase (`culturalValidation.js`, `fsrsAlgorithm.js`)
- **Content**: kebab-case (`reading-the-room.json`, `restaurant-etiquette.md`)
- **Cultural concepts**: Use respectful, descriptive names (`polite-interaction.json`, not `basic-stuff.json`)

### Testing Standards
```javascript
// Cultural learning features need specific testing approaches
describe('Cultural Scenario Evaluation', () => {
  test('should prioritize cultural appropriateness over linguistic perfection', () => {
    const scenario = createTestScenario('restaurant-entry');
    const culturallyAppropriate = { cultural: 0.9, linguistic: 0.6 };
    const linguisticallyPerfect = { cultural: 0.5, linguistic: 1.0 };
    
    const result1 = evaluateResponse(culturallyAppropriate, scenario);
    const result2 = evaluateResponse(linguisticallyPerfect, scenario);
    
    expect(result1.overall).toBeGreaterThan(result2.overall);
  });
  
  test('should provide constructive cultural feedback', () => {
    const inappropriateChoice = { text: 'Hey there!', formality: 'casual' };
    const scenario = { setting: 'formal-shop', expectation: 'polite' };
    
    const feedback = generateCulturalFeedback(inappropriateChoice, scenario);
    
    expect(feedback).toContain('more appropriate');
    expect(feedback).toContain('because');
    expect(feedback).not.toContain('wrong');
    expect(feedback).not.toContain('bad');
  });
});

// Test cultural accuracy of content
describe('Cultural Content Validation', () => {
  test('all scenarios should have cultural explanations', () => {
    const scenarios = loadAllScenarios();
    
    scenarios.forEach(scenario => {
      expect(scenario.culturalExplanation).toBeDefined();
      expect(scenario.culturalExplanation.length).toBeGreaterThan(50);
      expect(scenario.culturalCues).toBeInstanceOf(Array);
      expect(scenario.culturalCues.length).toBeGreaterThan(0);
    });
  });
  
  test('cultural advice should be actionable and specific', () => {
    const culturalTips = loadCulturalTips();
    
    culturalTips.forEach(tip => {
      expect(tip).not.toMatch(/just be polite/i); // Too vague
      expect(tip).not.toMatch(/don't be rude/i); // Unhelpful negative advice
      expect(tip).toMatch(/bow|say|wait|observe|ask/i); // Contains actionable verbs
    });
  });
});
```

### Accessibility Requirements
```javascript
// All interactive elements must be accessible
const AccessibleCulturalButton = ({ onClick, culturalContext, children }) => {
  return (
    <button
      onClick={onClick}
      className="cultural-choice-button"
      aria-label={`Cultural choice: ${culturalContext}`}
      aria-describedby={`cultural-explanation-${culturalContext}`}
    >
      {children}
      <span 
        id={`cultural-explanation-${culturalContext}`}
        className="sr-only"
      >
        This choice demonstrates {culturalContext} in Japanese culture
      </span>
    </button>
  );
};

// Provide screen reader friendly cultural explanations
const CulturalExplanation = ({ principle, context }) => {
  return (
    <div 
      role="complementary"
      aria-label="Cultural learning context"
      className="cultural-explanation"
    >
      <h3 id="cultural-principle">{principle}</h3>
      <div 
        aria-labelledby="cultural-principle"
        className="cultural-details"
      >
        {context}
      </div>
    </div>
  );
};
```

### Performance Guidelines
- **Lazy load** cultural content to improve initial load times
- **Cache** frequently accessed scenarios and cultural explanations
- **Optimize images** used for cultural context (compress, use appropriate formats)
- **Bundle split** by learning modules to allow progressive loading
- **Implement service worker** caching for offline cultural learning

### Internationalization Considerations
```javascript
// Even though we start with English, design for future i18n
const CulturalMessages = {
  en: {
    'bow.explanation': 'Bowing shows respect in Japanese culture',
    'sumimasen.usage': 'Sumimasen can mean excuse me, sorry, or thank you',
    'feedback.culturally-appropriate': 'Excellent cultural awareness!',
    'feedback.needs-improvement': 'Consider the cultural context more carefully'
  },
  // Future: ja, es, fr, etc.
};

// Use keys that make cultural concepts clear
const getCulturalMessage = (key, locale = 'en') => {
  return CulturalMessages[locale]?.[key] || CulturalMessages.en[key];
};
```

## Community Standards

### Respectful Interaction
- Assume positive intent from all contributors
- Cultural discussions should be educational, not judgmental
- Acknowledge when you don't know something
- Credit sources and expertise appropriately

### Quality Over Quantity
- One well-researched cultural scenario beats five superficial ones
- Take time to understand cultural context before contributing
- It's okay to say "I need to research this more"

### Collaborative Learning
- We're all learning together - mistakes are expected and welcomed
- Share resources and learning materials
- Help other contributors improve rather than just criticizing
- Celebrate cultural insights and "aha moments"

## Recognition System

### Contributor Achievements
- **Cultural Contributor:** First accepted cultural content
- **Scenario Creator:** 5 approved scenarios with community rating >4/5
- **Cultural Mentor:** Helps review and improve others' content
- **Technical Champion:** Significant code contributions
- **Community Builder:** Helps newcomers and facilitates discussions
- **Asahi Ambassador:** Outstanding overall contribution to cultural understanding

### Attribution
- All contributors credited in app and documentation
- Major contributors featured in release notes
- Cultural experts acknowledged for their expertise
- Community contributors can earn "Cultural Reviewer" status

## Getting Started

### For Cultural Contributors
1. Read through existing scenarios to understand our approach
2. Check out our Cultural Guidelines documentation
3. Introduce yourself in Discussions - tell us about your cultural background
4. Start with reviewing existing content before creating new content
5. Propose your first contribution in GitHub Issues

### For Technical Contributors
1. Check out the Technical Architecture documentation
2. Set up the development environment using `npm run setup`
3. Look at "good first issue" labeled items
4. Join our technical discussions
5. Make your first pull request!

### Development Setup
```bash
# Clone the repository
git clone https://github.com/kofadam/asahi-x-family.git
cd asahi-x-family

# Install dependencies
npm install

# Set up development environment
npm run setup

# Start development server
npm run dev

# Run tests
npm test

# Validate content
npm run content:validate
```

### For Everyone
- Star the repository to show support
- Share with friends who might be interested
- Use the app and provide feedback
- Report bugs or suggest improvements
- Help us spread the word about respectful cultural learning

## Questions?

- **Cultural questions:** Create a discussion in the Cultural Learning category
- **Technical questions:** Create a discussion in the Technical category
- **General questions:** Create a discussion in General
- **Bug reports:** Use GitHub Issues with the bug template
- **Feature requests:** Use GitHub Issues with the feature template

## Code of Conduct

### Cultural Sensitivity
- Always approach Japanese culture with respect and humility
- Avoid making generalizations or perpetuating stereotypes
- When in doubt about cultural accuracy, ask for help or research more
- Remember that culture is complex and nuanced - simple explanations are often incomplete

### Technical Excellence
- Write code that others can understand and maintain
- Test your contributions thoroughly
- Document cultural concepts clearly
- Follow accessibility guidelines

### Community Guidelines
- Be welcoming to newcomers
- Provide constructive feedback
- Celebrate diverse perspectives and experiences
- Help maintain a positive learning environment

## License

By contributing to Asahi x Family, you agree that your contributions will be licensed under the Apache 2.0 License. All cultural content must be original or properly attributed according to fair use guidelines.

---

**Thank you for helping build something that makes cross-cultural interaction more respectful and enjoyable for everyone! 🌅**

*The Asahi x Family Community*