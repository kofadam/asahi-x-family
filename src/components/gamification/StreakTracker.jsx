/**
 * Sophisticated streak system with cultural context and protection options
 * Leverages loss aversion psychology while maintaining dignity
 */
const StreakTracker = () => {
  const { streakData, protections } = useStreak();
  const [showProtectionOptions, setShowProtectionOptions] = useState(false);
  
  const streakMilestones = [
    { days: 7, name: 'Rising Sun Week', reward: 'Cultural insight unlock' },
    { days: 30, name: 'Cultural Student', reward: 'Advanced scenarios unlock' },
    { days: 100, name: 'Respectful Traveler', reward: 'Community contributor status' }
  ];
  
  const protectionOptions = {
    'cultural-rest': {
      name: 'Cultural Rest Day',
      description: 'Sometimes learning needs reflection time',
      cost: 0, // Free - cultural sensitivity
      available: streakData.current >= 7
    },
    'travel-mode': {
      name: 'Active Travel Mode',
      description: 'Using skills in real Japan counts as practice',
      cost: 0, // Free - practical application
      conditions: 'GPS in Japan or manual activation'
    }
  };
  
  return (
    <div className="streak-tracker">
      <CurrentStreak 
        days={streakData.current}
        nextMilestone={getNextMilestone(streakData.current)}
      />
      <StreakCalendar history={streakData.history} />
      <ProtectionSystem options={protectionOptions} available={protections} />
    </div>
  );
};