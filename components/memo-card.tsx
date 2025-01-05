"use client"

import { Card, CardContent } from "@/components/ui/card"

export function MemoCard({
  content,
  note,
  color,
  timestamp,
  emoji,
}: {
  content: string
  note: string
  color: string
  timestamp: string
  emoji: string
}) {
  return (
    <Card className={`w-[300px] ${color} border-none transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md hover:-translate-y-1`}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <span className="text-3xl">{emoji}</span>
            <div className="space-y-1">
              <p className="text-base leading-relaxed">{content}</p>
              <div className="text-sm text-gray-500">{timestamp}</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{note}</p>
        </div>
      </CardContent>
    </Card>
  )
}

