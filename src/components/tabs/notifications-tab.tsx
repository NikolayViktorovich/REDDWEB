import { Bell, CheckCircle, AlertTriangle, Info, X, CheckCheck } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'

const notifications = [
  {
    id: 1,
    type: 'success',
    title: 'Задача завершена',
    message: 'Задача "Разработать главную страницу" была завершена Марией Сидоровой',
    time: '2 минуты назад',
    icon: CheckCircle,
    unread: true
  },
  {
    id: 2,
    type: 'warning',
    title: 'Срок выполнения',
    message: 'Задача "Интеграция с CRM" должна быть завершена сегодня',
    time: '1 час назад',
    icon: AlertTriangle,
    unread: true
  },
  {
    id: 3,
    type: 'info',
    title: 'Новый комментарий',
    message: 'Леха Грибоедов оставил комментарий к задаче "Обновить API"',
    time: '3 часа назад',
    icon: Info,
    unread: false
  },
  {
    id: 4,
    type: 'success',
    title: 'Проект создан',
    message: 'Новый проект "Мобильное приложение" был успешно создан',
    time: '5 часов назад',
    icon: CheckCircle,
    unread: false
  },
  {
    id: 5,
    type: 'warning',
    title: 'Низкая продуктивность',
    message: 'За последние 3 дня выполнено всего 2 задачи',
    time: 'Вчера',
    icon: AlertTriangle,
    unread: false
  }
]

export function NotificationsTab() {
  const [notificationsList, setNotificationsList] = useState(notifications)
  const [filter, setFilter] = useState('all')

  const markAsRead = (id: number) => {
    setNotificationsList(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, unread: false } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotificationsList(prev =>
      prev.map(notification => ({ ...notification, unread: false }))
    )
  }

  const deleteNotification = (id: number) => {
    setNotificationsList(prev => prev.filter(notification => notification.id !== id))
  }

  const filteredNotifications = notificationsList.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return notification.unread
    return notification.type === filter
  })

  const unreadCount = notificationsList.filter(n => n.unread).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
            <Bell className="h-5 w-5 text-gray-300" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Уведомления</h2>
            <p className="text-gray-500">
              {unreadCount > 0 ? `${unreadCount} непрочитанных` : 'Все уведомления прочитаны'}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button 
            onClick={markAllAsRead}
            className="bg-white text-black hover:bg-gray-200 border-0"
          >
            <CheckCheck className="h-4 w-4 mr-2" />
            Прочитать все
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'all'
              ? 'bg-white text-black'
              : 'bg-gray-900 text-gray-400 hover:text-white'
          }`}
        >
          Все
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'unread'
              ? 'bg-white text-black'
              : 'bg-gray-900 text-gray-400 hover:text-white'
          }`}
        >
          Непрочитанные
          {unreadCount > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setFilter('success')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'success'
              ? 'bg-white text-black'
              : 'bg-gray-900 text-gray-400 hover:text-white'
          }`}
        >
          Успех
        </button>
        <button
          onClick={() => setFilter('warning')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'warning'
              ? 'bg-white text-black'
              : 'bg-gray-900 text-gray-400 hover:text-white'
          }`}
        >
          Предупреждения
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Нет уведомлений</h3>
            <p className="text-gray-500">Здесь появятся ваши уведомления</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = notification.icon
            return (
              <div
                key={notification.id}
                className={`bg-black border rounded-lg p-4 transition-all ${
                  notification.unread 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-gray-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    notification.type === 'success' ? 'bg-green-500/20 text-green-400' :
                    notification.type === 'warning' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-white">{notification.title}</h4>
                        <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                        <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        {notification.unread && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 text-gray-400 hover:text-white transition-colors"
                            title="Отметить как прочитанное"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                          title="Удалить уведомление"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}