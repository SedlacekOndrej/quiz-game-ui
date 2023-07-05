import './App.css';
import React from 'react';
import Homepage from './pages/Homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Leaderboards from './pages/Leaderboards';
import NavBar from './components/NavBar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { QuizProvider } from './contexts/QuizContext';
import { UserProvider } from './contexts/UserContext';
import Account from './pages/Account';
import Quiz from './pages/Quiz';
import Results from './pages/Results';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <QuizProvider>
          <UserProvider>
            <BrowserRouter>
              <NavBar />
              <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/registration' element={<Registration />} />
                <Route path='/login' element={<Login />} />
                <Route path='/leaderboards' element={<Leaderboards />} />
                <Route path='/account' element={<Account />} />
                <Route path='/:continent' element={<Quiz />} />
                <Route path='/results' element={<Results />} />
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </QuizProvider>
      </QueryClientProvider>
    </>
  );
}