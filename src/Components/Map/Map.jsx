import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import SearchBox from '../Search/SearchBox';
import L from 'leaflet'; // Necesario para crear iconos personalizados de Leaflet

// Componente para mover el mapa a la nueva ubicación
const MoveMap = ({ lat, lon }) => {
  const map = useMap();
  map.setView([lat, lon], 12); // Ajusta el mapa a la nueva ubicación
  return null;
};

// Función para crear un ícono personalizado con FontAwesome
const createIcon = (iconClass) => {
  return new L.DivIcon({
    className: 'custom-icon',
    html: `<i class="${iconClass}" style="font-size: 24px; color: #fff; background-color: #007bff; border-radius: 50%; padding: 8px;"></i>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const Map = () => {
  const [position, setPosition] = useState([-31.4201, -64.1888]); // Coordenadas iniciales de Córdoba
  const [label, setLabel] = useState("Ubicación: Córdoba");
  const [markers, setMarkers] = useState([]); // Estado para los marcadores

  // Datos de los centros que se deben mostrar en el mapa
  const centers = [
    {
      lat: -31.408262254678935, lon:-64.21911982842065,
      nombre: "COPRIN",
      direccion: "Av. Duarte Quiros 5307, B° Lomas del Suquía",
      telefono: "4647828",
      categoria: "REHAB-INTEG",
      iconClass: 'fas fa-hospital', // Icono de FontAwesome
    },
    {
      lat: -31.410316502161578, lon:-64.16745285373158,
      nombre: "CEIN",
      direccion: "Sarmiento 1283, B° Gral Paz",
      telefono: "4524350",
      categoria: "REHAB-INTEG",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.402871878950954, lon:-64.1834249878973,
      nombre: "FARFALINA",
      direccion: "Tucumán 1195, B° Cofico",
      telefono: "3514718065 / 3512026473",
      categoria: "REHAB-INTEG",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.473815436629064, lon:-64.23334094799495,
      nombre: "CENEIN",
      direccion: "Cleveland 5372, B° Sta Isabel, Zona Sur",
      telefono: "4940347 / 153056237",
      categoria: "REHAB-INTEG",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.47190250571849, lon:-64.16126678909106,
      nombre: "DESCUBRIR",
      direccion: "Rotary Internacional 2865, B° Villa Eucarística, Zona Sur",
      telefono: "4834401",
      categoria: "REHAB-INTEG",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.416506551430757, lon:-64.17862500031637,
      nombre: "CIEP",
      direccion: "25 de Mayo 376, B° Centro",
      telefono: "4215313 / 3513560883",
      categoria: "REHAB (CATEG-HASTA LOS 12 AÑOS)",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.43624637385564, lon:-64.17814994094337,
      nombre: "GOSPA",
      direccion: "Felix Olmedo 2158, B° Rogelio Martínez, Zona Sur",
      telefono: "4822150",
      categoria: "NO INTEGRACION",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.410489040987343, lon:-64.17545604634367,
      nombre: "KIRON",
      direccion: "Bv. Guzmán 625, B° Centro",
      telefono: "153181923",
      categoria: "CAT INT ESC - REHA INDEP",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.439044954605183, lon:-64.17653679750167,
      nombre: "INENI",
      direccion: "Av. Richieri 2378, B° Jardín",
      telefono: "4825826",
      categoria: "REHAB-INTEG (NIÑOS)",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.4206,
      lon: -64.1875,
      nombre: "*****",
      direccion: "Av. Gral Paz 1450, B° Alta Córdoba",
      telefono: "4715701",
      categoria: "REHAB ADULTOS",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.43759249383845, lon:-64.12792912332255,
      nombre: "INSERIR",
      direccion: "Carnerillo 2173, B° Empalme, Zona Sur",
      telefono: "4569032 / 3513571517",
      categoria: "REHAB-INTEG (NIÑOS)",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.43423485289416, lon:-64.1307642663444,
      nombre: "INSERIR",
      direccion: "Jachal 4304, B° Empalme, Zona Sur",
      telefono: "4574515 / 3517148493",
      categoria: "REHAB-INTEG ADULTO",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.447995796755613, lon:-64.1768856208685,
      nombre: "SAN CAMILO",
      direccion: "Av. Richieri 3182, B° Jardín, Zona Sur",
      telefono: "4647297",
      categoria: "REHAB-INTEG",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.372101147920418, lon:-64.23269806347213,
      nombre: "CTRO NEUROCIENCIA Y REHAB",
      direccion: "Zona Norte, Juan Bautista Daniel 1981, B° Cerro de las Rosas",
      telefono: "3516165836",
      categoria: "INTEG (CATEG)",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.37026846433709, lon:-64.24076104710235,
      nombre: "ROBERT Y ROSINE LEFORT",
      direccion: "Amelia Earhart 4547, X5009 Córdoba,Zona Norte frente al Chateau, B° Valle Cerro",
      telefono: "4817100 / 3514354583 / 351816262",
      categoria: "CENTRO CATEGORIZADO (REH)",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.4199,
      lon: -64.1842,
      nombre: "****",
      direccion: "Jose Artigas 318, B° Alberdi, Centro",
      telefono: "3518729605 / 156183280",
      categoria: "CENTRO CATEGORIZADO SOLO INTEG ESCOLAR",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.4240,
      lon: -64.1870,
      nombre: "FUNDACION ARKO",
      direccion: "Colon 1642, Centro",
      telefono: "3517019726",
      categoria: "CENTRO CATEGORIZADO (INTEG ESCOLAR)",
      iconClass: 'fas fa-hospital',
    },
    {
      lat: -31.4260,
      lon: -64.1820,
      nombre: "CENTRO VIDA PLENA",
      direccion: "Av. Raymundo Montenegro 7175, Argüello",
      telefono: "3516995825 / 3512238211",
      categoria: "CENTRO CATEGORIZADO (REHAB E INTEGRACION)",
      iconClass: 'fas fa-hospital',
    },
  

    // Aquí puedes seguir agregando más centros si es necesario
  ];

  // Maneja la búsqueda
  const handleSearch = ({ lat, lng, label }) => {
    setPosition([lat, lng]);
    setLabel(label);
    setMarkers((prevMarkers) => [
      ...prevMarkers, // Mantén los marcadores anteriores
      { lat, lng, label, iconClass: 'fas fa-map-marker-alt' }, // Usar el mismo icono de la Plaza San Martín
    ]);
  };

  // Maneja el reinicio
  const handleReset = () => {
    setPosition([-31.4201, -64.1888]); // Coordenadas iniciales de Córdoba
    setLabel("Ubicación: Córdoba");
    setMarkers([]); // Restablecer los marcadores
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <SearchBox onSearch={handleSearch} onReset={handleReset} />

      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <MoveMap lat={position[0]} lon={position[1]} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Renderizar los marcadores de centros */}
        {centers.map((center, index) => (
          <Marker
            key={index}
            position={[center.lat, center.lon]}
            icon={createIcon(center.iconClass)} // Usar el icono de FontAwesome
          >
            <Popup>
              <strong>{center.nombre}</strong><br />
              Dirección: {center.direccion}<br />
              Teléfono: {center.telefono}<br />
              Categoría: {center.categoria}
            </Popup>
          </Marker>
        ))}

        {/* Mostrar todos los marcadores dinámicos con el mismo icono que la Plaza San Martín */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lng]}
            icon={createIcon(marker.iconClass)} // Usar el mismo icono que la Plaza San Martín
          >
            <Popup>{marker.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
