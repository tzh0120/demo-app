"use client"

import { useState } from "react"
import { MoreHorizontal } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MemoCardProps {
  content: string
  note?: string
  color: string
  timestamp: string
  emoji?: string
}

export function MemoCard({ content, note, color, timestamp, emoji }: MemoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-lg rounded-xl w-64",
        color,
        isHovered ? "scale-102" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="flex flex-row items-start justify-between space-x-4 pb-2">
        <span className="text-xl">{emoji}</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-black/5 p-1 rounded">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>编辑</DropdownMenuItem>
            <DropdownMenuItem>删除</DropdownMenuItem>
            <DropdownMenuItem>分类</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm font-medium">{content}</p>
        {note && (
          <p className="text-sm text-muted-foreground">{note}</p>
        )}
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </CardContent>
    </Card>
  )
}

