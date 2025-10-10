import { useState, useEffect } from "react";
import type { Hotel } from "./types/Hotel";
import HotelList from "./components/HotelList";
import HotelForm from "./components/HotelForm";
import {
  getAllHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelStats,
} from "./services/api";

function App() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | undefined>(
    undefined
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRoomType, setFilterRoomType] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalHotels: 0,
    totalAvailableRooms: 0,
    averageRating: 0,
  });

  // Load hotels and stats on component mount
  useEffect(() => {
    loadHotels();
    loadStats();
  }, []);

  const loadHotels = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllHotels({
        search: searchTerm || undefined,
        roomType: filterRoomType !== "All" ? filterRoomType : undefined,
      });

      if (response.success && response.data) {
        setHotels(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load hotels");
      console.error("Error loading hotels:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await getHotelStats();
      if (response.success && response.data) {
        setStats({
          totalHotels: response.data.totalHotels,
          totalAvailableRooms: response.data.totalAvailableRooms,
          averageRating: response.data.averageRating,
        });
      }
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  };

  const handleAddHotel = async (hotelData: Omit<Hotel, "id">) => {
    try {
      setError(null);
      const response = await createHotel(hotelData);

      if (response.success && response.data) {
        setHotels([...hotels, response.data]);
        setIsFormOpen(false);
        loadStats(); // Refresh stats
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create hotel");
      console.error("Error creating hotel:", err);
    }
  };

  const handleUpdateHotel = async (hotelData: Omit<Hotel, "id">) => {
    if (editingHotel) {
      try {
        setError(null);
        const response = await updateHotel(editingHotel.id, hotelData);

        if (response.success && response.data) {
          setHotels(
            hotels.map((hotel) =>
              hotel.id === editingHotel.id ? response.data : hotel
            )
          );
          setEditingHotel(undefined);
          setIsFormOpen(false);
          loadStats(); // Refresh stats
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update hotel");
        console.error("Error updating hotel:", err);
      }
    }
  };

  const handleDeleteHotel = async (id: string) => {
    try {
      setError(null);
      const response = await deleteHotel(id);

      if (response.success) {
        setHotels(hotels.filter((hotel) => hotel.id !== id));
        loadStats(); // Refresh stats
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete hotel");
      console.error("Error deleting hotel:", err);
    }
  };

  const handleEditClick = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingHotel(undefined);
  };

  // Handle search and filter changes
  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadHotels();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filterRoomType]);

  const handleFilterChange = (newFilterRoomType: string) => {
    setFilterRoomType(newFilterRoomType);
  };

  // Use hotels directly since filtering is now done on the backend
  const filteredHotels = hotels;

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
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Manage your hotel bookings efficiently
              </p>
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
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-red-500 mr-3">⚠️</div>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide mb-3">
                  Total Hotels
                </p>
                <p className="text-4xl font-bold text-blue-600">
                  {stats.totalHotels}
                </p>
              </div>
              <div className="text-5xl opacity-80">🏨</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide mb-3">
                  Available Rooms
                </p>
                <p className="text-4xl font-bold text-green-600">
                  {stats.totalAvailableRooms}
                </p>
              </div>
              <div className="text-5xl opacity-80">🛏️</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-gray-100 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide mb-3">
                  Average Rating
                </p>
                <p className="text-4xl font-bold text-yellow-600">
                  {stats.averageRating.toFixed(1)}
                </p>
              </div>
              <div className="text-5xl opacity-80">⭐</div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-10 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            🔍 Search & Filter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Hotels
              </label>
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Room Type
              </label>
              <select
                value={filterRoomType}
                onChange={(e) => handleFilterChange(e.target.value)}
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
          {(searchTerm || filterRoomType !== "All") && (
            <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700">
                Found{" "}
                <span className="text-blue-600 font-bold">
                  {filteredHotels.length}
                </span>{" "}
                hotel(s)
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterRoomType("All");
                }}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                ✕ Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Hotels List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading hotels...</span>
          </div>
        ) : (
          <HotelList
            hotels={filteredHotels}
            onEdit={handleEditClick}
            onDelete={handleDeleteHotel}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Copyright by{" "}
            <span className="font-semibold text-gray-800">Sadam Hussain</span>.
            All rights reserved.
          </p>
        </div>
      </footer>

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
