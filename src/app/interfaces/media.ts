export interface Project {
    id: string,
    title: string,
    releaseDate: string,
    createdBy: string,
    duration: string,
    genre: string[],
    description?: string,
    credits?: string[],
    awards?: string[],
    roles: string[],
    videoHost: 'YOUTUBE' | 'VIMEO'
    videoId: string,

    // Calculated fields
    thumbnailUrl?: string
}

export interface VimeoResponse {
    type: "video";
    version: string;
    provider_name: "Vimeo";
    provider_url: string;
    title: string;
    author_name: string;
    author_url: string;
    is_plus: "0" | "1";
    account_type: "basic" | "plus" | "pro" | string;
    html: string;
    width: number;
    height: number;
    duration: number;
    description: string;
    thumbnail_url: string;
    thumbnail_width: number;
    thumbnail_height: number;
    thumbnail_url_with_play_button: string;
    upload_date: string; // or Date
    video_id: number;
    uri: string;
}