import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import LoadingSpinner from './components/ui/LoadingSpinner'
import AudioManager from './components/audio/AudioManager'
import { AppProvider } from './contexts/AppContext'
import './App.css'
import './styles/anime-theme.css'

// Lazy load pages for better performance
const HeroLanding = lazy(() => import('./pages/HeroLanding'))
const AdventureMap = lazy(() => import('./pages/AdventureMap'))
const HomePage = lazy(() => import('./pages/HomePage'))
const LearnPage = lazy(() => import('./pages/LearnPage'))
const LessonSelectionPage = lazy(() => import('./pages/LessonSelectionPage'))
const PracticePage = lazy(() => import('./pages/PracticePage'))
const ReviewPage = lazy(() => import('./pages/ReviewPage'))
const ProgressPage = lazy(() => import('./pages/ProgressPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const CulturalBattlePage = lazy(() => import('./pages/CulturalBattlePage'))

// Scenario pages
const EnteringShopPage = lazy(() => import('./pages/scenarios/EnteringShopPage'))
const TrainEtiquettePage = lazy(() => import('./pages/scenarios/TrainEtiquettePage'))
const RestaurantOrderingPage = lazy(() => import('./pages/scenarios/RestaurantOrderingPage'))
const TempleVisitsPage = lazy(() => import('./pages/scenarios/TempleVisitsPage'))

// Learning modules
const BowingEtiquetteModule = lazy(() => import('./pages/modules/BowingEtiquetteModule'))

function App() {
  return (
    <AppProvider>
      <AudioManager>
        <Router>
          <Layout>
            <AnimatePresence mode="wait">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<HeroLanding />} />
                  <Route path="/adventure" element={<AdventureMap />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/battle/:scenarioId" element={<CulturalBattlePage />} />
                  <Route path="/learn" element={<LessonSelectionPage />} />
                  <Route path="/lessons" element={<LessonSelectionPage />} />
                  <Route path="/learn/:lessonId" element={<LearnPage />} />
                  <Route path="/practice" element={<PracticePage />} />
                  <Route path="/practice/entering-shop" element={<EnteringShopPage />} />
                  <Route path="/practice/train-etiquette" element={<TrainEtiquettePage />} />
                  <Route path="/practice/restaurant-ordering" element={<RestaurantOrderingPage />} />
                  <Route path="/practice/temple-visits" element={<TempleVisitsPage />} />
                  <Route path="/modules/bowing-etiquette" element={<BowingEtiquetteModule />} />
                  <Route path="/review" element={<ReviewPage />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </Layout>
        </Router>
      </AudioManager>
    </AppProvider>
  )
}

export default App