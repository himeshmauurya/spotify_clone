import React, {createContext, useState} from 'react';
const MyContext = createContext();

const MyProvider = ({children}) => {
  const [fav, setfav] = useState([]);
  const [curr, setcurr] = useState({});
  const [recent, setrecent] = useState([]);
  return (
    <MyContext.Provider value={{curr, setcurr, recent, setrecent, fav, setfav}}>
      {children}
    </MyContext.Provider>
  );
};

export {MyContext};
export default MyProvider;
