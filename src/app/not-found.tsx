import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <Image
        src="/images/404.svg"
        width={500}
        height={500}
        alt="404 Not Found"
      />
      <Link
        href="/"
        className="mt-6 px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
