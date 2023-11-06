
import React from 'react';
import Navst1 from './src/component/navigation/Navst1';
import MyProvider from './src/component/context/MyProvider';
const App = () => {
  return (
    <MyProvider>
      <Navst1 />
    </MyProvider>
  );
};

export default App;
