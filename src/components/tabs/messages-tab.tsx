import { Search, Send, MoreVertical } from 'lucide-react'
import { Button } from '../ui/button'

const conversations = [
  {
    id: 1,
    name: 'Машка Неваляшка',
    lastMessage: 'Привет! Как продвигается задача?',
    time: '10:30',
    unread: 2,
    avatar: 'MS'
  },
  {
    id: 2,
    name: 'Командный чат',
    lastMessage: 'Леха: Готов прототип для ревью',
    time: '09:15',
    unread: 0,
    avatar: '👥'
  },
  {
    id: 3,
    name: 'Леха Грибоедов',
    lastMessage: 'Можешь проверить PR?',
    time: 'Вчера',
    unread: 1,
    avatar: 'АИ'
  }
]

export function MessagesTab() {
  return (
    <div className="flex h-[600px] bg-black border border-gray-800 rounded-lg">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Поиск сообщений..."
              className="w-full pl-10 pr-4 py-2 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-700"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="p-4 border-b border-gray-800 hover:bg-gray-900 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">{conversation.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white truncate">{conversation.name}</h4>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {conversation.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">MS</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Мария Сидорова</h3>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
            <button className="text-gray-600 hover:text-gray-400">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="bg-gray-800 rounded-lg p-3 max-w-xs">
                <p className="text-white text-sm">Привет! Как продвигается задача по дашборду?</p>
                <span className="text-xs text-gray-500 mt-1">10:30</span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-500 rounded-lg p-3 max-w-xs">
                <p className="text-white text-sm">Привет! Почти закончил, осталось добавить графики</p>
                <span className="text-xs text-blue-200 mt-1">10:32</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Введите сообщение..."
              className="flex-1 px-4 py-2 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-700"
            />
            <Button className="bg-white text-black hover:bg-gray-200 border-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}