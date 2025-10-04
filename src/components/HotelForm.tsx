import { useState, useEffect } from 'react';
import type { Hotel, HotelFormData, RoomType } from '../types/Hotel';

interface HotelFormProps {
  hotel?: Hotel;
  onSubmit: (hotel: Omit<Hotel, 'id'>) => void;
  onCancel: () => void;
}

const ROOM_TYPES: RoomType[] = ['Single', 'Double', 'Suite', 'Deluxe', 'Presidential'];
const AMENITIES_OPTIONS = ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking', 'Room Service'];

export default function HotelForm({ hotel, onSubmit, onCancel }: HotelFormProps) {
  const [formData, setFormData] = useState<HotelFormData>({
    name: '',
    location: '',
    roomType: 'Single',
    pricePerNight: '',
    availableRooms: '',
    rating: '',
    checkInDate: '',
    isPetFriendly: false,
    amenities: [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof HotelFormData, string>>>({});

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name,
        location: hotel.location,
        roomType: hotel.roomType,
        pricePerNight: hotel.pricePerNight.toString(),
        availableRooms: hotel.availableRooms.toString(),
        rating: hotel.rating.toString(),
        checkInDate: hotel.checkInDate,
        isPetFriendly: hotel.isPetFriendly,
        amenities: hotel.amenities,
      });
    }
  }, [hotel]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof HotelFormData, string>> = {};

    // String validation
    if (!formData.name.trim()) {
      newErrors.name = 'Hotel name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Hotel name must be at least 3 characters';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    // Number validation
    const price = parseFloat(formData.pricePerNight);
    if (!formData.pricePerNight || isNaN(price)) {
      newErrors.pricePerNight = 'Valid price is required';
    } else if (price <= 0) {
      newErrors.pricePerNight = 'Price must be greater than 0';
    } else if (price > 10000) {
      newErrors.pricePerNight = 'Price must be less than 10000';
    }

    const rooms = parseInt(formData.availableRooms);
    if (!formData.availableRooms || isNaN(rooms)) {
      newErrors.availableRooms = 'Valid number of rooms is required';
    } else if (rooms < 0) {
      newErrors.availableRooms = 'Rooms cannot be negative';
    } else if (rooms > 1000) {
      newErrors.availableRooms = 'Rooms must be less than 1000';
    }

    const rating = parseFloat(formData.rating);
    if (!formData.rating || isNaN(rating)) {
      newErrors.rating = 'Valid rating is required';
    } else if (rating < 1 || rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    // Date validation
    if (!formData.checkInDate) {
      newErrors.checkInDate = 'Check-in date is required';
    } else {
      const selectedDate = new Date(formData.checkInDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.checkInDate = 'Check-in date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const hotelData: Omit<Hotel, 'id'> = {
        name: formData.name.trim(),
        location: formData.location.trim(),
        roomType: formData.roomType,
        pricePerNight: parseFloat(formData.pricePerNight),
        availableRooms: parseInt(formData.availableRooms),
        rating: parseFloat(formData.rating),
        checkInDate: formData.checkInDate,
        isPetFriendly: formData.isPetFriendly,
        amenities: formData.amenities,
      };
      onSubmit(hotelData);
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-xl flex-shrink-0">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">{hotel ? '✏️' : '➕'}</span>
            {hotel ? 'Edit Hotel' : 'Add New Hotel'}
          </h2>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Hotel Name - String */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hotel Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
                placeholder="Enter hotel name"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1.5 font-medium">{errors.name}</p>}
            </div>

            {/* Location - String */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
                placeholder="Enter location"
              />
              {errors.location && <p className="text-red-600 text-sm mt-1.5 font-medium">{errors.location}</p>}
            </div>

            {/* Room Type - Enum */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Room Type *
              </label>
              <select
                value={formData.roomType}
                onChange={(e) => setFormData({ ...formData, roomType: e.target.value as RoomType })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
              >
                {ROOM_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Price - Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price per Night ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.pricePerNight}
                  onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
                  placeholder="0.00"
                />
                {errors.pricePerNight && <p className="text-red-600 text-sm mt-1.5 font-medium">{errors.pricePerNight}</p>}
              </div>

              {/* Available Rooms - Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Available Rooms *
                </label>
                <input
                  type="number"
                  value={formData.availableRooms}
                  onChange={(e) => setFormData({ ...formData, availableRooms: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
                  placeholder="0"
                />
                {errors.availableRooms && <p className="text-red-600 text-sm mt-1.5 font-medium">{errors.availableRooms}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Rating - Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rating (1-5) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
                  placeholder="5.0"
                />
                {errors.rating && <p className="text-red-600 text-sm mt-1.5 font-medium">{errors.rating}</p>}
              </div>

              {/* Check-in Date - Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-in Date *
                </label>
                <input
                  type="date"
                  value={formData.checkInDate}
                  onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
                />
                {errors.checkInDate && <p className="text-red-600 text-sm mt-1.5 font-medium">{errors.checkInDate}</p>}
              </div>
            </div>

            {/* Pet Friendly - Boolean */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="petFriendly"
                  checked={formData.isPetFriendly}
                  onChange={(e) => setFormData({ ...formData, isPetFriendly: e.target.checked })}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="petFriendly" className="ml-3 text-sm font-semibold text-gray-700">
                  🐾 Pet Friendly
                </label>
              </div>
            </div>

            {/* Amenities - Array */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {AMENITIES_OPTIONS.map(amenity => (
                  <label key={amenity} className="flex items-center space-x-2 text-gray-700 cursor-pointer bg-gray-50 p-2.5 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
              >
                {hotel ? '✓ Update Hotel' : '+ Add Hotel'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

