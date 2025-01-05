import { useState } from 'react'
import { MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditDialog } from "./edit-dialog"

interface RecordCardProps {
  memo: {
    time: string
    content: string
    icon?: string
    color?: string
  }
  onDelete: () => void
  onEdit: (newContent: string, emoji?: string) => void
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
}

export function RecordCard({ 
  memo, 
  onDelete, 
  onEdit, 
  onMoveUp, 
  onMoveDown,
  isFirst,
  isLast 
}: RecordCardProps) {
  const [color, setColor] = useState(memo.color || 'bg-gray-50')
  const [customColor, setCustomColor] = useState('')
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  return (
    <>
      <div className={`${color} rounded-lg p-3 relative group`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm hover:bg-gray-50"
            >
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="grid grid-cols-3 gap-2 p-2">
              {['bg-red-50', 'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-purple-50', 'bg-pink-50'].map((bgColor) => (
                <div
                  key={bgColor}
                  className={`${bgColor} w-8 h-8 rounded cursor-pointer`}
                  onClick={() => setColor(bgColor)}
                />
              ))}
            </div>
            <DropdownMenuItem>
              <input
                type="text"
                placeholder="自定义颜色"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                onBlur={() => setColor(customColor)}
                className="w-full border rounded p-1"
              />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              编辑
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>删除</DropdownMenuItem>
            {!isFirst && (
              <DropdownMenuItem onClick={onMoveUp}>上移一层</DropdownMenuItem>
            )}
            {!isLast && (
              <DropdownMenuItem onClick={onMoveDown}>下移一层</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="space-y-2 pr-6">
          <div className="flex items-start gap-2">
            {memo.icon && <span className="text-lg">{memo.icon}</span>}
            <p className="text-gray-900 flex-1 text-sm">{memo.content}</p>
          </div>
          <time className="text-xs text-gray-500 block">{memo.time}</time>
        </div>
      </div>

      <EditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={(content, emoji) => onEdit(content, emoji)}
        initialContent={memo.content}
        initialEmoji={memo.icon}
      />
    </>
  )
} 