import type { FieldConfig } from '../types/resource';

export const contactFields: FieldConfig[] = [
  { key: 'businessName', label: 'Business Name', type: 'text', section: 'Business Contact' },
  { key: 'phone', label: 'Phone Number', type: 'text', section: 'Business Contact' },
  { key: 'alternatePhone', label: 'Alternate Phone Number', type: 'text', section: 'Business Contact' },
  { key: 'whatsapp', label: 'WhatsApp Number', type: 'text', section: 'Business Contact' },
  { key: 'email', label: 'Email Address', type: 'text', section: 'Business Contact' },
  { key: 'alternateEmail', label: 'Alternate Email Address', type: 'text', section: 'Business Contact' },
  { key: 'supportNumber', label: 'Customer Support Number', type: 'text', section: 'Business Contact' },

  { key: 'addressLine1', label: 'Address Line 1', type: 'text', section: 'Address' },
  { key: 'addressLine2', label: 'Address Line 2', type: 'text', section: 'Address' },
  { key: 'area', label: 'Area/Locality', type: 'text', section: 'Address' },
  { key: 'city', label: 'City', type: 'text', section: 'Address' },
  { key: 'state', label: 'State', type: 'text', section: 'Address' },
  { key: 'country', label: 'Country', type: 'text', section: 'Address' },
  { key: 'pincode', label: 'Pincode', type: 'text', section: 'Address' },
  { key: 'landmark', label: 'Landmark', type: 'text', section: 'Address' },

  { key: 'googleMapsLocation', label: 'Google Maps Location', type: 'text', section: 'Location', colSpan: 2 },
  { key: 'googleMapsUrl', label: 'Google Maps URL', type: 'text', section: 'Location', colSpan: 2 },
  { key: 'googleMapsEmbed', label: 'Google Maps Embed Code', type: 'textarea', section: 'Location', colSpan: 2 },

  { key: 'businessDescription', label: 'Business Description', type: 'textarea', section: 'Business Info', colSpan: 2 },
  { key: 'shortBusinessDescription', label: 'Short Business Description', type: 'text', section: 'Business Info', colSpan: 2 },
  { key: 'yearsOfExperience', label: 'Years of Experience', type: 'number', section: 'Business Info' },
  { key: 'servicesOffered', label: 'Services Offered', type: 'tags', section: 'Business Info' },
  { key: 'serviceAreas', label: 'Service Areas', type: 'tags', section: 'Business Info' },

  { key: 'contactPageTitle', label: 'Contact Page Title', type: 'text', section: 'Contact Page Settings' },
  { key: 'contactFormHeading', label: 'Contact Form Heading', type: 'text', section: 'Contact Page Settings' },
  { key: 'contactPageDescription', label: 'Contact Page Description', type: 'textarea', section: 'Contact Page Settings', colSpan: 2 },
  { key: 'thankYouMessage', label: 'Thank You Message', type: 'textarea', section: 'Contact Page Settings', colSpan: 2 },
  { key: 'contactFormEnabled', label: 'Contact Form Enabled', type: 'boolean', section: 'Contact Page Settings' }
];

export const brandingFields: FieldConfig[] = [
  { key: 'businessName', label: 'Business Name', type: 'text', section: 'Brand Info' },
  { key: 'brandName', label: 'Brand Name', type: 'text', section: 'Brand Info' },
  { key: 'tagline', label: 'Tagline', type: 'text', section: 'Brand Info', colSpan: 2 },
  { key: 'shortBrandDescription', label: 'Short Brand Description', type: 'text', section: 'Brand Info', colSpan: 2 },
  { key: 'fullBrandDescription', label: 'Full Brand Description', type: 'textarea', section: 'Brand Info', colSpan: 2 },

  { key: 'mainLogo', label: 'Main Logo', type: 'image', uploadFolder: 'branding', section: 'Logos' },
  { key: 'websiteLogo', label: 'Website Logo', type: 'image', uploadFolder: 'branding', section: 'Logos' },
  { key: 'adminPanelLogo', label: 'Admin Panel Logo', type: 'image', uploadFolder: 'branding', section: 'Logos' },
  { key: 'mobileLogo', label: 'Mobile Logo', type: 'image', uploadFolder: 'branding', section: 'Logos' },
  { key: 'footerLogo', label: 'Footer Logo', type: 'image', uploadFolder: 'branding', section: 'Logos' },
  { key: 'loginPageLogo', label: 'Login Page Logo', type: 'image', uploadFolder: 'branding', section: 'Logos' },
  { key: 'favicon', label: 'Favicon', type: 'image', uploadFolder: 'branding', section: 'Logos' },

  { key: 'lightLogo', label: 'Light Logo', type: 'image', uploadFolder: 'branding', section: 'Logo Variants' },
  { key: 'darkLogo', label: 'Dark Logo', type: 'image', uploadFolder: 'branding', section: 'Logo Variants' },
  { key: 'transparentLogo', label: 'Transparent Logo', type: 'image', uploadFolder: 'branding', section: 'Logo Variants' },

  { key: 'primaryColor', label: 'Primary Brand Color', type: 'text', section: 'Brand Appearance' },
  { key: 'secondaryColor', label: 'Secondary Brand Color', type: 'text', section: 'Brand Appearance' },
  { key: 'accentColor', label: 'Accent Color', type: 'text', section: 'Brand Appearance' }
];

export const footerFields: FieldConfig[] = [
  { key: 'logo', label: 'Footer Logo', type: 'image', uploadFolder: 'branding', section: 'Content' },
  { key: 'tagline', label: 'Footer Tagline', type: 'text', section: 'Content' },
  { key: 'description', label: 'Footer Description', type: 'textarea', section: 'Content', colSpan: 2 },
  { key: 'copyrightText', label: 'Copyright Text', type: 'text', section: 'Content' },
  { key: 'copyrightYear', label: 'Copyright Year', type: 'number', section: 'Content' },

  { key: 'phone', label: 'Phone', type: 'text', section: 'Contact' },
  { key: 'whatsapp', label: 'WhatsApp', type: 'text', section: 'Contact' },
  { key: 'email', label: 'Email', type: 'text', section: 'Contact' },
  { key: 'address', label: 'Address', type: 'text', section: 'Contact' },
  { key: 'businessHoursText', label: 'Business Hours', type: 'text', section: 'Contact' },

  { key: 'socialInstagram', label: 'Instagram URL', type: 'text', section: 'Social Media' },
  { key: 'socialFacebook', label: 'Facebook URL', type: 'text', section: 'Social Media' },
  { key: 'socialYoutube', label: 'YouTube URL', type: 'text', section: 'Social Media' },
  { key: 'socialWhatsapp', label: 'WhatsApp URL', type: 'text', section: 'Social Media' },

  { key: 'showLogo', label: 'Show Logo', type: 'boolean', section: 'Toggles' },
  { key: 'showDescription', label: 'Show Description', type: 'boolean', section: 'Toggles' },
  { key: 'showContactInfo', label: 'Show Contact Info', type: 'boolean', section: 'Toggles' },
  { key: 'showSocialMedia', label: 'Show Social Media', type: 'boolean', section: 'Toggles' },
  { key: 'showQuickLinks', label: 'Show Quick Links', type: 'boolean', section: 'Toggles' },
  { key: 'showCopyright', label: 'Show Copyright', type: 'boolean', section: 'Toggles' },

  { key: 'privacyPolicyContent', label: 'Privacy Policy Content', type: 'textarea', section: 'Policies', colSpan: 2 },
  { key: 'termsContent', label: 'Terms & Conditions Content', type: 'textarea', section: 'Policies', colSpan: 2 },
  { key: 'cancellationPolicyContent', label: 'Cancellation Policy Content', type: 'textarea', section: 'Policies', colSpan: 2 }
];

export const invoiceSettingsFields: FieldConfig[] = [
  { key: 'invoiceEnabled', label: 'Invoice Enabled', type: 'boolean', section: 'Settings' },
  { key: 'invoicePrefix', label: 'Invoice Prefix', type: 'text', section: 'Settings' },
  { key: 'startingInvoiceNumber', label: 'Starting Invoice Number', type: 'number', section: 'Settings' },
  { key: 'invoiceNumberFormat', label: 'Invoice Number Format', type: 'text', section: 'Settings' },
  { key: 'invoiceLogo', label: 'Invoice Logo', type: 'image', uploadFolder: 'invoices', section: 'Settings' },
  { key: 'invoiceBusinessName', label: 'Invoice Business Name', type: 'text', section: 'Settings' },
  { key: 'invoiceDescription', label: 'Invoice Description', type: 'textarea', section: 'Settings', colSpan: 2 },

  { key: 'businessAddress', label: 'Business Address', type: 'textarea', section: 'Business Details', colSpan: 2 },
  { key: 'phone', label: 'Phone Number', type: 'text', section: 'Business Details' },
  { key: 'whatsapp', label: 'WhatsApp Number', type: 'text', section: 'Business Details' },
  { key: 'email', label: 'Email Address', type: 'text', section: 'Business Details' },
  { key: 'website', label: 'Website', type: 'text', section: 'Business Details' },
  { key: 'gstNumber', label: 'GST Number', type: 'text', section: 'Business Details' },
  { key: 'panNumber', label: 'PAN Number', type: 'text', section: 'Business Details' },

  { key: 'invoiceTitle', label: 'Invoice Title', type: 'text', section: 'Appearance' },
  { key: 'invoiceHeader', label: 'Invoice Header', type: 'textarea', section: 'Appearance', colSpan: 2 },
  { key: 'invoiceFooter', label: 'Invoice Footer', type: 'textarea', section: 'Appearance', colSpan: 2 },
  { key: 'invoiceNotes', label: 'Invoice Notes', type: 'textarea', section: 'Appearance', colSpan: 2 },
  { key: 'termsAndConditions', label: 'Terms & Conditions', type: 'textarea', section: 'Appearance', colSpan: 2 }
];

export const aboutUsFields: FieldConfig[] = [
  { key: 'heading', label: 'Heading', type: 'text', colSpan: 2 },
  { key: 'description', label: 'Description', type: 'textarea', colSpan: 2 },
  { key: 'mediaPosition', label: 'Media Position', type: 'select', options: ['Left', 'Right', 'Top', 'Bottom'] },
  { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Published'] },
  { key: 'experienceYears', label: 'Years of Experience', type: 'number' },
  { key: 'eventsCompleted', label: 'Events Completed', type: 'number' },
  { key: 'happyCustomers', label: 'Happy Customers', type: 'number' },
  { key: 'citiesServed', label: 'Cities Served', type: 'number' },
  { key: 'mission', label: 'Mission', type: 'textarea', colSpan: 2 },
  { key: 'vision', label: 'Vision', type: 'textarea', colSpan: 2 }
];

export const homeServicesBlockFields: FieldConfig[] = [
  { key: 'heading', label: 'Heading', type: 'text', colSpan: 2 },
  { key: 'subHeading', label: 'Sub Heading', type: 'text', colSpan: 2 },
  { key: 'description', label: 'Description', type: 'textarea', colSpan: 2 },
  { key: 'mediaPosition', label: 'Media Position', type: 'select', options: ['Left', 'Right', 'Top', 'Bottom'] },
  { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Published'] }
];

export const heroFields: FieldConfig[] = [
  { key: 'heading', label: 'Hero Heading', type: 'text', colSpan: 2 },
  { key: 'subHeading', label: 'Hero Sub Heading', type: 'text', colSpan: 2 },
  { key: 'description', label: 'Hero Description', type: 'textarea', colSpan: 2 },
  { key: 'backgroundImage', label: 'Hero Background Image', type: 'image', uploadFolder: 'home' },
  { key: 'promotionalVideo', label: 'Promotional Video', type: 'video', uploadFolder: 'home' },
  { key: 'ctaText', label: 'CTA Button Text', type: 'text' },
  { key: 'ctaLink', label: 'CTA Button Link', type: 'text' },
  { key: 'bookNowText', label: 'Book Now Button Text', type: 'text' },
  { key: 'whatsappText', label: 'WhatsApp Button Text', type: 'text' }
];
