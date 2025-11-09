// tabs/analytics-tab.tsx
import { BarChart3, TrendingUp, Users, CheckCircle } from 'lucide-react'

const stats = [
  { label: 'Всего задач', value: '47', change: '+12%', icon: BarChart3 },
  { label: 'Выполнено', value: '28', change: '+8%', icon: CheckCircle },
  { label: 'В работе', value: '15', change: '+5%', icon: TrendingUp },
  { label: 'Участников', value: '8', change: '+2', icon: Users }
]

export function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-black border border-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-sm text-green-400 mt-1">{stat.change}</p>
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-gray-400" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black border border-gray-800 rounded-lg p-6">
          <h3 className="font-semibold text-white mb-4">Продуктивность по дням</h3>
          <div className="h-64 bg-gray-900 rounded flex items-center justify-center">
            <p className="text-gray-500">График продуктивности</p>
          </div>
        </div>

        <div className="bg-black border border-gray-800 rounded-lg p-6">
          <h3 className="font-semibold text-white mb-4">Распределение задач</h3>
          <div className="h-64 bg-gray-900 rounded flex items-center justify-center">
            <p className="text-gray-500">Круговая диаграмма</p>
          </div>
        </div>
      </div>
    </div>
  )
}