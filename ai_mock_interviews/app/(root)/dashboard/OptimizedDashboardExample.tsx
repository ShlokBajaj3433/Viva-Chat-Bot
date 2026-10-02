/**
 * Example: Optimized Dashboard Implementation
 * 
 * Demonstrates how to use all performance optimizations together
 * for maximum efficiency
 */

"use client";

import { useState, useEffect, useMemo, useCallback, Suspense, memo } from "react";
import dynamic from "next/dynamic";
import { dataCache, debounce, chunkArray } from "@/lib/performance-utils";
import { ListSkeleton } from "@/components/LoadingSkeletons";

// Lazy load heavy components
const OptimizedClassroomCard = dynamic(
  () => import("@/components/OptimizedClassroomCard"),
  { loading: () => <ListSkeleton count={1} /> }
);

const OptimizedInterviewCard = dynamic(
  () => import("@/components/OptimizedInterviewCard"),
  { loading: () => <ListSkeleton count={1} /> }
);

interface DashboardData {
  classrooms: any[];
  interviews: any[];
  assignments: any[];
}

export default function OptimizedDashboard({ userId }: { userId: string }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const ITEMS_PER_PAGE = 12;

  // Fetch data with caching
  useEffect(() => {
    async function fetchData() {
      const cacheKey = `dashboard-${userId}`;
      
      // Check cache first
      if (dataCache.has(cacheKey)) {
        setData(dataCache.get(cacheKey));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [classrooms, interviews, assignments] = await Promise.all([
          fetch(`/api/classrooms?userId=${userId}`).then(r => r.json()),
          fetch(`/api/interviews?userId=${userId}`).then(r => r.json()),
          fetch(`/api/assignments?userId=${userId}`).then(r => r.json()),
        ]);

        const dashboardData = { classrooms, interviews, assignments };
        
        // Cache the result
        dataCache.set(cacheKey, dashboardData);
        setData(dashboardData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
      setCurrentPage(1); // Reset to first page on new search
    }, 300),
    []
  );

  // Memoized filtered data
  const filteredInterviews = useMemo(() => {
    if (!data?.interviews) return [];
    if (!searchQuery) return data.interviews;

    const query = searchQuery.toLowerCase();
    return data.interviews.filter((interview: any) =>
      interview.role?.toLowerCase().includes(query) ||
      interview.type?.toLowerCase().includes(query) ||
      interview.techstack?.some((tech: string) => 
        tech.toLowerCase().includes(query)
      )
    );
  }, [data?.interviews, searchQuery]);

  // Memoized pagination
  const paginatedInterviews = useMemo(() => {
    const chunks = chunkArray(filteredInterviews, ITEMS_PER_PAGE);
    return chunks[currentPage - 1] || [];
  }, [filteredInterviews, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredInterviews.length / ITEMS_PER_PAGE);
  }, [filteredInterviews.length]);

  // Memoized stats
  const stats = useMemo(() => {
    if (!data) return null;
    
    return {
      totalClassrooms: data.classrooms.length,
      totalInterviews: data.interviews.length,
      completedInterviews: data.interviews.filter((i: any) => i.status === 'completed').length,
      averageScore: data.interviews.reduce((acc: number, i: any) => acc + (i.score || 0), 0) / (data.interviews.length || 1),
      totalAssignments: data.assignments.length,
      pendingAssignments: data.assignments.filter((a: any) => !a.completed).length,
    };
  }, [data]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="h-32 bg-gray-200 rounded animate-pulse" />
          <ListSkeleton count={6} />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Stats Dashboard - Memoized */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Classrooms" value={stats.totalClassrooms} icon="📚" />
          <StatCard title="Interviews Completed" value={stats.completedInterviews} icon="✅" />
          <StatCard title="Average Score" value={`${Math.round(stats.averageScore)}%`} icon="📊" />
          <StatCard title="Pending Assignments" value={stats.pendingAssignments} icon="⏳" />
        </div>
      )}

      {/* Search Bar with Debounce */}
      <div className="max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search interviews by role, type, or tech stack..."
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchQuery && (
          <p className="text-sm text-gray-500 mt-2">
            Found {filteredInterviews.length} results for "{searchQuery}"
          </p>
        )}
      </div>

      {/* Classrooms Section - Lazy Loaded */}
      <section>
        <h2 className="text-2xl font-bold mb-4">My Classrooms</h2>
        <Suspense fallback={<ListSkeleton count={3} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.classrooms.slice(0, 6).map((classroom: any) => (
              <OptimizedClassroomCard key={classroom.id} classroom={classroom} />
            ))}
          </div>
        </Suspense>
      </section>

      {/* Recent Interviews - Paginated */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Recent Interviews</h2>
        <Suspense fallback={<ListSkeleton count={6} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedInterviews.map((interview: any) => (
              <OptimizedInterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        </Suspense>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

// Memoized Stat Card Component
const StatCard = memo(({ title, value, icon }: { title: string; value: number | string; icon: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </div>
));

StatCard.displayName = "StatCard";
