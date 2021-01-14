import React, { useEffect } from "react";
import { initFirebase } from "../../api/firebase";
import { initMixpanel } from "../../api/mixpanel";
import ShoppingCardSidebar from "../../components/shopping-cart";

function App() {
  useEffect(() => {
    initFirebase();
    initMixpanel();
  }, []);
  return (
    <div className="App">
      <ShoppingCardSidebar />
    </div>
  );
}

export default App;
