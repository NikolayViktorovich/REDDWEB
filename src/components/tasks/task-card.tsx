// task-card.tsx
import type { Task } from '../../types/task';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useTaskStore } from '../../stores/task-store';
import { Calendar, User, Edit, Trash2, MoreVertical } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import { DeleteConfirmModal } from '../ui/delete-confirm-modal';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const priorityConfig = {
  low: { color: 'bg-gray-800 text-gray-300', label: 'Низкий' },
  medium: { color: 'bg-gray-800 text-gray-300', label: 'Средний' },
  high: { color: 'bg-gray-800 text-gray-300', label: 'Высокий' },
  urgent: { color: 'bg-gray-800 text-gray-300', label: 'Срочный' },
};

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const { deleteTask, updateTask } = useTaskStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleStatusChange = (newStatus: Task['status']) => {
    updateTask(task.id, { status: newStatus });
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <>
      <Card className="bg-black border border-gray-800 hover:border-gray-700 transition-colors">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              {/* Priority */}
              <div className="flex items-center gap-2 mb-2">
                <span className={cn(
                  'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                  priorityConfig[task.priority].color
                )}>
                  {priorityConfig[task.priority].label}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-medium text-white text-sm leading-tight mb-2">
                {task.title}
              </h3>
            </div>

            {/* Actions Menu */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="h-6 w-6 text-gray-600 hover:text-gray-400 hover:bg-gray-900"
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
              
              {isMenuOpen && (
                <div className="absolute right-0 top-8 z-10 bg-black rounded-lg border border-gray-800 py-1 min-w-32">
                  <button
                    onClick={() => { onEdit(task); setIsMenuOpen(false); }}
                    className="w-full px-3 py-2 text-sm text-gray-400 hover:bg-gray-900 hover:text-white flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Редактировать
                  </button>
                  <button
                    onClick={openDeleteModal}
                    className="w-full px-3 py-2 text-sm text-red-400 hover:bg-gray-900 hover:text-red-300 flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Удалить
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
            {/* Assignee */}
            <div className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              <span className="text-gray-500">{task.assignee}</span>
            </div>

            {/* Due Date */}
            {task.dueDate && (
              <div className={cn(
                'flex items-center gap-1',
                isOverdue && 'text-red-400 font-medium'
              )}>
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(task.dueDate).toLocaleDateString('ru-RU')}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-900 text-gray-500 text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Status Selector */}
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
            className="w-full p-2 bg-black border border-gray-800 rounded text-sm text-white focus:outline-none focus:border-gray-700"
          >
            <option value="todo">Бэклог</option>
            <option value="in-progress">В работе</option>
            <option value="review">На проверке</option>
            <option value="completed">Завершено</option>
          </select>
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Удалить задачу"
        description={`Задача "${task.title}" будет удалена безвозвратно.`}
      />
    </>
  );
}