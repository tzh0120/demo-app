'use client'

import { useState } from 'react'
import { MoreVertical, PlusCircle } from 'lucide-react'
import { RecordCard } from "./record-card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface MemoItem {
  id: number
  time: string
  content: string
  icon?: string
  color?: string
}

interface DateGroup {
  date: string
  color?: string
  items: MemoItem[]
}

const initialMemos: DateGroup[] = [
  {
    date: "2024年1月2日",
    color: "",
    items: [
      {
        id: 1,
        time: "17:33",
        content: "今天又撸了一下午的鱼",
        color: "bg-white",
      }
    ]
  },
  {
    date: "2024年1月15日",
    color: "",
    items: [
      {
        id: 2,
        time: "15:45",
        content: "读完了村上春树的《挪威的森林》",
        icon: "📚",
        color: "bg-blue-50",
      },
      {
        id: 3,
        time: "10:30",
        content: "今天开始使用这个记录生活的小工具",
        icon: "✨",
        color: "bg-green-50",
      }
    ]
  },
  {
    date: "2024年1月14日",
    color: "",
    items: [
      {
        id: 4,
        time: "18:20",
        content: "小贴士：双击笔记可以编辑内容，点击右上角的颜色板可以更改笔记颜色",
        icon: "💡",
        color: "bg-yellow-50",
      }
    ]
  },
  {
    date: "2024年1月13日",
    color: "",
    items: [
      {
        id: 5,
        time: "20:30",
        content: "整理书架时翻到了大学时的笔记本，那些潦草的字迹里藏着最美的记忆",
        icon: "📖",
        color: "bg-purple-50",
      }
    ]
  },
  {
    date: "2024年1月12日",
    color: "",
    items: [
      {
        id: 6,
        time: "15:20",
        content: "午后的阳光透过窗帘，在地板上留下斑驳的影子",
        icon: "☀️",
        color: "bg-orange-50",
      }
    ]
  }
]

export function RecordList() {
  const [memos, setMemos] = useState<DateGroup[]>(initialMemos)

  const addMemo = (date: string) => {
    const newMemo = {
      id: Date.now(),
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      content: "新的笔记",
      color: "bg-white",
    }

    setMemos(prevMemos => {
      const dateGroup = prevMemos.find(group => group.date === date)
      if (dateGroup) {
        return prevMemos.map(group => 
          group.date === date 
            ? { ...group, items: [newMemo, ...group.items] }
            : group
        )
      } else {
        return [{ date, items: [newMemo] }, ...prevMemos]
      }
    })
  }

  const deleteAllMemos = (date: string) => {
    setMemos(prevMemos => prevMemos.filter(group => group.date !== date))
  }

  const deleteMemo = (dateIndex: number, memoIndex: number) => {
    setMemos(prevMemos => {
      const newMemos = [...prevMemos]
      const newItems = [...newMemos[dateIndex].items]
      newItems.splice(memoIndex, 1)
      
      if (newItems.length === 0) {
        newMemos.splice(dateIndex, 1)
      } else {
        newMemos[dateIndex] = {
          ...newMemos[dateIndex],
          items: newItems
        }
      }
      
      return newMemos
    })
  }

  const editMemo = (dateIndex: number, memoIndex: number, newContent: string, newEmoji?: string) => {
    setMemos(prevMemos => {
      const newMemos = [...prevMemos]
      newMemos[dateIndex].items[memoIndex] = {
        ...newMemos[dateIndex].items[memoIndex],
        content: newContent,
        icon: newEmoji || newMemos[dateIndex].items[memoIndex].icon
      }
      return newMemos
    })
  }

  const moveMemoUp = (dateIndex: number, memoIndex: number) => {
    if (memoIndex === 0) return
    
    setMemos(prevMemos => {
      const newMemos = [...prevMemos]
      const newItems = [...newMemos[dateIndex].items]
      
      const temp = newItems[memoIndex]
      newItems[memoIndex] = newItems[memoIndex - 1]
      newItems[memoIndex - 1] = temp
      
      newMemos[dateIndex] = {
        ...newMemos[dateIndex],
        items: newItems
      }
      
      return newMemos
    })
  }

  const moveMemoDown = (dateIndex: number, memoIndex: number) => {
    setMemos(prevMemos => {
      const newMemos = [...prevMemos]
      const newItems = [...newMemos[dateIndex].items]
      
      if (memoIndex === newItems.length - 1) return prevMemos
      
      const temp = newItems[memoIndex]
      newItems[memoIndex] = newItems[memoIndex + 1]
      newItems[memoIndex + 1] = temp
      
      newMemos[dateIndex] = {
        ...newMemos[dateIndex],
        items: newItems
      }
      
      return newMemos
    })
  }

  const changeGroupColor = (dateIndex: number, color: string) => {
    setMemos(prevMemos => {
      const newMemos = [...prevMemos]
      newMemos[dateIndex] = {
        ...newMemos[dateIndex],
        color: color
      }
      return newMemos
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {memos.map((dateGroup, dateIndex) => (
        <div 
          key={dateGroup.date} 
          className={`rounded-xl shadow-sm p-4 relative ${dateGroup.color || 'bg-white'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-normal text-gray-900">
              {dateGroup.date}
            </h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="grid grid-cols-3 gap-2 p-2">
                  {['bg-red-50', 'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-purple-50', 'bg-pink-50'].map((bgColor) => (
                    <div
                      key={bgColor}
                      className={`${bgColor} w-8 h-8 rounded cursor-pointer`}
                      onClick={() => changeGroupColor(dateIndex, bgColor)}
                    />
                  ))}
                </div>
                <DropdownMenuItem onClick={() => deleteAllMemos(dateGroup.date)}>删除所有笔记</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-3">
            {dateGroup.items.map((memo, memoIndex) => (
              <RecordCard 
                key={memo.id} 
                memo={memo}
                onDelete={() => deleteMemo(dateIndex, memoIndex)}
                onEdit={(newContent, newEmoji) => editMemo(dateIndex, memoIndex, newContent, newEmoji)}
                onMoveUp={() => moveMemoUp(dateIndex, memoIndex)}
                onMoveDown={() => moveMemoDown(dateIndex, memoIndex)}
                isFirst={memoIndex === 0}
                isLast={memoIndex === dateGroup.items.length - 1}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            className="w-full mt-3 text-gray-500 hover:text-gray-700"
            onClick={() => addMemo(dateGroup.date)}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            <span className="text-sm">添加笔记</span>
          </Button>
        </div>
      ))}
    </div>
  )
} 