import { Skeleton } from "./ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900">
      {/* Header Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-blue-500/20 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Skeleton className="h-6 w-32 bg-gray-700" />
          <div className="hidden md:flex space-x-8">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-16 bg-gray-700" />
            ))}
          </div>
          <Skeleton className="h-10 w-24 bg-gray-700" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="pt-20 space-y-20">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton className="h-16 w-full bg-gray-700" />
              <Skeleton className="h-8 w-3/4 bg-gray-700" />
              <Skeleton className="h-6 w-full bg-gray-700" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-32 bg-gray-700" />
                <Skeleton className="h-12 w-32 bg-gray-700" />
              </div>
            </div>
            <div className="flex justify-center">
              <Skeleton className="w-80 h-80 rounded-full bg-gray-700" />
            </div>
          </div>
        </section>

        {/* Content Sections */}
        {[...Array(5)].map((_, index) => (
          <section key={index} className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <Skeleton className="h-12 w-64 mx-auto mb-4 bg-gray-700" />
              <Skeleton className="h-1 w-20 mx-auto bg-gray-700" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <Skeleton className="h-6 w-3/4 mb-4 bg-gray-700" />
                  <Skeleton className="h-4 w-full mb-2 bg-gray-700" />
                  <Skeleton className="h-4 w-2/3 bg-gray-700" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}