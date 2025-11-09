// Обновленный task-board.tsx с добавлением новых вкладок
import { useState } from 'react'
import type { Task } from '../../types/task'
import { useTaskStore } from '../../stores/task-store'
import { TaskCard } from './task-card'
import { TaskForm } from './task-form'
import { Button } from '../ui/button'
import { Plus, Search, MoreVertical } from 'lucide-react'
import { Sidebar } from '../ui/taskbar'
import { TeamTab } from '../tabs/team-tab'
import { AnalyticsTab } from '../tabs/analytics-tab'
import { MessagesTab } from '../tabs/messages-tab'
import { SettingsTab } from '../tabs/settings-tab'
import { ProfileTab } from '../tabs/profile-tab'
import { NotificationsTab } from '../tabs/notifications-tab'
import { HelpTab } from '../tabs/help-tab'

export function TaskBoard() {
  const { tasks } = useTaskStore()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard')

  const statusColumns = [
    { 
      key: 'todo', 
      title: 'Бэклог', 
      count: tasks.filter(task => task.status === 'todo').length
    },
    { 
      key: 'in-progress', 
      title: 'В работе', 
      count: tasks.filter(task => task.status === 'in-progress').length
    },
    { 
      key: 'review', 
      title: 'На проверке', 
      count: tasks.filter(task => task.status === 'review').length
    },
    { 
      key: 'completed', 
      title: 'Завершено', 
      count: tasks.filter(task => task.status === 'completed').length
    },
  ] as const

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingTask(undefined)
  }

  const filteredTasks = tasks.filter(task => {
    return task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  })

  const getTasksByStatus = (status: Task['status']) => {
    return filteredTasks.filter(task => task.status === status)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            {/* Task Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statusColumns.map((column) => {
                const columnTasks = getTasksByStatus(column.key)
                
                return (
                  <div key={column.key} className="bg-black rounded-lg border border-gray-800">
                    {/* Column Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-800">
                      <div>
                        <h2 className="font-semibold text-white">{column.title}</h2>
                        <p className="text-sm text-gray-500">({column.count})</p>
                      </div>
                      <button className="text-gray-600 hover:text-gray-400">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {/* Task Cards */}
                    <div className="p-4 space-y-3 min-h-[200px]">
                      {columnTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onEdit={handleEditTask}
                        />
                      ))}
                      
                      {/* Add new board card for first column */}
                      {column.key === 'todo' && (
                        <div className="border-2 border-dashed border-gray-800 rounded-lg p-4 text-center hover:border-gray-700 transition-colors cursor-pointer">
                          <div className="text-gray-700 mb-2">+</div>
                          <p className="text-sm text-gray-600">Добавить доску</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Additional Sections */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Design Board */}
              <div className="bg-black rounded-lg border border-gray-800 p-4">
                <h3 className="font-semibold text-white mb-4">Доска дизайна</h3>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Обучающая доска</div>
                </div>
              </div>

              {/* Design Tools */}
              <div className="bg-black rounded-lg border border-gray-800 p-4">
                <h3 className="font-semibold text-white mb-4">Инструменты дизайна A</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Детали задачи</h4>
                    <div className="space-y-2">
                      <div>
                        <h5 className="text-xs font-medium text-gray-500 mb-1">Входные данные</h5>
                        <p className="text-sm text-gray-600">Добавить текст функции в файл печати</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-gray-500 mb-1">Выходные данные</h5>
                        <p className="text-sm text-gray-600">Текст</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      case 'team':
        return <TeamTab />
      case 'analytics':
        return <AnalyticsTab />
      case 'messages':
        return <MessagesTab />
      case 'settings':
        return <SettingsTab />
      case 'profile':
        return <ProfileTab />
      case 'notifications':
        return <NotificationsTab />
      case 'help':
        return <HelpTab />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} unreadNotifications={2} />
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {activeTab === 'dashboard' && 'Менеджер задач'}
                {activeTab === 'team' && 'Команда'}
                {activeTab === 'analytics' && 'Аналитика'}
                {activeTab === 'messages' && 'Сообщения'}
                {activeTab === 'settings' && 'Настройки'}
                {activeTab === 'profile' && 'Профиль'}
                {activeTab === 'notifications' && 'Уведомления'}
                {activeTab === 'help' && 'Помощь'}
              </h1>
              <p className="text-gray-500 mt-1">
                {activeTab === 'dashboard' && 'Обзор всех задач и проектов'}
                {activeTab === 'team' && 'Управление участниками команды'}
                {activeTab === 'analytics' && 'Статистика и отчеты'}
                {activeTab === 'messages' && 'Общение с командой'}
                {activeTab === 'settings' && 'Настройки системы'}
                {activeTab === 'profile' && 'Управление профилем'}
                {activeTab === 'notifications' && 'Просмотр и управление уведомлениями'}
                {activeTab === 'help' && 'Помощь и поддержка'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {activeTab === 'dashboard' && (
                <>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Поиск задач..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-700 w-64"
                    />
                  </div>
                  <Button 
                    onClick={() => setIsFormOpen(true)}
                    className="bg-white text-black hover:bg-gray-200 border-0"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить задачу
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}

          {/* Task Form Modal */}
          <TaskForm 
            task={editingTask}
            isOpen={isFormOpen}
            onClose={handleCloseForm}
          />
        </div>
      </div>
    </div>
  )
}