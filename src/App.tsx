import { useState } from 'react';
import type { Hotel } from './types/Hotel';
import HotelList from './components/HotelList';
import HotelForm from './components/HotelForm';

function App() {
  const [hotels, setHotels] = useState<Hotel[]>([
    {
      id: '1',
      name: 'Grand Plaza Hotel',
      location: 'New York, NY',
      roomType: 'Deluxe',
      pricePerNight: 250.00,
      availableRooms: 15,
      rating: 4.5,
      checkInDate: '2025-10-15',
      isPetFriendly: true,
      amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'],
    },
    {
      id: '2',
      name: 'Sunset Beach Resort',
      location: 'Miami, FL',
      roomType: 'Suite',
      pricePerNight: 350.00,
      availableRooms: 8,
      rating: 4.8,
      checkInDate: '2025-10-20',
      isPetFriendly: false,
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Room Service'],
    },
    {
      id: '3',
      name: 'Mountain View Lodge',
      location: 'Denver, CO',
      roomType: 'Double',
      pricePerNight: 180.00,
      availableRooms: 25,
      rating: 4.2,
      checkInDate: '2025-11-01',
      isPetFriendly: true,
      amenities: ['WiFi', 'Parking', 'Gym'],
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRoomType, setFilterRoomType] = useState<string>('All');

  const handleAddHotel = (hotelData: Omit<Hotel, 'id'>) => {
    const newHotel: Hotel = {
      ...hotelData,
      id: Date.now().toString(),
    };
    setHotels([...hotels, newHotel]);
    setIsFormOpen(false);
  };

  const handleUpdateHotel = (hotelData: Omit<Hotel, 'id'>) => {
    if (editingHotel) {
      setHotels(
        hotels.map((hotel) =>
          hotel.id === editingHotel.id ? { ...hotelData, id: hotel.id } : hotel
        )
      );
      setEditingHotel(undefined);
      setIsFormOpen(false);
    }
  };

  const handleDeleteHotel = (id: string) => {
    setHotels(hotels.filter((hotel) => hotel.id !== id));
  };

  const handleEditClick = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingHotel(undefined);
  };

  // Filter hotels based on search term and room type
  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoomType =
      filterRoomType === 'All' || hotel.roomType === filterRoomType;
    return matchesSearch && matchesRoomType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center">
                <span className="text-4xl lg:text-5xl mr-3">🏨</span>
                Hotel Management System
              </h1>
              <p className="text-gray-600 mt-2 text-sm md:text-base">Manage your hotel bookings efficiently</p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span className="text-lg">+</span>
              Add New Hotel
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide mb-3">Total Hotels</p>
                <p className="text-4xl font-bold text-blue-600">{hotels.length}</p>
              </div>
              <div className="text-5xl opacity-80">🏨</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide mb-3">Available Rooms</p>
                <p className="text-4xl font-bold text-green-600">
                  {hotels.reduce((sum, hotel) => sum + hotel.availableRooms, 0)}
                </p>
              </div>
              <div className="text-5xl opacity-80">🛏️</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-gray-100 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide mb-3">Average Rating</p>
                <p className="text-4xl font-bold text-yellow-600">
                  {hotels.length > 0
                    ? (hotels.reduce((sum, hotel) => sum + hotel.rating, 0) / hotels.length).toFixed(1)
                    : '0.0'}
                </p>
              </div>
              <div className="text-5xl opacity-80">⭐</div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-10 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">🔍 Search & Filter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Hotels
              </label>
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Room Type
              </label>
              <select
                value={filterRoomType}
                onChange={(e) => setFilterRoomType(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
              >
                <option value="All">All Room Types</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Presidential">Presidential</option>
              </select>
            </div>
          </div>
          {(searchTerm || filterRoomType !== 'All') && (
            <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700">
                Found <span className="text-blue-600 font-bold">{filteredHotels.length}</span> hotel(s)
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterRoomType('All');
                }}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                ✕ Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Hotels List */}
        <HotelList
          hotels={filteredHotels}
          onEdit={handleEditClick}
          onDelete={handleDeleteHotel}
        />
      </main>

      {/* Form Modal */}
      {isFormOpen && (
        <HotelForm
          hotel={editingHotel}
          onSubmit={editingHotel ? handleUpdateHotel : handleAddHotel}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
}

export default App;
