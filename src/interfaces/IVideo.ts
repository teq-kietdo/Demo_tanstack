export interface IVideoResponse {
    page: number;
    per_page: number;
    videos: IVideo[]
}

export interface IVideo {
    id: number;
    width: number;
    height: number;
    duration: number;
    url: string;
    image: string;
    user: {
        id: number;
        name: string;
        url: string;
    }
    video_files: IVideoFile[];
    video_pictures: IVideoPicture[]
}

export interface IVideoFile {
    id: number;
    quality: string;
    file_type: string;
    width: number;
    height: number;
    fps: number;
    link: string;
}

export interface IVideoPicture {
    id: number;
    nr: number;
    picture: string;
}