import type { Hotel } from '../types/Hotel';
import HotelCard from './HotelCard';

interface HotelListProps {
  hotels: Hotel[];
  onEdit: (hotel: Hotel) => void;
  onDelete: (id: string) => void;
}

export default function HotelList({ hotels, onEdit, onDelete }: HotelListProps) {
  if (hotels.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-100 mx-4 sm:mx-0">
        <div className="text-7xl mb-4">🏨</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Hotels Found</h3>
        <p className="text-gray-600">Get started by adding your first hotel!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

