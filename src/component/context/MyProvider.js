import React, {createContext, useState} from 'react';
const MyContext = createContext();

const MyProvider = ({children}) => {
  const [fav, setfav] = useState([]);
  const [curr, setcurr] = useState({});
  const [recent, setrecent] = useState([]);
  const [profiledata, setprofiledata] = useState();
  const [dob, setdob] = useState(new Date());
  return (
    <MyContext.Provider
      value={{
        curr,
        setcurr,
        recent,
        setrecent,
        fav,
        setfav,
        profiledata,
        setprofiledata,
        dob,
        setdob,
      }}>
      {children}
    </MyContext.Provider>
  );
};

export {MyContext};
export default MyProvider;
