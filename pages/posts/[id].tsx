import { ArrowLeftIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import CommentBox from "../../components/page/post/comment-box";
import Alert from "../../components/shared/alert";
import SkeletonContainer from "../../components/skeleton/container";
import getPost from "../../services/posts/get-post";

export default function Post() {
  const { query, back } = useRouter();
  const { data, error, isLoading } = useQuery(
    [`post-${query.id}`, query.id],
    () => getPost(query.id as string),
    {
      enabled: !!query.id,
      retry: 0,
      staleTime: Infinity,
    }
  );

  return (
    <>
      <Head>
        <title>{isLoading ? "Getting page info..." : data?.title}</title>
      </Head>
      <ArrowLeftIcon
        className="md:block hidden h-5 w-5 absolute top-4 left-5 cursor-pointer"
        onClick={back}
      />
      <div className="flex flex-col items-start justify-center mx-auto md:mt-40 mt-5 md:w-1/2 px-4">
        {/* Loading skeleton Begins */}
        {isLoading && <SkeletonContainer count={6} layout="vertical" />}
        {/* Loading skeleton Ends */}

        {/* Handling error state */}
        {!isLoading && error && (
          <Alert type="error" text="Failed to get posts!" />
        )}

        {/* Handling empty state */}
        {!isLoading && !error && !data && (
          <Alert type="info" text="No posts found!" />
        )}

        {!isLoading && !error && data && (
          <>
            <div className="flex justify-between">
              <div className="flex flex-col space-y-1">
                <h1 className="mr-3 text-xl w-full">{data.title}</h1>
                <small className="text-gray-500">
                  {new Date(data.created_at).toDateString()}&nbsp;|&nbsp;by{" "}
                  <strong>{data.author}</strong>&nbsp;|&nbsp;
                  <strong>{data.points}</strong>&nbsp;Points&nbsp;|&nbsp;
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm inline-flex items-center space-x-1 text-blue-400 hover:text-blue-700"
                  >
                    <span>Visit</span>
                    <ExternalLinkIcon className="h-4 w-4" />
                  </a>
                </small>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              {data.children && data.children.length > 0 && (
                <CommentBox comments={data.children} show_border />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
