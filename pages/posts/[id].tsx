import { ExternalLinkIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import CommentBox from "../../components/page/post/comment-box";
import getPost from "../../services/posts/get-post";

export default function Post() {
  const { query } = useRouter();
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
      <div className="min-h-screen flex flex-col justify-center lg:max-w-lg mx-auto mt-5">
        {data && (
          <>
            <div className="flex items-between">
              <div className="flex flex-col space-y-1">
                <div className="flex space-x-3 items-center">
                  <small className="bg-purple-500 text-white rounded-full text-xs p-2">
                    {data.points}
                  </small>
                  <div>
                    <h1 className="mr-3 text-xl">{data.title}</h1>
                    <small className="text-gray-500">
                      {new Date(data.created_at).toDateString()}&nbsp;|&nbsp;by{" "}
                      <strong>{data.author}</strong>
                    </small>
                  </div>
                </div>
              </div>
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-sm flex items-center space-x-1 text-blue-400 hover:text-blue-700"
              >
                <span>Visit</span>
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
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
