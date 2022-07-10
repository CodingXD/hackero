import { Comment } from "../../../../services/posts/get-post";
import Card from "../../../shared/card";

type Props = {
  comments: Comment[];
  show_border: boolean;
};

export default function CommentBox({ comments, show_border }: Props) {
  if (comments.length === 0) return null;

  return comments.map(({ author, children, created_at, text, title }, i) => (
    <Card
      key={i}
      type="comment"
      author={author as string}
      date={created_at}
      title={title}
      text={text}
      innerComments={children}
      show_border={show_border}
    />
  ));
}
