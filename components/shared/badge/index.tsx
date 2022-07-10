type Props = {
  text: string;
};

export default function Badge({ text }: Props) {
  return (
    <small className="bg-purple-800 text-white rounded-full px-3 py-1 text-xs mr-1 uppercase">
      {text}
    </small>
  );
}
