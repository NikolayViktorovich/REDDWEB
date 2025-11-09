import { User, Mail, Phone, MapPin, Edit } from 'lucide-react'
import { Button } from '../ui/button'

export function ProfileTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile Info */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-black border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white">Основная информация</h3>
            <Button className="bg-white text-black hover:bg-gray-200 border-0">
              <Edit className="h-4 w-4 mr-2" />
              Редактировать
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Имя</label>
                <input
                  type="text"
                  defaultValue="Николай"
                  className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Фамилия</label>
                <input
                  type="text"
                  defaultValue="Викторович"
                  className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Должность</label>
              <input
                type="text"
                defaultValue="Менеджер проектов"
                className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">О себе</label>
              <textarea
                rows={3}
                defaultValue="Управляю проектами в IT компании. Специализируюсь на веб-разработке и agile методологиях."
                className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="bg-black border border-gray-800 rounded-lg p-6 text-center">
          <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-gray-300" />
          </div>
          <h3 className="font-semibold text-white">Николай Викторович</h3>
          <p className="text-gray-500 text-sm">Менеджер проектов</p>
        </div>

        <div className="bg-black border border-gray-800 rounded-lg p-6">
          <h4 className="font-semibold text-white mb-4">Контакты</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Mail className="h-4 w-4" />
              <span>nikolayviktorovich@bk.ru</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Phone className="h-4 w-4" />
              <span>+7 (999) 123-45-67</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>Москва, Россия</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}