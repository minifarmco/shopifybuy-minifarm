import React from "react";

function App({ productId }: { productId: string }) {
  return (
    <div className="App">
      <h1>{`Large Product ${productId}`}</h1>
    </div>
  );
}

export default App;
