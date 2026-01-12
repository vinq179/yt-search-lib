# Caching Strategy

Optimize performance by caching search results.

## 🚀 Quick Example

```javascript
import { YouTubeClient } from 'yt-search-lib';

const client = new YouTubeClient({
  proxyUrl: 'http://127.0.0.1:3000/proxy?url=',
  useCache: true,           // Enable caching
  cacheMaxAge: 3600000      // 1 hour cache TTL
});

const query = 'lofi hip hop';

// First search - hits YouTube
const start1 = Date.now();
const results1 = await client.search(query, { limit: 5 });
console.log(`First search: ${Date.now() - start1}ms`);

// Second search - uses cache
const start2 = Date.now();
const results2 = await client.search(query, { limit: 5 });
console.log(`Cached search: ${Date.now() - start2}ms`);
```

**Output:**
```
First search: 450ms
Cached search: 1ms
```

## ⚙️ Cache Configuration

```javascript
const client = new YouTubeClient({
  proxyUrl: 'http://127.0.0.1:3000/proxy?url=',
  useCache: true,          // Enable (default: true)
  cacheMaxAge: 3600000     // 1 hour in milliseconds
});
```

### Common TTLs

```javascript
// 5 minutes
cacheMaxAge: 5 * 60 * 1000

// 1 hour
cacheMaxAge: 60 * 60 * 1000

// 24 hours
cacheMaxAge: 24 * 60 * 60 * 1000

// No cache
useCache: false
```

## 💾 How It Works

1. **First search** - Result fetched from YouTube
2. **Stored** - Result cached in localStorage
3. **Same query** - Returns cached result instantly
4. **Different query** - Fetches fresh from YouTube
5. **Expiration** - Old cache cleared after maxAge

## 📊 Clear Cache

```javascript
// Clear all cached results
client.clearCache();

// Cache is cleared - next search will fetch fresh data
const results = await client.search('lofi', { limit: 5 });
```

## 🎯 When to Use Caching

**Use caching when:**
- ✅ User might search same term again
- ✅ Building search UI with autocomplete
- ✅ Displaying recently viewed results
- ✅ Building search history

**Disable caching when:**
- ❌ Results must be fresh (live trending)
- ❌ Storing sensitive data
- ❌ Low storage capacity
- ❌ Testing/debugging

## 💡 Performance Tips

### Longer Cache TTL for Popular Queries
```javascript
// Different clients for different purposes
const quickClient = new YouTubeClient({
  cacheMaxAge: 5 * 60 * 1000  // 5 min for popular queries
});

const realTimeClient = new YouTubeClient({
  useCache: false              // No cache for trending
});
```

### Monitor Cache Usage
```javascript
// Check if cache is working
let cachedHits = 0;
let networkRequests = 0;

const client = new YouTubeClient({ useCache: true });

// Same query twice
await client.search('javascript'); // Network request
await client.search('javascript'); // Cached

// Track in your app logic
```

## 🔧 Local Storage

Cache is stored in browser `localStorage` under:
```
yt_search_<query>_<limit>_<type>
```

**Check cache in browser DevTools:**
```javascript
// View all cached searches
Object.keys(localStorage).filter(k => k.startsWith('yt_search_'));

// Get specific cached result
const cached = localStorage.getItem('yt_search_lofi_5_video');
```

## ⚡ Performance Comparison

```javascript
// Without cache - always hits network
const client1 = new YouTubeClient({ useCache: false });
await client1.search('lofi');  // 450ms
await client1.search('lofi');  // 450ms
await client1.search('lofi');  // 450ms
// Total: 1350ms

// With cache
const client2 = new YouTubeClient({ useCache: true });
await client2.search('lofi');  // 450ms
await client2.search('lofi');  // 1ms (cached)
await client2.search('lofi');  // 1ms (cached)
// Total: 452ms (3x faster!)
```

---

**← [Back to Usage Examples](./README.md)**
