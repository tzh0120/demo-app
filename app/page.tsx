"use client"

import { MemoCard } from "@/components/memo-card"
import { Navigation } from "@/components/navigation"
import { AddMemoButton } from "@/components/add-memo-button"
import { useEffect, useState, useRef } from "react"
import Banner from "@/components/banner"

export default function Home() {
  // Sample memo data with more cards
  const memos = [
    {
      id: 1,
      content: "读完了村上春树的《挪威的森林》",
      note: "书中说：每个人都有属于自己的生活，我们不能寄求于他人，但求无愧于心。这句话让我思考了很久。",
      color: "bg-pink-50",
      timestamp: "2024-01-05 10:30",
      emoji: "📚"
    },
    {
      id: 2,
      content: "和朋友一起喝咖啡聊天，才发现原来我们都在经历着相似的困惑和成长。",
      note: "分享让快乐加倍，也让烦恼减半。今天的拿铁特别香醇。",
      color: "bg-green-50",
      timestamp: "2024-01-05 14:20",
      emoji: "☕"
    },
    {
      id: 3,
      content: "清晨在公园里散步，看到一群老人在打太极，动作缓慢却充满力量。",
      note: "生活的节奏不必总是那么快，慢下来也是一种智慧。",
      color: "bg-blue-50",
      timestamp: "2024-01-05 08:15",
      emoji: "🌅"
    },
    {
      id: 4,
      content: "今天学会了一道新菜，红烧茄子。",
      note: "虽然卖相不是很好，但是味道还不错。慢慢来，总会越来越好的。",
      color: "bg-purple-50",
      timestamp: "2024-01-06 18:45",
      emoji: "🍆"
    },
    {
      id: 5,
      content: "终于完成了那个一直拖延的项目！",
      note: "感觉整个人都轻松了。下次要记住，开始永远是最难的部分。",
      color: "bg-yellow-50",
      timestamp: "2024-01-07 22:10",
      emoji: "🎉"
    },
    {
      id: 6,
      content: "今天的日落特别美，整个天空都是粉红色的。",
      note: "有时候，我们需要停下来欣赏生活中的小确幸。",
      color: "bg-red-50",
      timestamp: "2024-01-08 19:30",
      emoji: "🌅"
    },
    {
      id: 7,
      content: "开始学习一门新语言：西班牙语",
      note: "Hola! Como estas? 学习新东西的感觉真好！",
      color: "bg-indigo-50",
      timestamp: "2024-01-09 10:00",
      emoji: "🇪🇸"
    },
    {
      id: 8,
      content: "今天遇到了一只可爱的小狗，让我的心情瞬间变好了。",
      note: "有时候，快乐就是这么简单。",
      color: "bg-orange-50",
      timestamp: "2024-01-10 15:20",
      emoji: "🐶"
    }
  ]

  // 使用 state 来存储位置信息
  const [positions, setPositions] = useState<Array<{
    left: string;
    top: string;
    rotation: number;
  }>>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculatePositions = () => {
      if (!containerRef.current) return;
      
      const safeMargin = 10; // 边距（像素）
      const cardWidth = 300; // 卡片宽度（像素）
      const cardHeight = 200; // 卡片高度（像素）
      const minDistance = 150; // 卡片间最小距离（像素）

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      const newPositions: Array<{left: string; top: string; rotation: number}> = [];

      const isOverlapping = (x: number, y: number) => {
        return newPositions.some(pos => {
          const posX = parseFloat(pos.left) * containerWidth / 100;
          const posY = parseFloat(pos.top) * containerHeight / 100;
          const distance = Math.sqrt(
            Math.pow(x - posX, 2) + Math.pow(y - posY, 2)
          );
          return distance < minDistance;
        });
      };

      memos.forEach(() => {
        let attempts = 0;
        let position;
        
        do {
          const leftPx = safeMargin + Math.random() * (containerWidth - cardWidth - 2 * safeMargin);
          const topPx = safeMargin + Math.random() * (containerHeight - cardHeight - 2 * safeMargin);
          
          if (!isOverlapping(leftPx, topPx) || attempts > 100) {
            position = {
              left: `${(leftPx / containerWidth) * 100}%`,
              top: `${(topPx / containerHeight) * 100}%`,
              rotation: Math.random() * 8 - 4,
            };
          }
          attempts++;
        } while (!position && attempts <= 100);

        if (position) {
          newPositions.push(position);
        }
      });

      setPositions(newPositions);
    };

    // 延迟执行以确保 DOM 已加载
    const timer = setTimeout(calculatePositions, 0);
    window.addEventListener('resize', calculatePositions);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePositions);
    };
  }, [memos.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Banner />
      <main className="w-full px-4 py-8">
        <div 
          ref={containerRef}
          className="memo-container relative h-[calc(100vh-12rem)] w-full"
        >
          {positions.map((position, index) => (
            <div
              key={memos[index].id}
              className="absolute transition-all duration-500 ease-in-out hover:z-50"
              style={{
                left: position.left,
                top: position.top,
                transform: `rotate(${position.rotation}deg)`,
                opacity: 0,
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
              }}
            >
              <MemoCard {...memos[index]} />
            </div>
          ))}
        </div>
      </main>
      <AddMemoButton />
    </div>
  )
}

