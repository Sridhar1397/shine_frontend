

import {
  FiGrid,
  FiImage,
  FiInfo,
  FiPhoneCall,
  FiFileText,
  FiBox,
  FiCamera,
  FiCalendar,
  FiInbox,
  FiStar,
  FiUsers,
  FiPercent,
  FiBell,
  FiRadio,
  FiCreditCard,
  FiSettings,
  FiLayers
} from 'react-icons/fi';

export interface NavItem {
  label: string;
  path: string;
  icon: any;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      {
        label: 'Dashboard',
        path: '/admin',
        icon: FiGrid
      }
    ]
  },

  {
    title: 'Website Content',
    items: [
      {
        label: 'Home Slider',
        path: '/admin/content/slider',
        icon: FiImage
      },
      {
        label: 'About Us',
        path: '/admin/content/about-us',
        icon: FiInfo
      },
      {
        label: 'Homepage Services',
        path: '/admin/content/services-block',
        icon: FiLayers
      },
      {
        label: 'Hero Section',
        path: '/admin/content/hero',
        icon: FiImage
      },
      {
        label: 'Contact Info',
        path: '/admin/content/contact',
        icon: FiPhoneCall
      },
      {
        label: 'Blogs',
        path: '/admin/blogs',
        icon: FiFileText
      }
    ]
  },

  {
    title: 'Business',
    items: [
      {
        label: 'Services',
        path: '/admin/services',
        icon: FiBox
      },
      {
        label: 'Gallery',
        path: '/admin/gallery',
        icon: FiCamera
      },
      {
        label: 'Events',
        path: '/admin/events',
        icon: FiCalendar
      },
      {
        label: 'Enquiries & Bookings',
        path: '/admin/enquiries',
        icon: FiInbox
      },
      {
        label: 'Testimonials',
        path: '/admin/testimonials',
        icon: FiStar
      }
    ]
  },

  {
    title: 'Marketing',
    items: [
      {
        label: 'Offers & Promotions',
        path: '/admin/offers',
        icon: FiPercent
      },
      {
        label: 'Announcements',
        path: '/admin/announcements',
        icon: FiBell
      },
      {
        label: 'Broadcasts',
        path: '/admin/broadcasts',
        icon: FiRadio
      }
    ]
  },

  {
    title: 'Finance',
    items: [
      {
        label: 'Invoices',
        path: '/admin/invoices',
        icon: FiCreditCard
      },
      {
        label: 'Invoice Settings',
        path: '/admin/invoice-settings',
        icon: FiSettings
      }
    ]
  },

  {
    title: 'Settings',
    items: [
      {
        label: 'Branding',
        path: '/admin/settings/branding',
        icon: FiImage
      },
      {
        label: 'Footer',
        path: '/admin/settings/footer',
        icon: FiLayers
      },
      {
        label: 'Admin Account',
        path: '/admin/settings/account',
        icon: FiUsers
      }
    ]
  }
];