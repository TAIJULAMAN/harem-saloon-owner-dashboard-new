export type MediaType = "photo" | "video" | "All Type";
export type UsageFilter = "All Media" | "Used" | "Unused";

export interface Client {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface Service {
    id: string;
    name: string;
    category: string;
}

export interface Employee {
    id: string;
    name: string;
    avatar?: string;
}

export interface MediaItem {
    id: string;
    fileName: string;
    type: "photo" | "video";
    uploadedBy: string;
    uploadedAt: string;
    published: boolean;
    src: string;
}

export interface UploadFormData {
    clientId: string;
    serviceIds: string[];
    employeeIds: string[];
    notes: string;
    files: File[];
}