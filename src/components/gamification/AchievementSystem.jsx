/**
 * Cultural competency achievement tracking and display
 * Focuses on meaningful progress, not arbitrary points
 */
const AchievementSystem = () => {
  const { achievements, progress } = useAchievements();
  const [showDetails, setShowDetails] = useState(false);
  
  const achievementCategories = {
    'cultural-competency': {
      name: 'Cultural Understanding',
      description: 'Master respectful interaction principles',
      color: 'sakura-pink',
      achievements: [
        {
          id: 'respectful-visitor',
          name: 'Respectful Visitor',
          description: 'Complete cultural awareness foundation',
          requirements: ['complete-reading-the-room', 'pass-politeness-assessment'],
          reward: 'Unlock intermediate scenarios',
          cultural_significance: 'Shows commitment to respectful travel'
        }
      ]
    },
    'practical-skills': {
      name: 'Practical Communication',
      description: 'Navigate real-world situations confidently',
      color: 'tokyo-blue',
      achievements: [
        {
          id: 'katakana-navigator',
          name: 'Katakana Navigator',
          description: 'Read 100 katakana words correctly',
          requirements: ['katakana-recognition-100', 'real-world-signs-20'],
          reward: 'Unlock advanced reading practice'
        }
      ]
    }
  };
  
  return (
    <div className="achievement-system">
      <AchievementOverview categories={achievementCategories} />
      <RecentAchievements achievements={achievements.recent} />
      <ProgressVisualization progress={progress} />
    </div>
  );
};