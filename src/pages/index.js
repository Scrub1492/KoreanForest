import React from 'react';
import { useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
import '../components/DarkModeToggleButton';
import DarkModeToggleButton from '../components/DarkModeToggleButton';

function App() {

  return (
    <>
      <h1>어숲</h1>
      <p className='subtitle'>A website for learning Korean efficiently.</p>
      <a href='/learn' className='btn btn-accent'>Get Started</a>
      <DarkModeToggleButton />
    </>
  )
}

export default App;