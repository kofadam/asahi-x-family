/**
 * Adaptive navigation showing current learning path position
 * Changes based on user progress and available content
 */
const Navigation = () => {
  const { currentModule, unlockedModules, streakData } = useProgress();
  
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, always: true },
    { id: 'learn', label: 'Learn', icon: BookOpen, available: true },
    { id: 'practice', label: 'Practice', icon: Target, requires: 'basic-completion' },
    { id: 'review', label: 'Review', icon: RefreshCw, requires: 'items-due' },
    { id: 'progress', label: 'Progress', icon: TrendingUp, always: true }
  ];
  
  return <nav className="asahi-navigation">{/* implementation */}</nav>;
};