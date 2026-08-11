import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiInbox, FiCalendar, FiBookOpen, FiCamera, FiBox, FiPackage, FiStar, FiPercent,
  FiBell, FiRadio, FiFileText, FiUsers, FiEye, FiSun, FiCheckCircle, FiXCircle,
  FiDollarSign, FiAlertCircle, FiClock, FiTrendingUp, FiZap
} from 'react-icons/fi';
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import api from '../../api/adminClient';
import { Card } from '../../components/admin/ui';
import './DashboardPage.css';

const COLORS = ['#C9A227', '#4A2E6B', '#2E7D5B', '#2563A8', '#B8790C', '#C0392B', '#8B6E13', '#6B6873'];

interface StatCardDef { key: string; label: string; icon: any; nav?: string; format?: 'currency'; }

const STAT_CARDS: StatCardDef[] = [
  { key: 'totalEnquiries', label: 'Total Enquiries', icon: FiInbox, nav: '/enquiries' },
  { key: 'newEnquiriesToday', label: 'New Enquiries Today', icon: FiSun, nav: '/enquiries' },
  { key: 'newEnquiriesYesterday', label: 'New Enquiries Yesterday', icon: FiClock, nav: '/enquiries' },
  { key: 'upcomingEvents', label: 'Upcoming Events', icon: FiCalendar, nav: '/events' },
  { key: 'completedEvents', label: 'Completed Events', icon: FiCheckCircle, nav: '/events' },
  { key: 'recentBookings', label: 'Recent Bookings', icon: FiBookOpen, nav: '/enquiries' },
  { key: 'confirmedBookings', label: 'Confirmed Bookings', icon: FiCheckCircle, nav: '/enquiries' },
  { key: 'cancelledBookings', label: 'Cancelled Bookings', icon: FiXCircle, nav: '/enquiries' },
  { key: 'galleryCount', label: 'Gallery Count', icon: FiCamera, nav: '/gallery' },
  { key: 'totalServices', label: 'Total Services', icon: FiBox, nav: '/services' },
  { key: 'totalPackages', label: 'Total Packages', icon: FiPackage, nav: '/services' },
  { key: 'totalTestimonials', label: 'Total Testimonials', icon: FiStar, nav: '/testimonials' },
  { key: 'testimonialsPending', label: 'Testimonials Pending', icon: FiAlertCircle, nav: '/testimonials' },
  { key: 'totalOffersActive', label: 'Active Offers', icon: FiPercent, nav: '/offers' },
  { key: 'totalAnnouncementsActive', label: 'Active Announcements', icon: FiBell, nav: '/announcements' },
  { key: 'totalBroadcastsActive', label: 'Active Broadcasts', icon: FiRadio, nav: '/broadcasts' },
  { key: 'totalBlogs', label: 'Total Blogs', icon: FiFileText, nav: '/blogs' },
  { key: 'websiteVisitsToday', label: 'Website Visits Today', icon: FiEye },
  { key: 'totalRevenue', label: 'Total Revenue', icon: FiDollarSign, nav: '/invoices', format: 'currency' },
  { key: 'pendingPayments', label: 'Pending Payments', icon: FiAlertCircle, nav: '/enquiries' },
  { key: 'followUpsDueToday', label: 'Follow-ups Due Today', icon: FiUsers, nav: '/enquiries' }
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [charts, setCharts] = useState<any>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.get('/dashboard/stats'),
      api.get('/dashboard/charts'),
      api.get('/dashboard/ai-insights')
    ]).then(([s, c, i]) => {
      setStats(s.data.data);
      setCharts(c.data.data);
      setInsights(i.data.data);
    }).finally(() => setLoading(false));
  }, []);

  const download = async (kind: 'excel' | 'pdf') => {
    // Reuses the enquiry export as the closest "dashboard activity" report
    const res = await api.get(`/enquiries/export/${kind}`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement('a');
    a.href = url; a.download = `dashboard-report.${kind === 'excel' ? 'xlsx' : 'pdf'}`; a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) return <div className="dash-loading">Loading dashboard...</div>;

  return (
    <div className="dash-page">
      <div className="dash-header">
        <div>
          <h2>Dashboard</h2>
          <p className="rm-sub">Real-time overview of Shine Magics operations</p>
        </div>
        <div className="dash-header-actions">
          <button className="dt-export-btn" onClick={() => download('excel')}>Excel Report</button>
          <button className="dt-export-btn" onClick={() => download('pdf')}>PDF Report</button>
        </div>
      </div>

      <div className="dash-stat-grid">
        {STAT_CARDS.map((c) => (
          <div
            key={c.key}
            className={`dash-stat-card ${c.nav ? 'dash-stat-clickable' : ''}`}
            onClick={() => c.nav && navigate(c.nav)}
          >
            <div className="dash-stat-icon"><c.icon size={16} /></div>
            <div className="dash-stat-value mono">
              {c.format === 'currency' ? `₹${(stats[c.key] || 0).toLocaleString('en-IN')}` : (stats[c.key] ?? 0)}
            </div>
            <div className="dash-stat-label">{c.label}</div>
          </div>
        ))}
      </div>

      <Card className="dash-ai-card">
        <div className="dash-ai-header"><FiZap size={16} /> <h3>AI-Assisted Insights</h3></div>
        <ul className="dash-ai-list">
          {insights.map((line, i) => <li key={i}>{line}</li>)}
        </ul>
      </Card>

      <div className="dash-charts-grid">
        <Card className="dash-chart-card">
          <h4><FiTrendingUp size={14} /> Enquiry Trend (30 days)</h4>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={charts?.enquiryTrend || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEE" />
              <XAxis dataKey="_id" tick={{ fontSize: 10 }} hide />
              <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#C9A227" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="dash-chart-card">
          <h4>Booking Status Distribution</h4>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={charts?.bookingStatusDistribution || []} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={80} label={{ fontSize: 10 }}>
                {(charts?.bookingStatusDistribution || []).map((_: any, i: number) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="dash-chart-card">
          <h4>Revenue Trend (30 days)</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={charts?.revenueTrend || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEE" />
              <XAxis dataKey="_id" tick={{ fontSize: 10 }} hide />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="total" fill="#4A2E6B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="dash-chart-card">
          <h4>Service Popularity</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={(charts?.servicePopularity || []).map((s: any) => ({ name: s.service?.[0]?.serviceName || 'Unknown', count: s.count }))} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#EEE" />
              <XAxis type="number" tick={{ fontSize: 10 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#2E7D5B" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
