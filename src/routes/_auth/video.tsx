import { createFileRoute } from "@tanstack/react-router";
import { VideoService } from "../../services/VideoService";
import Spinner from "../../components/Spinner";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useState } from "react";
import { VideoVirtualList } from "../../components/VideoVirtualList";
import { VideoCardList } from "../../components/VideoCardList";
import { Toggle } from "../../components/Toggle";

export const Route = createFileRoute("/_auth/video")({
  component: () => <VideoPage />,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ["video"],
      queryFn: () => {
        return VideoService.getVideos();
      },
    });
  },
  pendingComponent: () => {
    return <Spinner />;
  },
});

const VideoPage = () => {
  const { data } = Route.useLoaderData();
  const parentRef = useRef<HTMLDivElement>(null);
  const [openVirtualList, triggerVirtualListOpen] = useState(false);

  const rowVirtualizer = useVirtualizer({
    count: data?.videos.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
  });

  return (
    <div>
      <div className="flex mx-[30%] mb-11 items-center justify-between">
        <Toggle onToggle={triggerVirtualListOpen} />
        <h1 className="text-yellow-400 font-semibold text-4xl">TV Series</h1>
      </div>
      <div
        ref={parentRef}
        style={{
          height: `800px`,
          overflow: "auto", // Make it scroll!
        }}
      >
        {openVirtualList ? (
          <VideoVirtualList
            rowVirtualizer={rowVirtualizer}
            videos={data?.videos || []}
          />
        ) : (
          <VideoCardList videos={data?.videos || []} />
        )}
      </div>
    </div>
  );
};
