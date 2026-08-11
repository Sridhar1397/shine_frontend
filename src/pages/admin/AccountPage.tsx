import { useEffect, useState } from 'react';
import { FiShield, FiMonitor } from 'react-icons/fi';
import api from '../../api/adminClient';
import { useAuth } from '../../context/AuthContext';
import { Button, Card } from '../../components/admin/ui';
import { SingleFileUpload } from '../../components/admin/FileUpload';
import './AccountPage.css';

export default function AccountPage() {
  const { admin } = useAuth();
  const [name, setName] = useState(admin?.name || '');
  const [phone, setPhone] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(admin?.profilePhoto || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    api.get('/auth/me').then((res) => {
      setPhone(res.data.data.phone || '');
      setTwoFactor(res.data.data.twoFactorEnabled);
    });
    api.get('/auth/sessions').then((res) => setSessions(res.data.data));
  }, []);

  const saveProfile = async () => {
    await api.put('/auth/profile', { name, phone, profilePhoto });
    setMsg({ type: 'ok', text: 'Profile updated successfully.' });
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMsg({ type: 'err', text: 'New password and confirmation do not match.' });
      return;
    }
    try {
      await api.put('/auth/change-password', { currentPassword, newPassword });
      setMsg({ type: 'ok', text: 'Password changed successfully.' });
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch (err: any) {
      setMsg({ type: 'err', text: err.response?.data?.message || 'Could not change password.' });
    }
  };

  const toggle2FA = async () => {
    const res = await api.put('/auth/toggle-2fa');
    setTwoFactor(res.data.twoFactorEnabled);
  };

  const logoutAll = async () => {
    if (!confirm('Log out from all devices? You will need to sign in again.')) return;
    await api.post('/auth/logout-all');
    window.location.href = '/admin/login';
  };

  return (
    <div className="acct-page">
      <h2>Admin Account</h2>
      <p className="rm-sub">Manage your profile, password, and security settings</p>

      {msg && <div className={`acct-msg acct-msg-${msg.type}`}>{msg.text}</div>}

      <Card className="acct-card">
        <div className="acct-section-title">Profile</div>
        <div className="acct-profile-row">
          <SingleFileUpload folder="branding" value={profilePhoto} onChange={setProfilePhoto} />
          <div className="acct-profile-fields">
            <div className="acct-field">
              <label>Admin Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="acct-field">
              <label>Phone Number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
        </div>
        <Button variant="primary" onClick={saveProfile}>Update Profile</Button>
      </Card>

      <Card className="acct-card">
        <div className="acct-section-title">Change Password</div>
        <div className="acct-pw-grid">
          <div className="acct-field">
            <label>Current Password</label>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>
          <div className="acct-field">
            <label>New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className="acct-field">
            <label>Confirm New Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
        </div>
        <Button variant="primary" onClick={changePassword}>Change Password</Button>
      </Card>

      <Card className="acct-card">
        <div className="acct-section-title"><FiShield size={14} /> Account Security</div>
        <div className="acct-toggle-row">
          <div>
            <div className="acct-toggle-label">Two-Factor Authentication</div>
            <div className="acct-toggle-hint">Add an extra layer of security to your account</div>
          </div>
          <label className="rf-switch">
            <input type="checkbox" checked={twoFactor} onChange={toggle2FA} />
            <span className="rf-switch-track"><span className="rf-switch-thumb" /></span>
          </label>
        </div>
        <Button variant="danger" onClick={logoutAll}>Logout All Devices</Button>
      </Card>

      <Card className="acct-card">
        <div className="acct-section-title"><FiMonitor size={14} /> Active Sessions</div>
        <div className="acct-sessions">
          {sessions.length === 0 && <div className="rm-sub">No active sessions found.</div>}
          {sessions.map((s, i) => (
            <div className="acct-session-item" key={i}>
              <div>{s.device || 'Unknown device'}</div>
              <div className="acct-session-meta">{s.ip} · {new Date(s.loginAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
