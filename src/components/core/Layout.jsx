/**
 * Main application layout with navigation, progress indicators, and content area
 * Handles responsive design, dark/light mode, and cultural theme switching
 */
const Layout = ({ children }) => {
  const { culturalTheme, userProgress } = useAppContext();
  
  return (
    <div className={`asahi-layout theme-${culturalTheme}`}>
      <Header />
      <Navigation />
      <ProgressIndicator />
      <main className="content-area">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Props Interface
interface LayoutProps {
  children: React.ReactNode;
  culturalTheme: 'traditional' | 'modern' | 'anime';
  showProgress: boolean;
}