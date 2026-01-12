# Search Different Content Types

Search for videos, channels, playlists, or all types of content.

## 🎯 Basic Example

```javascript
import { YouTubeClient } from 'yt-search-lib';

const proxyUrl = 'http://127.0.0.1:3000/proxy?url=';
const client = new YouTubeClient({ proxyUrl });

// Search for videos
const videos = await client.search('javascript', { limit: 3, type: 'video' });

// Search for channels
const channels = await client.search('Traversy Media', { limit: 3, type: 'channel' });

// Search for playlists
const playlists = await client.search('web development', { limit: 3, type: 'playlist' });

// Search for all types
const all = await client.search('React', { limit: 5, type: 'all' });
```

## 📹 Search Videos

```javascript
const videos = await client.search('lofi hip hop', { 
  limit: 10, 
  type: 'video' 
});

videos.forEach(video => {
  console.log(`Title: ${video.title}`);
  console.log(`Channel: ${video.author}`);
  console.log(`Views: ${video.views}`);
  console.log(`Duration: ${video.duration}`);
  console.log(`Link: ${video.link}`);
});
```

## 📺 Search Channels

```javascript
const channels = await client.search('Lofi Girl', { 
  limit: 5, 
  type: 'channel' 
});

channels.forEach(channel => {
  console.log(`Channel: ${channel.title}`);
  console.log(`Subscribers: ${channel.subscriberCount}`);
  console.log(`Link: ${channel.link}`);
});
```

## 📚 Search Playlists

```javascript
const playlists = await client.search('lofi beats', { 
  limit: 5, 
  type: 'playlist' 
});

playlists.forEach(playlist => {
  console.log(`Playlist: ${playlist.title}`);
  console.log(`Videos: ${playlist.videoCount}`);
  console.log(`Link: ${playlist.link}`);
});
```

## 🔄 Search All Types

```javascript
const results = await client.search('music', { 
  limit: 10, 
  type: 'all' 
});

// Filter by type
const videoCount = results.filter(r => r.type === 'video').length;
const channelCount = results.filter(r => r.type === 'channel').length;
const playlistCount = results.filter(r => r.type === 'playlist').length;

console.log(`Videos: ${videoCount}`);
console.log(`Channels: ${channelCount}`);
console.log(`Playlists: ${playlistCount}`);

// Display all with type
results.forEach(item => {
  console.log(`[${item.type}] ${item.title}`);
});
```

## 📋 Result Types

Each type has different properties:

**Video**
- `title`, `author`, `link`, `thumbnail`
- `duration`, `views`, `uploadedAt`

**Channel**
- `title`, `link`, `thumbnail`
- `subscriberCount`, `videoCount`

**Playlist**
- `title`, `author`, `link`, `thumbnail`
- `videoCount`, `updatedAt`

## ⚙️ Type-Specific Filtering

```javascript
// Get only videos
const onlyVideos = results.filter(r => r.type === 'video');

// Get only channels
const onlyChannels = results.filter(r => r.type === 'channel');

// Get only playlists
const onlyPlaylists = results.filter(r => r.type === 'playlist');
```

## 💡 Tips

- **Default type is 'video'** - Most searches default to videos
- **Use 'all' to discover** - Good for exploratory searches
- **Combine types** - Use multiple searches for each type
- **Check result.type** - Always check the type property

---

**← [Back to Usage Examples](./README.md)**
