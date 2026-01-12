# Basic Search Example

Learn how to perform a simple search and display results.

## 🚀 Quick Example

```javascript
import { YouTubeClient } from 'yt-search-lib';

const client = new YouTubeClient({
  proxyUrl: 'http://127.0.0.1:3000/proxy?url='
});

const results = await client.search('lofi hip hop radio', { limit: 5 });

results.forEach((video, i) => {
  console.log(`${i + 1}. ${video.title}`);
  console.log(`   Channel: ${video.author}`);
  console.log(`   URL: ${video.link}\n`);
});
```

**Output:**
```
1. lofi hip hop radio 📚 beats to relax/study to
   Channel: Lofi Girl
   URL: https://www.youtube.com/watch?v=jfKfPfyJRdk

2. ❄️ Coffee Shop Radio - 24/7 Chill Lo-Fi & Jazzy Beats
   Channel: STEEZYASFUCK
   URL: https://www.youtube.com/watch?v=blAFxjhg62k

3. lofi hip hop radio – beats to sleep/study/relax to ☕
   Channel: STEEZYASFUCK
   URL: https://www.youtube.com/watch?v=rPjez8z61rI
```

## 📋 What's in the Results

Each result object contains:

```javascript
{
  id: "jfKfPfyJRdk",                    // YouTube video ID
  title: "lofi hip hop radio 📚...",   // Video title
  author: "Lofi Girl",                  // Channel name
  link: "https://www.youtube.com/...",  // Full watch URL
  thumbnail: "https://i.ytimg.com/...", // Thumbnail image URL
  type: "video",                        // Result type (video/channel/playlist)
  duration: "2:27:32",                  // Video duration
  views: "1.2M",                        // View count
  uploadedAt: "3 years ago"             // Upload time
}
```

## 🔧 Configuration Options

```javascript
const client = new YouTubeClient({
  proxyUrl: 'http://127.0.0.1:3000/proxy?url=', // Required for browser
  useCache: true,                                  // Enable caching
  cacheMaxAge: 3600000                            // 1 hour cache TTL
});
```

See [Configuration Guide](../guides/configuration.md) for all options.

## 🔍 Search Options

```javascript
const results = await client.search(query, {
  limit: 5,           // Max results (default: 5)
  type: 'video'       // 'video', 'channel', 'playlist', or 'all'
});
```

## 💡 Common Patterns

### Handle Empty Results
```javascript
const results = await client.search('some query', { limit: 5 });

if (results.length === 0) {
  console.log('No results found');
} else {
  console.log(`Found ${results.length} results`);
  results.forEach(r => console.log(r.title));
}
```

### Show More Information
```javascript
results.forEach(video => {
  console.log(`Title: ${video.title}`);
  console.log(`Channel: ${video.author}`);
  console.log(`Views: ${video.views}`);
  console.log(`Uploaded: ${video.uploadedAt}`);
  console.log(`Duration: ${video.duration}`);
  console.log(`Link: ${video.link}`);
  console.log('---');
});
```

### Filter Results
```javascript
const results = await client.search('javascript', { limit: 20 });

// Only show videos longer than 10 minutes
const longVideos = results.filter(v => {
  const [hours, minutes, seconds] = v.duration.split(':');
  return parseInt(minutes) > 10;
});
```

## ⚙️ Error Handling

```javascript
try {
  const results = await client.search('lofi', { limit: 5 });
  console.log(`Found ${results.length} results`);
} catch (error) {
  console.error('Search failed:', error.message);

  if (error.message.includes('Failed to fetch')) {
    console.log('Network error - check proxy URL');
  } else if (error.message.includes('timeout')) {
    console.log('Request timed out');
  }
}
```

See [Error Handling Guide](./error-handling.md) for more patterns.

## 📌 Next Steps

- **Multiple types?** → [Search Types Guide](./search-types.md)
- **Improve performance?** → [Caching Strategy](./caching-strategy.md)
- **Handle errors?** → [Error Handling](./error-handling.md)
- **Use in React?** → [React Integration](./integration-react.md)
- **Build an API?** → [Express Integration](./integration-express.md)

---

**← [Back to Usage Examples](./README.md)**
