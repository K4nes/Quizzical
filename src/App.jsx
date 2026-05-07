import { useState } from 'react'
import HomePage from './screens/HomePage.jsx'
import QuizPage from './screens/QuizPage.jsx'
import './App.css'

function App() {
    const [currentScreens, setCurrentScreens] = useState('home')

    return (
        <>
            {currentScreens === 'home' && <HomePage onNavigate={setCurrentScreens} />}
            {currentScreens === 'quiz' && <QuizPage />}
        </>
    )
}

export default App
