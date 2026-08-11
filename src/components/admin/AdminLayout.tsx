import { NavLink, Outlet } from 'react-router-dom';
import { FiLogOut, FiStar } from 'react-icons/fi';
import { navGroups } from '../../config/nav';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

export default function Layout() {
  const { admin, logout } = useAuth();

  return (
    <div className="layout admin-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark"><FiStar size={16} /></div>
          <div>
            <div className="sidebar-brand-name">Shine Magics</div>
            <div className="sidebar-brand-sub">Admin Panel</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navGroups.map((group) => (
            <div className="sidebar-group" key={group.title}>
              <div className="sidebar-group-title">{group.title}</div>
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className="layout-main">
        <header className="topbar">
          <div />
          <div className="topbar-right">
            <div className="topbar-admin">
              <div className="topbar-avatar">{admin?.name?.charAt(0) || 'A'}</div>
              <div>
                <div className="topbar-name">{admin?.name || 'Admin'}</div>
                <div className="topbar-role">{admin?.role || 'Admin'}</div>
              </div>
            </div>
            <button className="topbar-logout" onClick={logout} title="Logout"><FiLogOut size={16} /></button>
          </div>
        </header>
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
