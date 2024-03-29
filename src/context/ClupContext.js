import React, { useState } from "react";

const AddClup = React.createContext();

export const AddClupProvider = ({ children }) => {
  const [inpValue, setInPvalue] = useState("");
  const [show, setShow] = useState(null);

  const createClup = (element) => {
    setInPvalue(element);
  };
  const popup = () => {
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  return (
    <AddClup.Provider value={{ inpValue, createClup, popup, show }}>
      {children}
    </AddClup.Provider>
  );
};

export const userClup = () => {
  return React.useContext(AddClup);
};
