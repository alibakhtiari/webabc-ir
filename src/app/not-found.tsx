import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-50">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">404 - Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md">
                Sorry, we couldn&apos;t find the page you were looking for. It might have been moved or doesn&apos;t exist.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
                Return Home
            </Link>
        </div>
    )
}
