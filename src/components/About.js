import React, { useContext, useEffect } from 'react';
import noteContext from './context/notes/noteContext';

const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
  });
  return (
    <div>
        This is {a.state.name} and she is in {a.state.class};
    </div>
  )
}

export default About
