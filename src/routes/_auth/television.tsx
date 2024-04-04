import { createFileRoute } from "@tanstack/react-router";
import { MovieService } from "../../services/MovieService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { VirtualTelevisionList } from "../../components/VirtualTelevisionList";
import { Toggle } from "../../components/Toggle";
import { NormalTelevisionList } from "../../components/NormalTelevisionList";
import { VideoService } from "../../services/VideoService";

export const Route = createFileRoute("/_auth/television")({
  component: () => <TelevisionPage />,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ["video"],
      queryFn: () => {
        return VideoService.getVideos();
      },
    });
  },
});

function TelevisionPage() {
  const [openVirtualList, triggerVirtualListOpen] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const { data: videos } = Route.useLoaderData();

  const dataVideos = videos?.videos || [];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["television"],
      queryFn: async ({ pageParam }) => {
        const res = await MovieService.getTelevision(pageParam);
        return res.data;
      },
      initialPageParam: undefined || "",
      getNextPageParam: (previousData) => {
        if (previousData) {
          return (previousData.page + 1).toString();
        }
        return "1";
      },
    });

  const televisionList = useMemo(
    () => data?.pages.flatMap((page) => page?.results || []) || [],
    [data]
  );

  const rowVirtualizer = useVirtualizer({
    count: televisionList.length / 4,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300 + 16,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }
    // console.log(televisionList.length / 4 - 1);
    // console.log(lastItem.index);
    if (
      lastItem.index + 0.75 >= televisionList.length / 4 - 1 &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    televisionList.length,
    isFetchingNextPage,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    rowVirtualizer.getVirtualItems(),
    rowVirtualizer,
  ]);

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
          <VirtualTelevisionList
            rowVirtualizer={rowVirtualizer}
            televisionList={televisionList}
            videoList={dataVideos}
          />
        ) : (
          <NormalTelevisionList
            televisionList={televisionList}
            videoList={dataVideos}
          />
        )}
      </div>
    </div>
  );
}
