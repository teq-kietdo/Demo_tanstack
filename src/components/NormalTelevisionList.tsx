import { FC, useEffect, useState } from "react";
import { ITelevisionResult } from "../interfaces/IMovie";
import useRenderTime from "../hooks/useRenderTime";
import { IVideo } from "../interfaces/IVideo";

interface Props {
  televisionList: ITelevisionResult[];
  videoList: IVideo[];
}

export const NormalTelevisionList: FC<Props> = ({
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
    <div className="flex flex-wrap gap-4 w-[864px] mx-[30%] p-2" key={key}>
      {televisionList &&
        televisionList.map((television, index) => (
          <div key={index} className="h-[300px] rounded-lg ">
            <img
              className="rounded-lg w-[200px]"
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
};
