import Skeleton from "..";

type Props = {
  count: number;
};

export default function SkeletonContainer({ count }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-3 w-full">
      {Array.from(Array(count).keys()).map((i) => (
        <Skeleton key={i} />
      ))}
    </div>
  );
}
