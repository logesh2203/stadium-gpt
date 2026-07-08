import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigation } from 'lucide-react';

// Fix for default Leaflet icon in React
// @ts-expect-error - Leaflet internals
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Dummy Stadium Coordinates
const STADIUM_CENTER: [number, number] = [40.7128, -74.0060]; // e.g., NYC

const MARKERS = [
  { id: 1, pos: [40.7138, -74.0060] as [number, number], label: 'Gate A (North)', type: 'gate' },
  { id: 2, pos: [40.7128, -74.0040] as [number, number], label: 'Gate B (East)', type: 'gate' },
  { id: 3, pos: [40.7118, -74.0060] as [number, number], label: 'Gate C (South)', type: 'gate' },
  { id: 4, pos: [40.7135, -74.0055] as [number, number], label: 'Medical Room 1', type: 'medical' },
  { id: 5, pos: [40.7122, -74.0065] as [number, number], label: 'Food Court (South)', type: 'food' },
];

export default function MapView() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredMarkers = activeFilter === 'all' 
    ? MARKERS 
    : MARKERS.filter(m => m.type === activeFilter);

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[800px] bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden relative">
      
      {/* Map Header / Controls */}
      <div className="absolute top-4 left-4 right-4 z-[400] flex flex-wrap gap-2 pointer-events-none">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur pointer-events-auto p-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 flex gap-2">
          {['all', 'gate', 'medical', 'food'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <MapContainer 
        center={STADIUM_CENTER} 
        zoom={16} 
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="dark:invert dark:hue-rotate-180 dark:brightness-90 dark:contrast-150"
        />
        
        {filteredMarkers.map((marker) => (
          <Marker key={marker.id} position={marker.pos}>
            <Popup className="rounded-xl">
              <div className="font-semibold text-gray-900 p-1">
                {marker.label}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Action Button for Navigation */}
      <button className="absolute bottom-6 right-6 z-[400] bg-blue-600 text-white p-4 rounded-full shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-colors flex items-center justify-center">
        <Navigation size={24} />
      </button>

    </div>
  );
}
