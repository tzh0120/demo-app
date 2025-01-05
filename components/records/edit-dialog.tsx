import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import EmojiPicker from 'emoji-picker-react'

interface EditDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (content: string, emoji?: string) => void
  initialContent: string
  initialEmoji?: string
}

export function EditDialog({ 
  isOpen, 
  onClose, 
  onSave, 
  initialContent,
  initialEmoji 
}: EditDialogProps) {
  const [content, setContent] = useState(initialContent)
  const [emoji, setEmoji] = useState(initialEmoji)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const handleSave = () => {
    onSave(content, emoji)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-lg font-normal text-gray-700">编辑备忘录</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="relative">
            <Button
              variant="outline"
              className="text-xl p-2 h-auto"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {emoji || '😀'}
            </Button>
            {showEmojiPicker && (
              <div className="absolute z-50 -right-2 mt-2">
                <EmojiPicker
                  onEmojiClick={(emojiData) => {
                    setEmoji(emojiData.emoji)
                    setShowEmojiPicker(false)
                  }}
                  width={300}
                  height={400}
                />
              </div>
            )}
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你的想法..."
            className="min-h-[200px] p-4 text-base leading-relaxed resize-none bg-transparent border-gray-200 focus:border-gray-300 focus:ring-0"
            autoFocus
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>取消</Button>
          <Button onClick={handleSave}>保存</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 