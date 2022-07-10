import type { NextPage } from "next";
import Head from "next/head";
import { SearchIcon, AdjustmentsIcon } from "@heroicons/react/outline";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import getPosts from "../services/posts/get-posts";
import Card from "../components/shared/card";
import SkeletonContainer from "../components/skeleton/container";
import Alert from "../components/shared/alert";

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const validTags = useMemo(() => ["story"], []);

  const { data, error, isLoading } = useQuery(
    ["posts", searchTerm],
    () => getPosts(searchTerm),
    {
      enabled: !!searchTerm,
      staleTime: Infinity,
    }
  );

  return (
    <>
      <Head>
        <title>Hackero</title>
        <meta name="description" content="Get hacker new posts" />
      </Head>
      <div className="flex flex-col items-center justify-center mx-auto lg:mt-40 w-1/2">
        {/* Search bar Begins */}
        <div className="relative w-full rounded-md shadow-sm mb-5">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-500 sm:text-sm h-4 w-4" />
          </div>
          <input
            type="search"
            name="post"
            id="post"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:ring-indigo-500 focus:border-indigo-500 block min-w-full pl-14 pr-17 py-5 sm:text-sm border-gray-300"
            placeholder="type something..."
          />
        </div>
        {/* Search bar Begins */}

        {/* Loading skeleton Begins */}
        {isLoading && <SkeletonContainer count={6} />}
        {/* Loading skeleton Ends */}

        {/* Search results Begins */}

        {/* Handling error state */}
        {!isLoading && error && (
          <Alert type="error" text="Failed to get posts!" />
        )}

        {/* Handling empty state */}
        {!isLoading && data?.hits.length === 0 && (
          <Alert type="info" text="No posts found!" />
        )}

        {/* Handling data display */}
        {!isLoading && data?.hits.length > 0 && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-full gap-3 min-w-[32rem] max-w-7xl">
            {data?.hits.map(
              (
                { title, created_at, _tags, author, objectID, story_title },
                i
              ) => (
                <Card
                  key={i}
                  id={objectID}
                  title={title || story_title}
                  date={created_at}
                  author={author}
                  tags={_tags.filter((t) => validTags.includes(t))}
                  type="post"
                />
              )
            )}
          </div>
        )}
        {/* Search results Ends */}
      </div>
    </>
  );
};

export default Home;
