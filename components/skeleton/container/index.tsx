import Skeleton from "..";

type Props = {
  count: number;
  layout: "horizontal" | "vertical";
};

export default function SkeletonContainer({ count, layout }: Props) {
  let classes = "flex flex-col space-y-3 w-full";
  if (layout === "horizontal") {
    classes = "grid md:grid-cols-3 gap-3 w-full";
  }
  return (
    <div className={classes}>
      {Array.from(Array(count).keys()).map((i) => (
        <Skeleton key={i} />
      ))}
    </div>
  );
}
