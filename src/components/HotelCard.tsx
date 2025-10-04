import { useState } from 'react';
import type { Hotel } from '../types/Hotel';
import ConfirmDialog from './ConfirmDialog';

interface HotelCardProps {
  hotel: Hotel;
  onEdit: (hotel: Hotel) => void;
  onDelete: (id: string) => void;
}

export default function HotelCard({ hotel, onEdit, onDelete }: HotelCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDelete = () => {
    onDelete(hotel.id);
    setShowConfirm(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white truncate mb-2">{hotel.name}</h3>
            <p className="text-blue-50 text-sm flex items-center">
              <span className="mr-2">📍</span>
              <span className="truncate">{hotel.location}</span>
            </p>
          </div>
          <div className="flex items-center bg-white px-3 py-1.5 rounded-lg shadow-sm flex-shrink-0">
            <span className="text-yellow-500 text-base mr-1">⭐</span>
            <span className="text-gray-900 font-bold text-sm">{hotel.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 flex-1 flex flex-col space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg">
            <p className="text-xs font-medium text-gray-600 mb-2">Room Type</p>
            <p className="text-base font-bold text-gray-800">{hotel.roomType}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg">
            <p className="text-xs font-medium text-gray-600 mb-2">Available Rooms</p>
            <p className="text-base font-bold text-gray-800">{hotel.availableRooms}</p>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <p className="text-xs font-medium text-amber-800 mb-2">Check-in Date</p>
          <p className="text-sm font-semibold text-amber-900 flex items-center">
            <span className="mr-2">📅</span>
            {formatDate(hotel.checkInDate)}
          </p>
        </div>

        <div className="flex items-center justify-between py-4 border-y border-gray-200">
          <div>
            <p className="text-3xl font-bold text-blue-600">
              ${hotel.pricePerNight.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">per night</p>
          </div>
          {hotel.isPetFriendly && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-xs font-semibold border border-green-200">
              🐾 Pet Friendly
            </div>
          )}
        </div>

        {hotel.amenities.length > 0 && (
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md text-xs font-medium border border-blue-200"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mt-auto pt-6">
          <button
            onClick={() => onEdit(hotel)}
            className="bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 text-base font-semibold shadow-md hover:shadow-lg"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-600 text-white py-4 px-6 rounded-lg hover:bg-red-700 active:bg-red-800 transition-all duration-200 text-base font-semibold shadow-md hover:shadow-lg"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Confirm Delete"
        message={`Are you sure you want to delete "${hotel.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}

