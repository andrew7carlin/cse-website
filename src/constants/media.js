// ===========================================
// VIDEO URL CONFIGURATION
// ===========================================

// Self-hosted video (cleaner, no YouTube branding)
// Using Vite asset import for proper bundling
import lobbyVideo from '../assets/videos/Lobby_Presentation.mp4';

export const LOBBY_VIDEO_URL = lobbyVideo;

// Flag to indicate this is NOT a YouTube embed (uses native video tag)
export const IS_YOUTUBE = false;
