import Link from "next/link";

export function MainNav() {
  return (
    <nav className="flex items-center space-x-6">
      <Link href="/dashboard" className="text-lg font-semibold">
        MeetSync
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Dashboard
        </Link>
        <Link
          href="/book"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Schedule Meeting
        </Link>
      </div>
    </nav>
  );
} 