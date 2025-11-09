import { HelpCircle, Book, Video, MessageCircle, Mail, Search } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'

const faqItems = [
  {
    question: 'Как создать новую задачу?',
    answer: 'Нажмите кнопку "Добавить задачу" в правом верхнем углу дашборда. Заполните все необходимые поля и нажмите "Создать задачу".'
  },
  {
    question: 'Как изменить статус задачи?',
    answer: 'Используйте выпадающий список в карточке задачи для изменения статуса. Доступные статусы: Бэклог, В работе, На проверке, Завершено.'
  },
  {
    question: 'Как пригласить нового участника в команду?',
    answer: 'Перейдите во вкладку "Команда" и нажмите кнопку "Добавить участника". Введите email пользователя и выберите роль.'
  },
  {
    question: 'Как настроить уведомления?',
    answer: 'Перейдите в Настройки → Уведомления и выберите типы уведомлений, которые хотите получать.'
  }
]

const helpResources = [
  {
    title: 'Документация',
    description: 'Полное руководство по использованию системы',
    icon: Book,
    link: '#'
  },
  {
    title: 'Видео-уроки',
    description: 'Обучающие видео по основным функциям',
    icon: Video,
    link: '#'
  },
  {
    title: 'Чат поддержки',
    description: 'Онлайн-чат с нашей командой поддержки',
    icon: MessageCircle,
    link: '#'
  },
  {
    title: 'Email поддержка',
    description: 'Напишите нам на почту',
    icon: Mail,
    link: 'mailto:support@taskflow.com'
  }
]

export function HelpTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const filteredFaq = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
          <HelpCircle className="h-6 w-6 text-gray-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Помощь и поддержка</h2>
          <p className="text-gray-500">Найдите ответы на ваши вопросы</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        <input
          type="text"
          placeholder="Поиск по вопросам и ответам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-700"
        />
      </div>

      {/* Quick Help Resources */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Быстрая помощь</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {helpResources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <a
                key={index}
                href={resource.link}
                className="bg-black border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors group"
              >
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-700 transition-colors">
                  <Icon className="h-5 w-5 text-gray-300" />
                </div>
                <h4 className="font-semibold text-white mb-2">{resource.title}</h4>
                <p className="text-sm text-gray-500">{resource.description}</p>
              </a>
            )
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Часто задаваемые вопросы</h3>
        <div className="space-y-3">
          {filteredFaq.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">По вашему запросу ничего не найдено</p>
            </div>
          ) : (
            filteredFaq.map((item, index) => (
              <div
                key={index}
                className="bg-black border border-gray-800 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-900 transition-colors"
                >
                  <span className="font-medium text-white pr-4">{item.question}</span>
                  <div className={`transform transition-transform ${
                    activeFaq === index ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {activeFaq === index && (
                  <div className="p-4 border-t border-gray-800 bg-gray-900">
                    <p className="text-gray-400">{item.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <div className="text-center">
          <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Не нашли ответ?</h3>
          <p className="text-gray-500 mb-4">Наша команда поддержки всегда готова помочь вам</p>
          <div className="flex gap-3 justify-center">
            <Button className="bg-white text-black hover:bg-gray-200 border-0">
              <MessageCircle className="h-4 w-4 mr-2" />
              Чат поддержки
            </Button>
            <Button className="bg-gray-800 text-white hover:bg-gray-700 border-0">
              <Mail className="h-4 w-4 mr-2" />
              Написать на почту
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}