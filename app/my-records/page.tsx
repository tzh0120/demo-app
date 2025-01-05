"use client"

import { Navigation } from "@/components/navigation"
import { RecordList } from "@/components/records/record-list"

export default function MyRecords() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="w-full px-4 py-8">
        <RecordList />
      </main>
    </div>
  )
} 