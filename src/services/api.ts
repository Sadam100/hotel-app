const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: string[];
  count?: number;
}

export interface HotelStats {
  totalHotels: number;
  totalAvailableRooms: number;
  averageRating: number;
  roomTypeDistribution: Array<{ _id: string; count: number }>;
}

// GET /api/hotels - Get all hotels with optional filtering
export const getAllHotels = async (params?: {
  search?: string;
  roomType?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}): Promise<ApiResponse<any[]>> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.roomType) queryParams.append('roomType', params.roomType);
    if (params?.minPrice) queryParams.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params?.minRating) queryParams.append('minRating', params.minRating.toString());

    const response = await fetch(`${API_BASE_URL}/hotels?${queryParams}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch hotels');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

// GET /api/hotels/:id - Get single hotel by ID
export const getHotelById = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch hotel');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching hotel:', error);
    throw error;
  }
};

// POST /api/hotels - Create new hotel
export const createHotel = async (hotelData: any): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/hotels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hotelData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create hotel');
    }
    
    return data;
  } catch (error) {
    console.error('Error creating hotel:', error);
    throw error;
  }
};

// PUT /api/hotels/:id - Update hotel by ID
export const updateHotel = async (id: string, hotelData: any): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hotelData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update hotel');
    }
    
    return data;
  } catch (error) {
    console.error('Error updating hotel:', error);
    throw error;
  }
};

// DELETE /api/hotels/:id - Delete hotel by ID
export const deleteHotel = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete hotel');
    }
    
    return data;
  } catch (error) {
    console.error('Error deleting hotel:', error);
    throw error;
  }
};

// GET /api/hotels/stats - Get hotel statistics
export const getHotelStats = async (): Promise<ApiResponse<HotelStats>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/hotels/stats`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch statistics');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};
