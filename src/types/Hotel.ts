export type RoomType = 'Single' | 'Double' | 'Suite' | 'Deluxe' | 'Presidential';

export interface Hotel {
  id: string;
  name: string; // string type
  location: string; // string type
  roomType: RoomType; // enum type
  pricePerNight: number; // number type
  availableRooms: number; // number type
  rating: number; // number type (1-5)
  checkInDate: string; // date type (ISO string)
  isPetFriendly: boolean; // boolean type
  amenities: string[]; // array type
}

export interface HotelFormData {
  name: string;
  location: string;
  roomType: RoomType;
  pricePerNight: string;
  availableRooms: string;
  rating: string;
  checkInDate: string;
  isPetFriendly: boolean;
  amenities: string[];
}

