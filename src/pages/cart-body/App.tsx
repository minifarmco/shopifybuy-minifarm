import React, { useEffect } from "react";
import { initFirebase } from "../../api/firebase";
import ShoppingCardSidebar from "../../components/shopping-cart";

function App() {
  useEffect(() => {
    initFirebase();
  }, []);
  return (
    <div className="App">
      <ShoppingCardSidebar />
    </div>
  );
}

export default App;
