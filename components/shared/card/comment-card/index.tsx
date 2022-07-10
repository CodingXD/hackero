import { Comment } from "../../../../services/posts/get-post";
import CommentBox from "../../../page/post/comment-box";

type Props = {
  title: string | null;
  text: string;
  date: string;
  author: string;
  innerComments: Comment[];
  show_border: boolean;
};

export default function CommentCard({
  title,
  date,
  text,
  author,
  innerComments,
  show_border,
}: Props) {
  return (
    <div
      className={`flex flex-col ${
        show_border && "border border-slate-300 shadow"
      } px-4 py-3 bg-white`}
    >
      <small className="text-gray-500">
        {new Date(date).toDateString()}&nbsp;|&nbsp;by <strong>{author}</strong>
      </small>
      <h3 className="cursor-pointer">{title}</h3>
      <div
        dangerouslySetInnerHTML={{ __html: text }}
        className="prose-sm prose-stone"
      />
      <div className="mt-5 ml-5 space-y-2">
        <CommentBox comments={innerComments} show_border={false} />
      </div>
    </div>
  );
}
