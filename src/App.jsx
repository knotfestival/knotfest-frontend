
import './App.css'
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar.jsx";
import LineUpPage from "./pages/LineUpPage.jsx";
import SignUp from "./pages/SignUp.jsx";
import Tickets from "./pages/Tickets.jsx";
import ArtistDetails from "./pages/ArtistDetails.jsx";
import SurveyForm from "./pages/SurveyForm.jsx";
import SurveyResults from "./components/SurveyResults.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./services/ProtectedRoute.jsx";
import UserProvider from "./context/UserContext.jsx";

function App() {

  return (
      <div className="app-container">
          <UserProvider>
              <Navbar />
              <main className="main-content">
                  <Routes>
                      <Route exact path="/" element={<HomePage />} />
                      <Route path="/lineup" element={<LineUpPage />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/tickets" element={<ProtectedRoute> <Tickets /> </ProtectedRoute>}/>
                      <Route path="/artists/:artistId" element={<ArtistDetails />} />
                      <Route path="/survey" element={<SurveyForm/>} />
                      <Route path="/survey-results" element={<SurveyResults/>} />
                  </Routes>
              </main>
              <Footer />
          </UserProvider>
      </div>
  )
}

export default App
