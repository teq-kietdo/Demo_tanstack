import { FC } from "react";
import { IVideo } from "../interfaces/IVideo";
import useRenderTime from "../hooks/useRenderTime";

interface Props {
  videos: IVideo[];
}

export const VideoCardList: FC<Props> = ({ videos }) => {
  const { renderTime } = useRenderTime();
  console.log(renderTime);
  return (
    <>
      {videos.map((video) => (
        <div key={video.id}>
          <video
            width="440px"
            controls
            muted
            autoPlay
            loop
            className="w-[440px] h-[200px]"
          >
            <source src={video.video_files[0].link} type="video/mp4" />
          </video>
        </div>
      ))}
    </>
  );
};
