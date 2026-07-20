const CHANNEL_ID =
  process.env.REACT_APP_YOUTUBE_CHANNEL_ID || "UClH8ts9rohU2hDZlrF_B-tQ";
const CORS_PROXY =
  process.env.REACT_APP_YOUTUBE_FEED_PROXY ||
  "https://api.allorigins.win/raw?url=";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const UPLOADS_PLAYLIST_ID = CHANNEL_ID.startsWith("UC")
  ? `UU${CHANNEL_ID.slice(2)}`
  : CHANNEL_ID;
const FEED_TIMEOUT_MS = 8000;

const parseRssXml = (xmlText) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "text/xml");
  const entries = doc.querySelectorAll("entry");
  const videos = [];

  entries.forEach((entry) => {
    const videoId = entry.querySelector("yt\\:videoId, videoId")?.textContent || "";
    const title = entry.querySelector("title")?.textContent || "";
    const published = entry.querySelector("published")?.textContent || "";
    const updated = entry.querySelector("updated")?.textContent || "";
    const thumbnail =
      entry.querySelector("media\\:group media\\:thumbnail, thumbnail")?.getAttribute("url") || "";
    const description =
      entry.querySelector("media\\:group media\\:description, description")?.textContent || "";
    const viewCount =
      entry.querySelector("media\\:statistics")?.getAttribute("views") || "0";
    const author = entry.querySelector("author name")?.textContent || "";

    if (videoId) {
      videos.push({
        videoId,
        title,
        published,
        updated,
        thumbnail:
          thumbnail.replace("hqdefault", "mqdefault") ||
          `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        description,
        viewCount: parseInt(viewCount, 10) || 0,
        author,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        shareUrl: `https://www.youtube.com/watch?v=${videoId}`,
      });
    }
  });

  return videos;
};

export const fetchYouTubeVideos = async () => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), FEED_TIMEOUT_MS);

  let response;

  try {
    response = await fetch(`${CORS_PROXY}${encodeURIComponent(RSS_URL)}`, {
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch YouTube feed: ${response.status}`);
  }

  const xmlText = await response.text();
  return parseRssXml(xmlText);
};

export const buildVideoShareData = (video) => {
  return {
    url: video.shareUrl,
    title: `${video.title} | Imyanya Rwanda`,
    description: video.description || `Watch: ${video.title}`,
    quote: video.description || `Check out this video: ${video.title}`,
    hashtags: ["ImyanyaRwanda", "RwandaJobs", "YouTube"],
  };
};

export { CHANNEL_ID, RSS_URL, UPLOADS_PLAYLIST_ID };
