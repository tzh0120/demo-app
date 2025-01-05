"use client"

import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function AddMemoButton() {
  return (
    <Button
      size="icon"
      className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg"
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">添加新记录</span>
    </Button>
  )
}

