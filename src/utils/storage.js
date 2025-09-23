// LocalStorage keys
const STORAGE_KEYS = {
  USER: 'asahi_user',
  PROGRESS: 'asahi_progress',
  PREFERENCES: 'asahi_preferences',
  OFFLINE_DATA: 'asahi_offline'
}

// User storage functions
export const getStoredUser = async () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error reading user data:', error)
    return null
  }
}

export const saveUser = async (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    return true
  } catch (error) {
    console.error('Error saving user data:', error)
    return false
  }
}

// Progress storage functions
export const getStoredProgress = async () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error reading progress data:', error)
    return null
  }
}

export const saveProgress = async (progress) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress))
    return true
  } catch (error) {
    console.error('Error saving progress data:', error)
    return false
  }
}

// Preferences storage
export const getPreferences = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES)
    return data ? JSON.parse(data) : {
      theme: 'auto',
      fontSize: 'medium',
      soundEnabled: true,
      notificationsEnabled: false,
      dailyReminderTime: '09:00'
    }
  } catch (error) {
    console.error('Error reading preferences:', error)
    return {}
  }
}

export const savePreferences = (preferences) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences))
    return true
  } catch (error) {
    console.error('Error saving preferences:', error)
    return false
  }
}

// Clear all storage
export const clearAllStorage = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
    return true
  } catch (error) {
    console.error('Error clearing storage:', error)
    return false
  }
}