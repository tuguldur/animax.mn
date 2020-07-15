import React, { useState, useMemo } from "react";
import { Header } from "./component";
import { Result } from "./container";
import User from "./context/search";
const App = () => {
  const [search, setSearch] = useState(null);
  const value = useMemo(() => ({ search, setSearch }), [search, setSearch]);
  return (
    <User.Provider value={value}>
      <Header />
      <Result />
    </User.Provider>
  );
};

export default App;
