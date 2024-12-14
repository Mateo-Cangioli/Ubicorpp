import React, { useState, useEffect } from 'react';
import './SearchBox.css';  // Importa el archivo CSS

const SearchBox = ({ onSearch, onReset }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); // Para almacenar los resultados de la búsqueda

  const handleSearch = async () => {
    if (!query) return;

    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        setResults(data); // Guardar los resultados para mostrar en una lista
      } else {
        setResults([]); // Limpiar los resultados si no se encuentran coincidencias
      }
    } catch (error) {
      console.error("Error al buscar la dirección:", error);
    }
  };

  // Ejecutar la búsqueda cada vez que cambie la consulta
  useEffect(() => {
    if (query) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 500); // Retraso de 500ms para evitar demasiadas solicitudes al escribir
      return () => clearTimeout(timeoutId); // Limpiar el timeout cuando la consulta cambie
    } else {
      setResults([]); // Limpiar los resultados si el campo de búsqueda está vacío
    }
  }, [query]);

  const handleReset = () => {
    setQuery("");
    setResults([]); // Limpiar los resultados al resetear
    onReset();
  };

  const handleSelectResult = (result) => {
    const location = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      label: result.display_name,
    };
    onSearch(location); // Pasar la ubicación seleccionada al mapa
    setResults([]); // Limpiar la lista de resultados después de seleccionar
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Buscar dirección..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="button" onClick={handleSearch} className="search-btn">Buscar</button>
        <button type="button" onClick={handleReset} className="reset-btn">Reiniciar</button>
      </form>

      {/* Mostrar los resultados de la búsqueda mientras se escribe */}
      {results.length > 0 && (
        <ul>
          {results.map((result, index) => (
            <li key={index} onClick={() => handleSelectResult(result)}>
              {result.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
