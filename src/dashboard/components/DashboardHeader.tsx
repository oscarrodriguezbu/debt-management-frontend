import { useAuthStore } from '@/auth/store/auth.store';
import { Button } from '@/components/ui/button';

export const DashboardHeader: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 h-18">
      {/* Actions */}
      <div className="flex items-center justify-end space-x-4">
        <Button
          onClick={logout}
          variant="outline"
          size="sm"
          className="ml-2"
        >
          Logout
        </Button>
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
          {user?.name.substring(0, 2)}
        </div>
      </div>
    </header>
  );
};
