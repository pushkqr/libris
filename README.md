# Libris 📚

A modern web application for searching, browsing, and managing your personal book library with bookmark and download features.

## Features

- 🔍 **Search Books** - Search by title, author, or ISBN
- 📖 **Book Details** - View comprehensive book information including cover, description, metadata
- 🔖 **Bookmarks** - Save books to your personal library with localStorage persistence
- 📥 **Download** - Access multiple download links for books
- 📄 **Pagination** - Browse search results with easy page navigation
- 🖼️ **Image Preloading** - Smooth UX with preloaded covers and fallback placeholders
- ⚡ **Fast & Responsive** - Built with modern JavaScript and optimized performance

## Tech Stack

- **Vanilla JavaScript** (ES6+ modules)
- **MVC Architecture** - Clean separation of concerns
- **Parcel** - Zero-config bundler
- **Sass** - CSS preprocessor with modular structure
- **LocalStorage API** - Client-side data persistence
- **Fetch API** - Async HTTP requests with timeout handling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/pushkqr/libris.git
cd libris
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

The app will open at `http://localhost:1234`

## Project Structure

```
libris/
├── src/
│   ├── js/
│   │   ├── views/          # View components
│   │   │   ├── View.js     # Base view class
│   │   │   ├── bookView.js
│   │   │   ├── resultsView.js
│   │   │   ├── searchView.js
│   │   │   ├── paginationView.js
│   │   │   ├── bookmarkView.js
│   │   │   └── downloadView.js
│   │   ├── controller.js   # Application controller
│   │   ├── model.js        # Data model & state management
│   │   ├── config.js       # Configuration constants
│   │   └── helper.js       # Utility functions
│   ├── sass/               # Modular SCSS files
│   └── img/                # Images and icons
├── index.html
└── package.json
```

## Architecture

The application follows the **MVC (Model-View-Controller)** pattern:

- **Model** (`model.js`) - Manages application state and data operations
- **Views** (`views/`) - Render UI components and handle user interactions
- **Controller** (`controller.js`) - Coordinates between model and views

### Key Design Patterns

- **Publisher-Subscriber** - Views publish events, controller subscribes
- **Async/Await** - Clean asynchronous code handling
- **Class Inheritance** - Base `View` class extended by specific views
- **Module Pattern** - ES6 modules for code organization

## API Integration

The app connects to a book API server running locally:

```javascript
API_URL: 'http://localhost:8080/api/v2/books';
```

### Endpoints Used

- `GET /api/v2/books/:id` - Get book details
- `GET /api/v2/books?search=query` - Search books
- `GET /api/v2/books/:id/download` - Get download links

## Features in Detail

### Search & Browse

- Real-time search with query submission
- Paginated results (5 books per page)
- Preview cards with cover, title, and author
- Click to view full details

### Book Details

- Cover image with fallback placeholder
- Metadata: ISBN, genre, publisher, language, pages, year
- Full description
- Action buttons: Save to Library, Download

### Bookmarks

- Save/unsave books with one click
- Persistent storage with localStorage
- Visual indicator (filled/unfilled bookmark icon)
- Library dropdown showing all saved books

### Download

- Modal overlay with loading state
- Multiple download link options
- Opens links in new tab to preserve app state
- Error handling with user feedback

### Image Handling

- Preload images before rendering
- 5-second timeout for slow images
- Automatic fallback to placeholder on failure
- Smooth spinner during loading

## Configuration

Edit `src/js/config.js` to customize:

```javascript
export const API_URL = 'http://localhost:8080/api/v2/books';
export const TIMEOUT_SEC = 60; // API request timeout
export const RES_PER_PAGE = 5; // Results per page
export const IMAGE_TIMEOUT_SEC = 5; // Image load timeout
export const PLACEHOLDER_COVER = '...'; // Fallback cover URL
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Requires ES6+ support and modern JavaScript features.

## Development

### Available Scripts

- `npm start` - Start development server with hot reload

---

**Note:** This application requires a compatible book API server running on `localhost:8080`. The API should provide book data in the expected format.

**Disclaimer:** This project is built for educational purposes only. Users are responsible for ensuring they have the legal right to access and download any content. The application does not host or distribute copyrighted material. Please support authors and publishers by purchasing books legally.
