import React from 'react';
import Map from './Components/Map/Map';
import Menu from './Components/Menu/Menu';

function App() {
  return (
    <div>
      {/* El componente de mapa y el menú hamburguesa están dentro del mismo contenedor */}
      <Map />
      <Menu />
    </div>
  );
}

export default App;
