/**
 * Interactive cultural scenario practice system
 * Presents situations, captures user responses, provides cultural feedback
 */
const ScenarioPlayer = ({ scenario, onComplete }) => {
  const [userChoice, setUserChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [culturalScore, setCulturalScore] = useState(0);
  
  const evaluateResponse = (choice) => {
    const culturalAccuracy = calculateCulturalAppropriateness(choice, scenario.context);
    const linguisticAccuracy = evaluateLinguisticCorrectness(choice);
    
    return {
      cultural: culturalAccuracy,
      linguistic: linguisticAccuracy,
      overall: (culturalAccuracy * 0.7) + (linguisticAccuracy * 0.3), // Cultural weighted higher
      feedback: generateCulturalFeedback(choice, scenario)
    };
  };
  
  return (
    <div className="scenario-player">
      <ScenarioContext 
        setting={scenario.setting}
        characters={scenario.characters}
        culturalCues={scenario.culturalCues}
      />
      <InteractionChoices 
        options={scenario.choices}
        onSelect={handleChoice}
        disabled={showFeedback}
      />
      {showFeedback && (
        <CulturalFeedback 
          score={culturalScore}
          explanation={scenario.culturalExplanation}
          improvement={scenario.improvementTips}
        />
      )}
    </div>
  );
};

// Data Interface
interface Scenario {
  id: string;
  context: string;
  setting: 'shop' | 'restaurant' | 'station' | 'street' | 'temple';
  formality: 'casual' | 'polite' | 'formal' | 'very-formal';
  culturalCues: string[];
  characters: Character[];
  choices: InteractionChoice[];
  culturalExplanation: string;
  improvementTips: string[];
}