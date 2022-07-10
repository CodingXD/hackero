type Props = {
  type: "info" | "error";
  text: string;
};

export default function Alert({ type, text }: Props) {
  if (type === "error") {
    return (
      <div className="bg-red-300 text-red-800 px-3 py-2">
        <small>{text}</small>
      </div>
    );
  }

  return (
    <div className="bg-red-300 text-red-800 px-3 py-2">
      <small>{text}</small>
    </div>
  );
}
