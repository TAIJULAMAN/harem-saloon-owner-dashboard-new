export interface MediaItem {
    id: number;
    fileName: string;
    uploadedAt: string;
    type: "photo" | "video";
    thumbnail: string;
}