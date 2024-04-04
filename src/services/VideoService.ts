import { IVideoResponse } from "../interfaces/IVideo";
import { httpVideo, requestHandler } from "../utils/httpClient";

export const VideoService = {
    getVideos(per_page?: string) {
        const callApi = () => {
            return httpVideo.get<IVideoResponse>(`/videos/popular`, {
                params: { per_page: per_page || 80 },
            });
        };
        return requestHandler(callApi);
    },
}