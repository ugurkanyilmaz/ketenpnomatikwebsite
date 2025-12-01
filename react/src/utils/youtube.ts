/**
 * YouTube URL utilities
 */

/**
 * Converts a YouTube watch URL to embed URL
 * Supports multiple YouTube URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID (already embed format)
 * - https://m.youtube.com/watch?v=VIDEO_ID
 * 
 * @param url - YouTube URL in any format
 * @returns Embed URL or original URL if not a valid YouTube link
 */
export function convertToYouTubeEmbed(url: string): string {
  if (!url || url.trim() === '') {
    return url
  }

  // Already in embed format
  if (url.includes('/embed/')) {
    return url
  }

  // Extract video ID from various YouTube URL formats
  let videoId: string | null = null

  try {
    const urlObj = new URL(url)
    
    // Format: youtube.com/watch?v=VIDEO_ID
    if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
      videoId = urlObj.searchParams.get('v')
    }
    // Format: youtu.be/VIDEO_ID
    else if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1).split('?')[0]
    }
    // Format: m.youtube.com/watch?v=VIDEO_ID
    else if (urlObj.hostname === 'm.youtube.com' && urlObj.searchParams.has('v')) {
      videoId = urlObj.searchParams.get('v')
    }
  } catch (e) {
    // Invalid URL, return original
    return url
  }

  // If we found a video ID, return embed URL
  if (videoId && videoId.length > 0) {
    return `https://www.youtube.com/embed/${videoId}`
  }

  // Return original URL if we couldn't parse it
  return url
}

/**
 * Checks if a URL is a valid YouTube URL
 */
export function isYouTubeUrl(url: string): boolean {
  if (!url) return false
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.includes('youtube.com') || urlObj.hostname === 'youtu.be'
  } catch {
    return false
  }
}
