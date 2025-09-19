import { Link, useLocation } from 'react-router';
import {
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CustomLogo } from '@/components/custom/CustomLogo';
import { useAuthStore } from '@/auth/store/auth.store';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
}) => {
  const { pathname } = useLocation();
  const { user } = useAuthStore();

  const menuItems = [
    { icon: FileText, label: 'My Debts', to: '/debts' },
    { icon: Settings, label: 'Create Debt', to: '/debts/create' },
  ];

  const isActiveRoute = (to: string) => {
    if (pathname.includes('/debts/create/') && to === '/debts/create') {
      return true;
    }

    return pathname === to;
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out  ${isCollapsed ? 'w-18' : 'w-64'
        } flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between h-18">
        {!isCollapsed && <CustomLogo />}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <Link
                  to={item.to || '/debts'}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${isActiveRoute(item.to || '/xxxx')
                    ? 'bg-red-50 text-red-600 border-r-2 border-red-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
