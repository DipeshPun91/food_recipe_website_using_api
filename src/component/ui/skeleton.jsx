import React from "react";

const Skeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Skeleton width={200} height={24} className="mb-8" />
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <Skeleton height={400} className="w-full" />
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <Skeleton height={32} width="60%" className="mb-6" />
                <div className="space-y-4">
                  {[...Array(12)].map((_, i) => (
                    <Skeleton key={i} height={24} />
                  ))}
                </div>
              </div>
              <div>
                <Skeleton height={32} width="60%" className="mb-6" />
                <div className="space-y-6">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} height={80} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
