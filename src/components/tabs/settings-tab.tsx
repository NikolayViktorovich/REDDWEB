// tabs/settings-tab.tsx
import { Button } from '../ui/button'
import { useState } from 'react'

export function SettingsTab() {
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      taskAssigned: true,
      taskCompleted: true,
      taskOverdue: true,
      newComment: false,
      statusChange: true,
      mention: true
    },
    push: {
      taskAssigned: true,
      taskCompleted: false,
      taskOverdue: true,
      newComment: true,
      statusChange: false,
      mention: true
    },
    desktop: {
      taskAssigned: true,
      taskCompleted: true,
      taskOverdue: true,
      newComment: true,
      statusChange: true,
      mention: true
    }
  })

  const updateNotificationSetting = (type: keyof typeof notificationSettings, setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [setting]: value
      }
    }))
  }

  const toggleAllForType = (type: keyof typeof notificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: Object.keys(prev[type]).reduce((acc, key) => ({
        ...acc,
        [key]: value
      }), {})
    }))
  }

  const notificationTypes = [
    {
      key: 'taskAssigned',
      label: 'Назначение задачи',
      description: 'Когда вам назначают новую задачу'
    },
    {
      key: 'taskCompleted',
      label: 'Завершение задачи',
      description: 'Когда задача помечается как завершенная'
    },
    {
      key: 'taskOverdue',
      label: 'Просроченные задачи',
      description: 'Уведомления о приближающихся сроках'
    },
    {
      key: 'newComment',
      label: 'Новые комментарии',
      description: 'Когда в задаче появляются новые комментарии'
    },
    {
      key: 'statusChange',
      label: 'Изменение статуса',
      description: 'Когда статус задачи изменяется'
    },
    {
      key: 'mention',
      label: 'Упоминания',
      description: 'Когда вас упоминают в комментариях'
    }
  ]

  const notificationChannels = [
    {
      key: 'email',
      label: 'Email уведомления',
      description: 'Получать уведомления на электронную почту',
    },
    {
      key: 'push',
      label: 'Push уведомления',
      description: 'Веб-уведомления в браузере',
    },
    {
      key: 'desktop',
      label: 'Desktop уведомления',
      description: 'Уведомления в приложении',
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notification Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-white">Настройки уведомлений</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Настройте какие уведомления и каким способом получать
                </p>
              </div>
            </div>

            {/* Notification Channels */}
            <div className="space-y-6">
              {notificationChannels.map(channel => (
                <div key={channel.key} className="border border-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl"></span>
                      <div>
                        <h4 className="font-semibold text-white">{channel.label}</h4>
                        <p className="text-gray-500 text-sm">{channel.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleAllForType(channel.key as keyof typeof notificationSettings, true)}
                        className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
                      >
                        Все
                      </button>
                      <button
                        onClick={() => toggleAllForType(channel.key as keyof typeof notificationSettings, false)}
                        className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
                      >
                        Ничего
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {notificationTypes.map(type => (
                      <label key={type.key} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer">
                        <div className="flex items-center h-5 mt-0.5">
                          <input
                            type="checkbox"
                            checked={notificationSettings[channel.key as keyof typeof notificationSettings][type.key as keyof typeof notificationSettings.email]}
                            onChange={(e) => updateNotificationSetting(
                              channel.key as keyof typeof notificationSettings,
                              type.key,
                              e.target.checked
                            )}
                            className="rounded border-gray-600 bg-black focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-white text-sm font-medium block">{type.label}</span>
                          <span className="text-gray-500 text-xs block mt-1">{type.description}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* General Settings */}
          <div className="bg-black border border-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-4">Основные настройки</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Язык</label>
                  <select className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700">
                    <option>Русский</option>
                    <option>English</option>
                    <option>Español</option>
                    <option>Deutsch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Часовой пояс</label>
                  <select className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700">
                    <option>Москва (UTC+3)</option>
                    <option>Калининград (UTC+2)</option>
                    <option>Самара (UTC+4)</option>
                    <option>Екатеринбург (UTC+5)</option>
                    <option>Лондон (UTC+0)</option>
                    <option>Нью-Йорк (UTC-5)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Формат даты</label>
                  <select className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700">
                    <option>DD.MM.YYYY (31.12.2024)</option>
                    <option>MM/DD/YYYY (12/31/2024)</option>
                    <option>YYYY-MM-DD (2024-12-31)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Тема интерфейса</label>
                  <select className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700">
                    <option>Темная</option>
                    <option>Светлая</option>
                    <option>Авто (системная)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Preferences */}
        <div className="space-y-6">
          {/* Notification Preferences */}
          <div className="bg-black border border-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-4">Предпочтения уведомлений</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Частота email-уведомлений</label>
                <select className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700">
                  <option>Мгновенно</option>
                  <option>Каждый час</option>
                  <option>Каждые 3 часа</option>
                  <option>Ежедневный дайджест</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Тихие часы</label>
                <select className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700">
                  <option>Выкл (24/7)</option>
                  <option>22:00 - 08:00</option>
                  <option>23:00 - 07:00</option>
                  <option>Полностью отключить</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Приоритет уведомлений</label>
                <select className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700">
                  <option>Только срочные</option>
                  <option>Важные и срочные</option>
                  <option>Все уведомления</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-black border border-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-4">Быстрые действия</h3>
            <div className="space-y-3">
              <Button className="w-full bg-white text-black hover:bg-gray-200 border-0 justify-start">
                <span className="mr-2"></span>
                Экспорт данных
              </Button>
              <Button className="w-full bg-gray-800 text-white hover:bg-gray-700 border-0 justify-start">
                <span className="mr-2"></span>
                Резервная копия
              </Button>
              <Button className="w-full bg-gray-800 text-white hover:bg-gray-700 border-0 justify-start">
                <span className="mr-2"></span>
                Синхронизация
              </Button>
              <Button className="w-full bg-gray-800 text-white hover:bg-gray-700 border-0 justify-start">
                <span className="mr-2"></span>
                Пригласить команду
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-black border border-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-4">Статистика уведомлений</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Получено за неделю</span>
                <span className="text-white font-medium">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Прочитано</span>
                <span className="text-white font-medium">38</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">В ожидании</span>
                <span className="text-white font-medium">9</span>
              </div>
              <div className="pt-2 border-t border-gray-800">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Эффективность</span>
                  <span className="text-green-400 font-medium">81%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-800">
        <Button className="bg-gray-800 text-white hover:bg-gray-700 border-0">
          Сбросить настройки
        </Button>
        <Button className="bg-white text-black hover:bg-gray-200 border-0">
          Сохранить изменения
        </Button>
      </div>
    </div>
  )
}