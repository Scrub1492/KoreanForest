import React from 'react';
import '../components/DarkModeToggleButton';
import DarkModeToggleButton from '../components/DarkModeToggleButton';

function App() {

  return (
    <>
      <h1>어숲</h1>
      <p className='subtitle'>A website for learning Korean efficiently.</p>
      <a href='/review' className='btn btn-accent'>Get Started</a>
      <DarkModeToggleButton />
    </>
  )
}

export default App;