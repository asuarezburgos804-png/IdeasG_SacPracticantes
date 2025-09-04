import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function CustomSkeleton({
  variant = "table",
  rows = 5,
  columns = 6,
  cards = 3,
  showHeader = true,
  showFilters = true,
  className = "",
}) {
  const renderTableSkeleton = () => (
    <div className={`space-y-4 ${className}`}>
      {/* Header Skeleton */}
      {showHeader && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <Skeleton className="h-8 w-32 rounded-lg" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      )}

      {/* Filters Skeleton */}
      {showFilters && (
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-20 rounded-lg" />
              <Skeleton className="h-10 w-20 rounded-lg" />
            </div>
          </div>
        </Card>
      )}

      {/* Table Skeleton */}
      <Card>
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Table Header */}
            <div className="border-b border-default-200 p-4">
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                {Array.from({ length: columns }).map((_, index) => (
                  <Skeleton key={index} className="h-6 w-full rounded" />
                ))}
              </div>
            </div>
            
            {/* Table Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="border-b border-default-100 p-4">
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <Skeleton key={colIndex} className="h-8 w-full rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-between items-center p-4 border-t border-default-200">
          <Skeleton className="h-6 w-32 rounded" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
          <Skeleton className="h-6 w-24 rounded" />
        </div>
      </Card>
    </div>
  );

  const renderFormSkeleton = () => (
    <div className={`space-y-6 ${className}`}>
      {showHeader && (
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      )}
      
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Skeleton className="h-4 w-24 mb-2 rounded" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 mb-2 rounded" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Skeleton className="h-4 w-24 mb-2 rounded" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 mb-2 rounded" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
          
          <div>
            <Skeleton className="h-4 w-24 mb-2 rounded" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        </div>
      </Card>
    </div>
  );

  const renderCardsSkeleton = () => (
    <div className={`space-y-4 ${className}`}>
      {showHeader && (
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: cards }).map((_, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2 rounded" />
                  <Skeleton className="h-3 w-1/2 rounded" />
                </div>
              </div>
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-4/5 rounded" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-6 w-16 rounded" />
                <Skeleton className="h-6 w-20 rounded" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDashboardSkeleton = () => (
    <div className={`space-y-6 ${className}`}>
      {showHeader && (
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48 mb-2 rounded-lg" />
            <Skeleton className="h-4 w-32 rounded" />
          </div>
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-6 w-16 mb-1 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <Skeleton className="h-6 w-32 mb-4 rounded" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </Card>
        <Card className="p-6">
          <Skeleton className="h-6 w-32 mb-4 rounded" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </Card>
      </div>
    </div>
  );

  switch (variant) {
    case "form":
      return renderFormSkeleton();
    case "cards":
      return renderCardsSkeleton();
    case "dashboard":
      return renderDashboardSkeleton();
    case "table":
    default:
      return renderTableSkeleton();
  }
}
