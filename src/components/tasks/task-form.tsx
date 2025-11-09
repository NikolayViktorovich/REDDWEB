// task-form.tsx
import { useState, useEffect } from 'react';
import type { Task } from '../../types/task';
import { Button } from '../ui/button';
import { CardContent, CardHeader, CardTitle } from '../ui/card';
import { useTaskStore } from '../../stores/task-store';
import { Dialog, DialogContent } from '../ui/dialog';

interface TaskFormProps {
  task?: Task;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskForm({ task, isOpen, onClose }: TaskFormProps) {
  const { addTask, updateTask } = useTaskStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    priority: 'medium' as Task['priority'],
    dueDate: '',
    assignee: '',
    tags: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        assignee: task.assignee,
        tags: task.tags.join(', '),
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        dueDate: '',
        assignee: '',
        tags: '',
      });
    }
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
      assignee: formData.assignee.trim(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    if (task) {
      updateTask(task.id, taskData);
    } else {
      addTask(taskData);
    }
    
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const priorityOptions = [
    { value: 'low', label: 'Низкий' },
    { value: 'medium', label: 'Средний' },
    { value: 'high', label: 'Высокий' },
    { value: 'urgent', label: 'Срочный' },
  ];

  const statusOptions = [
    { value: 'todo', label: 'Бэклог' },
    { value: 'in-progress', label: 'В работе' },
    { value: 'review', label: 'На проверке' },
    { value: 'completed', label: 'Завершено' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-black border border-gray-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-white">
            {task ? 'Редактировать задачу' : 'Создать новую задачу'}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Название задачи
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-700"
                  placeholder="Введите название задачи..."
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Описание
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-700 h-24 resize-none"
                placeholder="Опишите детали задачи..."
              />
            </div>

            {/* Status and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Статус
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Приоритет
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700"
                >
                  {priorityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Due Date and Assignee */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Срок выполнения
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                  className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Исполнитель
                </label>
                <input
                  type="text"
                  value={formData.assignee}
                  onChange={(e) => handleChange('assignee', e.target.value)}
                  className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-700"
                  placeholder="Введите имя исполнителя..."
                  required
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Теги
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-700"
                placeholder="Введите теги через запятую (срочно, фронтенд, встреча)"
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 justify-end pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="px-6 py-2.5 text-gray-300 hover:bg-gray-900 border border-gray-800"
              >
                Отмена
              </Button>
              <Button 
                type="submit"
                className="px-6 py-2.5 bg-white text-black hover:bg-gray-200 border-0"
              >
                {task ? 'Обновить задачу' : 'Создать задачу'}
              </Button>
            </div>
          </form>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
}