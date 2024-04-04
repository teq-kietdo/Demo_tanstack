import { FC, useEffect, useState } from "react";
import { Virtualizer } from "@tanstack/react-virtual";
import { ITelevisionResult } from "../interfaces/IMovie";
import useRenderTime from "../hooks/useRenderTime";
import { IVideo } from "../interfaces/IVideo";

interface Props {
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  televisionList: ITelevisionResult[];
  videoList: IVideo[];
}

export const VirtualTelevisionList: FC<Props> = ({
  rowVirtualizer,
  televisionList,
  videoList,
}) => {
  const { renderTime } = useRenderTime();

  const [key, setKey] = useState(0);
  useEffect(() => {
    console.log(renderTime + "  Normal List");
    setKey(new Date().getTime());
  }, [televisionList]);

  const video = videoList[Math.floor(Math.random() * videoList.length)];

  return (
    <div
      key={key}
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: "100%",
        position: "relative",
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualItem) => {
        const calculateSize = virtualItem.index * 4;
        const list = televisionList.slice(
          calculateSize,
          (calculateSize + 1) * 4
        );

        return (
          <div
            key={virtualItem.key}
            style={{
              position: "absolute",
              top: 0,
              left: "30%",
              width: "864px",
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
            className="flex flex-wrap gap-4 p-2"
          >
            {list.map((television, index) => (
              <div key={index} className="h-[300px] w-[200px] rounded-lg">
                <img
                  className="rounded-lg"
                  src={`https://image.tmdb.org/t/p/original/${television.poster_path}`}
                />
                <div className="invisible w-0 h-0 overflow-hidden">
                  <div>
                    <video
                      width="440px"
                      controls
                      muted
                      autoPlay
                      loop
                      className="w-[440px] h-[200px]"
                    >
                      <source src={video.url} type="video/mp4" />
                    </video>
                  </div>
                  {/* {index % 10 === 0 && index > 0 && (
                    <iframe
                      width="1280"
                      height="720"
                      src="https://www.youtube.com/embed/YZ5tOe7y9x4"
                      title="Software engineer interns on their first day be like..."
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
