import { Virtualizer } from "@tanstack/react-virtual";
import { FC } from "react";
import { IVideo } from "../interfaces/IVideo";
import useRenderTime from "../hooks/useRenderTime";

interface Props {
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  videos: IVideo[];
}

export const VideoVirtualList: FC<Props> = ({ rowVirtualizer, videos }) => {
  const { renderTime } = useRenderTime();
  console.log(renderTime);

  return (
    <div
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: "100%",
        position: "relative",
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualItem) => {
        const video = videos[virtualItem.index];
        return (
          <div
            key={virtualItem.key}
            style={{
              position: "absolute",
              top: 0,
              left: "30%",
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <video
              width="440px"
              controls
              muted
              // autoPlay
              loop
              className="w-[440px] h-[200px]"
            >
              <source src={video?.video_files[0].link || ""} type="video/mp4" />
            </video>
          </div>
        );
      })}
    </div>
  );
};
