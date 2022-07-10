import Link from "next/link";
import Badge from "../../badge";

type Props = {
  id: string;
  title: string | null;
  date: string;
  author: string;
  points: number;
  tags: string[];
  type: "post" | "comment";
};

export default function PostCard({
  id,
  title,
  date,
  author,
  points,
  tags,
}: Props) {
  return (
    <div className="flex flex-col border border-slate-300 shadow px-4 py-3 bg-white min-w-full">
      <small className="text-gray-500">
        {new Date(date).toDateString()}&nbsp;|&nbsp;by <strong>{author}</strong>
        &nbsp;|&nbsp;<strong>{points}</strong> Points
      </small>
      <Link href={`/posts/${id}`}>
        <h3 className="cursor-pointer text-sm">{title}</h3>
      </Link>
      <div className="mt-auto flex space-y-3">
        {tags?.map((t, i) => (
          <Badge key={i} text={t} />
        ))}
      </div>
    </div>
  );
}
