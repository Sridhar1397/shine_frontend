import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public
import { SiteConfigProvider } from './context/SiteConfigContext';
import { BookingModalProvider } from './components/public/BookingModalContext';
import { PublicLayout } from './components/public/PublicLayout';
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ServicesPage from './pages/public/ServicesPage';
import ServiceDetailPage from './pages/public/ServiceDetailPage';
import GalleryPage from './pages/public/GalleryPage';
import EventsPage from './pages/public/EventsPage';
import EventDetailPage from './pages/public/EventDetailPage';
import OffersPage from './pages/public/OffersPage';
import TestimonialsPage from './pages/public/TestimonialsPage';
import ContactPage from './pages/public/ContactPage';
import BookPage from './pages/public/BookPage';
import { PolicyPage } from './pages/public/PolicyPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Admin
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import AccountPage from './pages/admin/AccountPage';
import EnquiriesPage from './pages/admin/EnquiriesPage';
import { ResourceManager } from './components/admin/ResourceManager';
import { SettingsPage } from './components/admin/SettingsPage';
import {
  servicesConfig, galleryConfig, eventsConfig, testimonialsConfig, blogsConfig,
  offersConfig, announcementsConfig, broadcastsConfig, slidersConfig, invoicesConfig
} from './config/resources';
import {
  contactFields, brandingFields, footerFields, invoiceSettingsFields,
  aboutUsFields, homeServicesBlockFields, heroFields
} from './config/settingsFields';

export default function App() {
  return (
    <BrowserRouter>
      <SiteConfigProvider>
        <BookingModalProvider>
          <AuthProvider>
            <Routes>

              {/* ===== ADMIN — everything under /admin ===== */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route index element={<DashboardPage />} />

                <Route path="content/slider" element={<ResourceManager config={slidersConfig} />} />
                <Route path="content/about-us" element={<SettingsPage apiPath="home/about-us" title="About Us" description="Homepage About Us content block" fields={aboutUsFields} />} />
                <Route path="content/services-block" element={<SettingsPage apiPath="home/services-block" title="Homepage Services Block" description="Content block shown above the services list on the homepage" fields={homeServicesBlockFields} />} />
                <Route path="content/hero" element={<SettingsPage apiPath="home/hero" title="Hero Section" description="Homepage hero banner content" fields={heroFields} />} />
                <Route path="content/contact" element={<SettingsPage apiPath="contact-info" title="Contact Information" description="Business contact details shown across the public website" fields={contactFields} />} />

                <Route path="blogs" element={<ResourceManager config={blogsConfig} />} />
                <Route path="services" element={<ResourceManager config={servicesConfig} />} />
                <Route path="gallery" element={<ResourceManager config={galleryConfig} />} />
                <Route path="events" element={<ResourceManager config={eventsConfig} />} />
                <Route path="enquiries" element={<EnquiriesPage />} />
                <Route path="testimonials" element={<ResourceManager config={testimonialsConfig} />} />

                <Route path="offers" element={<ResourceManager config={offersConfig} />} />
                <Route path="announcements" element={<ResourceManager config={announcementsConfig} />} />
                <Route path="broadcasts" element={<ResourceManager config={broadcastsConfig} />} />

                <Route path="invoices" element={<ResourceManager config={invoicesConfig} />} />
                <Route path="invoice-settings" element={<SettingsPage apiPath="invoice-settings" title="Invoice Settings" description="Configure invoice numbering, business details, and appearance" fields={invoiceSettingsFields} />} />

                <Route path="settings/branding" element={<SettingsPage apiPath="branding" title="Branding" description="Logos, brand identity, and brand colors" fields={brandingFields} />} />
                <Route path="settings/footer" element={<SettingsPage apiPath="footer" title="Footer Management" description="Footer content, links, and visibility toggles" fields={footerFields} />} />
                <Route path="settings/account" element={<AccountPage />} />
              </Route>

              {/* ===== PUBLIC — everything at / ===== */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="services/:slug" element={<ServiceDetailPage />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="events/:slug" element={<EventDetailPage />} />
                <Route path="offers" element={<OffersPage />} />
                <Route path="testimonials" element={<TestimonialsPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="book" element={<BookPage />} />
                <Route path="privacy-policy" element={<PolicyPage field="privacyPolicyContent" title="Privacy Policy" />} />
                <Route path="terms-and-conditions" element={<PolicyPage field="termsContent" title="Terms & Conditions" />} />
                <Route path="cancellation-policy" element={<PolicyPage field="cancellationPolicyContent" title="Cancellation Policy" />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

            </Routes>
          </AuthProvider>
        </BookingModalProvider>
      </SiteConfigProvider>
    </BrowserRouter>
  );
}
