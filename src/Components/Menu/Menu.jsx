import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'; // Icono de hamburguesa
import './Menu.css'; // Estilos para el menú

const Menu = () => {
  // Estado para controlar la apertura y cierre del menú
  const [open, setOpen] = useState(false);

  // Función para alternar el estado del menú (abrir/cerrar)
  const toggleMenu = () => setOpen(!open);

  return (
    <div className="menu-container">
      {/* Botón hamburguesa */}
      <button
        className="menu-button"
        onClick={toggleMenu} // Cambia el estado cuando el botón es presionado
        aria-controls="menu-sidebar"
        aria-expanded={open}
      >
        <GiHamburgerMenu size={30} />
      </button>

      {/* Menú lateral */}
      <div className={`menu-sidebar ${open ? 'open' : ''}`} id="menu-sidebar">
        <div className="menu-content">
          <h5>Opciones del menú</h5>
          <ul>
            <li><a href="#">°Centros de Rehabilitacion Categorizados en Cordoba Capital</a></li>
            <li><a href="#">°Escuelas especiales</a></li>
            <li><a href="#">°Opción 3</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
