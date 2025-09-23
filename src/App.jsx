import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LoadingSpinner from './components/ui/LoadingSpinner'
import { AppProvider } from './contexts/AppContext'
import './App.css'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const LearnPage = lazy(() => import('./pages/LearnPage'))
const LessonSelectionPage = lazy(() => import('./pages/LessonSelectionPage'))
const PracticePage = lazy(() => import('./pages/PracticePage'))
const ReviewPage = lazy(() => import('./pages/ReviewPage'))
const ProgressPage = lazy(() => import('./pages/ProgressPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))

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
      <Router>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
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
        </Layout>
      </Router>
    </AppProvider>
  )
}

export default App