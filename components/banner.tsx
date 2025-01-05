import { Cloud, Sun, Leaf, Wind, Stars } from "lucide-react"

const Banner = () => {
  return (
    <div className="relative w-full bg-gradient-to-r from-blue-50 via-pink-50 to-green-50 py-12 overflow-hidden">
      {/* 装饰元素 */}
      <div className="absolute inset-0">
        <Sun 
          className="absolute top-4 left-[10%] w-12 h-12 text-yellow-400/40 animate-float"
          style={{animationDelay: '0s'}}
        />
        <Cloud 
          className="absolute top-8 right-[15%] w-16 h-16 text-blue-400/40 animate-float"
          style={{animationDelay: '1s'}}
        />
        <Leaf 
          className="absolute bottom-4 left-[20%] w-8 h-8 text-green-400/40 animate-float"
          style={{animationDelay: '2s'}}
        />
        <Wind 
          className="absolute top-6 left-[40%] w-10 h-10 text-blue-300/30 animate-float"
          style={{animationDelay: '1.5s'}}
        />
        <Stars 
          className="absolute bottom-8 right-[30%] w-8 h-8 text-purple-300/30 animate-float"
          style={{animationDelay: '0.5s'}}
        />
      </div>
      
      {/* 主要内容 */}
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-3xl font-light text-gray-700 mb-2">
          记录每一天的点滴
        </h1>
        <p className="text-sm text-gray-500 font-light">
          让美好永远保存
        </p>
      </div>
    </div>
  )
}

export default Banner 