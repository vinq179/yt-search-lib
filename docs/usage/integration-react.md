# React Component Integration

Use the YouTube Search Library in React applications.

## 🚀 Basic Hook Pattern

```jsx
import { useState, useEffect } from 'react';
import { YouTubeClient } from 'yt-search-lib';

function YouTubeSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const client = new YouTubeClient({
    proxyUrl: process.env.REACT_APP_YOUTUBE_PROXY_URL
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const searchResults = await client.search(query, { limit: 10 });
      setResults(searchResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search YouTube..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="results">
        {results.map((video) => (
          <div key={video.id} className="video-card">
            <img src={video.thumbnail} alt={video.title} />
            <h3>{video.title}</h3>
            <p>{video.author}</p>
            <a href={video.link} target="_blank" rel="noopener noreferrer">
              Watch
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YouTubeSearch;
```

## 🎣 Custom Hook

```jsx
import { useState, useCallback } from 'react';
import { YouTubeClient } from 'yt-search-lib';

function useYouTubeSearch(proxyUrl) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const client = new YouTubeClient({ proxyUrl });

  const search = useCallback(async (query, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const results = await client.search(query, {
        limit: 5,
        ...options
      });
      setResults(results);
      return results;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [client]);

  return { results, loading, error, search };
}

// Usage
function App() {
  const { results, loading, error, search } = useYouTubeSearch(
    process.env.REACT_APP_YOUTUBE_PROXY_URL
  );

  const handleSearch = (query) => {
    search(query, { limit: 10 });
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Searching...</p>}
      {error && <p className="error">{error}</p>}
      <VideoGrid videos={results} />
    </div>
  );
}
```

## 🌐 Context Provider

```jsx
import { createContext, useContext, useState } from 'react';
import { YouTubeClient } from 'yt-search-lib';

const YouTubeContext = createContext();

export function YouTubeProvider({ children }) {
  const [client] = useState(
    () => new YouTubeClient({
      proxyUrl: process.env.REACT_APP_YOUTUBE_PROXY_URL
    })
  );

  return (
    <YouTubeContext.Provider value={client}>
      {children}
    </YouTubeContext.Provider>
  );
}

export function useYouTube() {
  return useContext(YouTubeContext);
}

// Usage
function SearchComponent() {
  const client = useYouTube();
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    const results = await client.search(query, { limit: 5 });
    setResults(results);
  };

  return (
    <div>
      <button onClick={() => handleSearch('lofi')}>
        Search
      </button>
      {results.map(video => (
        <div key={video.id}>{video.title}</div>
      ))}
    </div>
  );
}
```

## 🔍 Search with Autocomplete

```jsx
import { useState, useEffect } from 'react';
import { YouTubeClient } from 'yt-search-lib';

function SearchWithAutocomplete() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const client = new YouTubeClient({
    proxyUrl: process.env.REACT_APP_YOUTUBE_PROXY_URL,
    useCache: true
  });

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await client.search(query, { limit: 5 });
        setSuggestions(results.slice(0, 5));
      } finally {
        setLoading(false);
      }
    }, 300); // Debounce

    return () => clearTimeout(timer);
  }, [query, client]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <p>Loading...</p>}
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>{suggestion.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 💡 Tips

- **Use caching** - Reduce network requests for repeated searches
- **Add debouncing** - Prevent excessive API calls on autocomplete
- **Handle loading states** - Show feedback to users
- **Error handling** - Display errors gracefully
- **Memoize client** - Use useMemo to prevent recreating client

---

**← [Back to Usage Examples](./README.md)**
