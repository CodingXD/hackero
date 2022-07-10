import { Comment } from "../../../services/posts/get-post";
import CommentCard from "./comment-card";
import PostCard from "./post-card";

type Props = {
  id?: string;
  title: string | null;
  date: string;
  author: string;
  tags?: string[];
  text?: string;
  points?: number;
  innerComments: Comment[];
  type: "post" | "comment";
  show_border: boolean;
};

export default function Card(props: Props) {
  if (props.type === "comment") return <CommentCard {...props} />;

  return <PostCard {...props} />;
}
