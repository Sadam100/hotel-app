# Hotel Management Application

A modern, full-featured hotel management web application built with React, TypeScript, and Tailwind CSS.

## Features

### CRUD Operations
- **Create**: Add new hotels with comprehensive information
- **Read**: View all hotels in a beautiful card-based layout
- **Update**: Edit existing hotel details
- **Delete**: Remove hotels with confirmation

### Data Types Validation
The application validates 8 different data types:

1. **String**: Hotel name, location (required, min length validation)
2. **Number**: Price per night (0-10000 range)
3. **Number**: Available rooms (0-1000 range)
4. **Number**: Rating (1-5 range with decimals)
5. **Date**: Check-in date (must be today or future)
6. **Boolean**: Pet-friendly status (checkbox)
7. **Enum**: Room type (Single, Double, Suite, Deluxe, Presidential)
8. **Array**: Amenities (multiple selection)

### Additional Features
- **Search**: Filter hotels by name or location
- **Filter**: Filter by room type
- **Statistics Dashboard**: View total hotels, available rooms, and average rating
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Beautiful gradient backgrounds, hover effects, and smooth transitions
- **Form Validation**: Comprehensive client-side validation with error messages
- **Confirmation Dialogs**: Prevents accidental deletions

## Technology Stack

- **React 19**: Latest React features
- **TypeScript**: Type-safe code
- **Tailwind CSS 4**: Modern utility-first CSS framework
- **Vite**: Fast build tool and dev server

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── HotelCard.tsx       # Individual hotel card component
│   ├── HotelForm.tsx       # Form for creating/editing hotels
│   └── HotelList.tsx       # Grid layout for hotel cards
├── types/
│   └── Hotel.ts            # TypeScript interfaces and types
├── App.tsx                 # Main application component
├── main.tsx                # Application entry point
└── index.css               # Global styles
```

## Usage

### Adding a Hotel
1. Click the "Add New Hotel" button
2. Fill in all required fields:
   - Hotel name (min 3 characters)
   - Location
   - Room type (dropdown)
   - Price per night ($0-$10,000)
   - Available rooms (0-1000)
   - Rating (1-5)
   - Check-in date (today or future)
   - Pet-friendly status (optional)
   - Amenities (optional)
3. Click "Add Hotel"

### Editing a Hotel
1. Click the "Edit" button on any hotel card
2. Update the desired fields
3. Click "Update Hotel"

### Deleting a Hotel
1. Click the "Delete" button on any hotel card
2. Confirm the deletion in the dialog

### Searching and Filtering
- Use the search bar to find hotels by name or location
- Use the room type dropdown to filter by specific room types
- Click "Clear Filters" to reset

## Sample Data

The application comes with 3 sample hotels to demonstrate functionality:
- Grand Plaza Hotel (New York)
- Sunset Beach Resort (Miami)
- Mountain View Lodge (Denver)

## License

MIT
