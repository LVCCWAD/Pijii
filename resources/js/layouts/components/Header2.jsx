import { Link } from '@inertiajs/react';

export default function PijiHeader2({ title = "Title" }) {
  return (
    <div className="flex justify-between items-center piji-green-2" style={{ padding: "15px 20px" }}>
      <h1 className="text-5xl font-bold">{title}</h1>
      <Link
        href="/create"
        className="flex text-xl bg-amber-50 rounded-xl drop-shadow-md"
        style={{ padding: "10px 35px" }}
      >
        Create +
      </Link>
    </div>
  );
}
