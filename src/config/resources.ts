import type { ResourceConfig } from '../types/resource';

export const servicesConfig: ResourceConfig = {
  key: 'services', title: 'Services', singular: 'Service', hasSoftDelete: true,
  statusOptions: ['Active', 'Inactive', 'Draft', 'Published'],
  columns: [
    { key: 'mainImage', label: '', isMedia: true },
    { key: 'serviceName', label: 'Service Name' },
    { key: 'serviceCategory', label: 'Category' },
    { key: 'startingPrice', label: 'Starting Price' },
    { key: 'status', label: 'Status', isStatus: true },
    { key: 'featured', label: 'Featured' }
  ],
  fields: [
    { key: 'serviceName', label: 'Service Name', type: 'text', required: true, section: 'Core' },
    { key: 'serviceCategory', label: 'Service Category', type: 'text', section: 'Core' },
    { key: 'shortDescription', label: 'Short Description', type: 'textarea', section: 'Core', colSpan: 2 },
    { key: 'detailedDescription', label: 'Detailed Description', type: 'textarea', section: 'Core', colSpan: 2 },
    { key: 'serviceHighlights', label: 'Service Highlights', type: 'tags', section: 'Core', colSpan: 2 },
    { key: 'keyFeatures', label: 'Key Features', type: 'tags', section: 'Core', colSpan: 2 },
    { key: 'benefits', label: 'Benefits', type: 'tags', section: 'Core', colSpan: 2 },
    { key: 'whatWeProvide', label: 'What We Provide', type: 'tags', section: 'Core', colSpan: 2 },
    { key: 'whatIsIncluded', label: 'What Is Included', type: 'tags', section: 'Core', colSpan: 2 },
    { key: 'whatIsNotIncluded', label: 'What Is Not Included', type: 'tags', section: 'Core', colSpan: 2 },
    { key: 'suitableFor', label: 'Suitable For', type: 'tags', section: 'Core' },
    { key: 'eventTypes', label: 'Event Types', type: 'tags', section: 'Core' },
    { key: 'ageGroup', label: 'Age Group', type: 'text', section: 'Core' },
    { key: 'eventDuration', label: 'Event Duration', type: 'text', section: 'Core' },
    { key: 'performanceDuration', label: 'Performance Duration', type: 'text', section: 'Core' },
    { key: 'numberOfPerformers', label: 'Number of Performers', type: 'number', section: 'Core' },
    { key: 'teamSize', label: 'Team Size', type: 'number', section: 'Core' },
    { key: 'indoorOutdoor', label: 'Indoor/Outdoor', type: 'select', options: ['Indoor', 'Outdoor', 'Both'], section: 'Core' },
    { key: 'serviceArea', label: 'Service Area', type: 'text', section: 'Core' },
    { key: 'guestCapacity', label: 'Guest Capacity', type: 'text', section: 'Core' },

    { key: 'startingPrice', label: 'Starting Price', type: 'number', section: 'Pricing' },
    { key: 'maximumPrice', label: 'Maximum Price', type: 'number', section: 'Pricing' },
    { key: 'pricingType', label: 'Pricing Type', type: 'text', section: 'Pricing' },
    { key: 'packageAvailable', label: 'Package Available', type: 'boolean', section: 'Pricing' },
    { key: 'customPricingAvailable', label: 'Custom Pricing Available', type: 'boolean', section: 'Pricing' },
    { key: 'bookingAdvanceAmount', label: 'Booking Advance Amount', type: 'number', section: 'Pricing' },
    { key: 'cancellationPolicy', label: 'Cancellation Policy', type: 'textarea', section: 'Pricing', colSpan: 2 },
    { key: 'bookingTerms', label: 'Booking Terms & Conditions', type: 'textarea', section: 'Pricing', colSpan: 2 },

    { key: 'mainImage', label: 'Main Service Image', type: 'image', uploadFolder: 'services', section: 'Media' },
    { key: 'thumbnail', label: 'Service Thumbnail', type: 'image', uploadFolder: 'services', section: 'Media' },
    { key: 'additionalPhotos', label: 'Additional Photos', type: 'multi-image', uploadFolder: 'services', section: 'Media', colSpan: 2 },
    { key: 'video', label: 'Service Video', type: 'video', uploadFolder: 'services', section: 'Media' },
    { key: 'youtubeLink', label: 'YouTube Video Link', type: 'text', section: 'Media' },
    { key: 'icon', label: 'Service Icon', type: 'image', uploadFolder: 'services', section: 'Media' },

    { key: 'featured', label: 'Featured Service', type: 'boolean', section: 'Visibility' },
    { key: 'popular', label: 'Popular Service', type: 'boolean', section: 'Visibility' },
    { key: 'showOnHomepage', label: 'Show on Homepage', type: 'boolean', section: 'Visibility' },
    { key: 'displayOrder', label: 'Display Order', type: 'number', section: 'Visibility' },
    { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'Draft', 'Published'], section: 'Visibility' },

    { key: 'seoTitle', label: 'SEO Title', type: 'text', section: 'SEO' },
    { key: 'focusKeyword', label: 'Focus Keyword', type: 'text', section: 'SEO' },
    { key: 'seoDescription', label: 'SEO Description', type: 'textarea', section: 'SEO', colSpan: 2 },
    { key: 'seoKeywords', label: 'SEO Keywords', type: 'tags', section: 'SEO', colSpan: 2 },
    { key: 'searchKeywords', label: 'Search Keywords', type: 'tags', section: 'SEO', colSpan: 2 },
    { key: 'imageAltText', label: 'Image Alt Text', type: 'text', section: 'SEO' },
    { key: 'socialTitle', label: 'Social Media Title', type: 'text', section: 'SEO' },
    { key: 'socialDescription', label: 'Social Media Description', type: 'textarea', section: 'SEO', colSpan: 2 },
    { key: 'socialImage', label: 'Social Media Image', type: 'image', uploadFolder: 'services', section: 'SEO' }
  ]
};

export const galleryConfig: ResourceConfig = {
  key: 'gallery', title: 'Gallery', singular: 'Gallery Item', hasSoftDelete: true,
  statusOptions: ['Active', 'Inactive', 'Draft', 'Published'],
  columns: [
    { key: 'fileUrl', label: '', isMedia: true },
    { key: 'title', label: 'Title' },
    { key: 'eventType', label: 'Event Type' },
    { key: 'mediaType', label: 'Media Type' },
    { key: 'status', label: 'Status', isStatus: true }
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'eventType', label: 'Event Type', type: 'text', required: true, hint: 'Type an existing or new event type' },
    { key: 'mediaType', label: 'Media Type', type: 'select', options: ['image', 'video'] },
    { key: 'fileUrl', label: 'Media File', type: 'image', uploadFolder: 'gallery', required: true, colSpan: 2 },
    { key: 'shortDescription', label: 'Short Description', type: 'text', colSpan: 2 },
    { key: 'description', label: 'Description', type: 'textarea', colSpan: 2 },
    { key: 'keyHighlights', label: 'Key Highlights', type: 'tags', colSpan: 2 },
    { key: 'layoutStyle', label: 'Layout Style', type: 'select', options: ['Slideshow', 'Grid', 'Flex'] },
    { key: 'displayOrder', label: 'Display Order', type: 'number' },
    { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'Draft', 'Published'] }
  ]
};

export const eventsConfig: ResourceConfig = {
  key: 'events', title: 'Events', singular: 'Event', hasSoftDelete: true,
  statusOptions: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled', 'Postponed'],
  columns: [
    { key: 'poster', label: '', isMedia: true },
    { key: 'eventName', label: 'Event Name' },
    { key: 'eventDate', label: 'Date' },
    { key: 'city', label: 'City' },
    { key: 'status', label: 'Status', isStatus: true },
    { key: 'featured', label: 'Featured' }
  ],
  fields: [
    { key: 'eventName', label: 'Event Name', type: 'text', required: true, section: 'Basic' },
    { key: 'eventCategory', label: 'Event Category', type: 'text', section: 'Basic' },
    { key: 'eventType', label: 'Event Type', type: 'text', section: 'Basic' },
    { key: 'shortDescription', label: 'Short Description', type: 'textarea', section: 'Basic', colSpan: 2 },
    { key: 'detailedDescription', label: 'Detailed Description', type: 'textarea', section: 'Basic', colSpan: 2 },

    { key: 'eventDate', label: 'Event Date', type: 'date', section: 'Date & Time' },
    { key: 'startTime', label: 'Start Time', type: 'text', section: 'Date & Time' },
    { key: 'endTime', label: 'End Time', type: 'text', section: 'Date & Time' },
    { key: 'eventDuration', label: 'Event Duration', type: 'text', section: 'Date & Time' },

    { key: 'venueName', label: 'Venue Name', type: 'text', section: 'Venue & Location' },
    { key: 'fullAddress', label: 'Full Address', type: 'textarea', section: 'Venue & Location', colSpan: 2 },
    { key: 'area', label: 'Area', type: 'text', section: 'Venue & Location' },
    { key: 'city', label: 'City', type: 'text', section: 'Venue & Location' },
    { key: 'state', label: 'State', type: 'text', section: 'Venue & Location' },
    { key: 'pincode', label: 'Pincode', type: 'text', section: 'Venue & Location' },
    { key: 'landmark', label: 'Landmark', type: 'text', section: 'Venue & Location' },
    { key: 'googleMapsLocation', label: 'Google Maps Location', type: 'text', section: 'Venue & Location', colSpan: 2 },
    { key: 'indoorOutdoor', label: 'Indoor/Outdoor', type: 'select', options: ['Indoor', 'Outdoor', 'Both'], section: 'Venue & Location' },
    { key: 'parkingAvailability', label: 'Parking Availability', type: 'boolean', section: 'Venue & Location' },

    { key: 'eventTheme', label: 'Event Theme', type: 'text', section: 'Event Details' },
    { key: 'eventHighlights', label: 'Event Highlights', type: 'tags', section: 'Event Details', colSpan: 2 },
    { key: 'servicesProvided', label: 'Services Provided', type: 'tags', section: 'Event Details', colSpan: 2 },
    { key: 'specialAttractions', label: 'Special Attractions', type: 'tags', section: 'Event Details', colSpan: 2 },
    { key: 'expectedAudience', label: 'Expected Audience', type: 'text', section: 'Event Details' },
    { key: 'numberOfGuests', label: 'Number of Guests', type: 'number', section: 'Event Details' },

    { key: 'poster', label: 'Event Poster', type: 'image', uploadFolder: 'events', section: 'Media' },
    { key: 'coverImage', label: 'Cover Image', type: 'image', uploadFolder: 'events', section: 'Media' },
    { key: 'mainPhoto', label: 'Main Photo', type: 'image', uploadFolder: 'events', section: 'Media' },
    { key: 'galleryPhotos', label: 'Event Gallery Photos', type: 'multi-image', uploadFolder: 'events', section: 'Media', colSpan: 2 },
    { key: 'video', label: 'Event Video', type: 'video', uploadFolder: 'events', section: 'Media' },
    { key: 'youtubeLink', label: 'YouTube Link', type: 'text', section: 'Media' },
    { key: 'instagramReel', label: 'Instagram Reel', type: 'text', section: 'Media' },

    { key: 'bookingAvailable', label: 'Booking Available', type: 'boolean', section: 'Booking' },
    { key: 'ticketRequired', label: 'Ticket Required', type: 'boolean', section: 'Booking' },
    { key: 'ticketPrice', label: 'Ticket Price', type: 'number', section: 'Booking' },
    { key: 'bookingLink', label: 'Booking Link', type: 'text', section: 'Booking' },
    { key: 'enquiryAvailable', label: 'Enquiry Available', type: 'boolean', section: 'Booking' },
    { key: 'advanceBooking', label: 'Advance Booking', type: 'boolean', section: 'Booking' },
    { key: 'bookingDeadline', label: 'Booking Deadline', type: 'date', section: 'Booking' },
    { key: 'maximumCapacity', label: 'Maximum Capacity', type: 'number', section: 'Booking' },

    { key: 'status', label: 'Status', type: 'select', options: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled', 'Postponed'], section: 'Status & Visibility' },
    { key: 'featured', label: 'Featured Event', type: 'boolean', section: 'Status & Visibility' },
    { key: 'popular', label: 'Popular Event', type: 'boolean', section: 'Status & Visibility' },
    { key: 'showOnHomepage', label: 'Show on Homepage', type: 'boolean', section: 'Status & Visibility' },
    { key: 'displayOrder', label: 'Display Order', type: 'number', section: 'Status & Visibility' },

    { key: 'seoTitle', label: 'SEO Title', type: 'text', section: 'SEO' },
    { key: 'focusKeyword', label: 'Focus Keyword', type: 'text', section: 'SEO' },
    { key: 'seoDescription', label: 'SEO Description', type: 'textarea', section: 'SEO', colSpan: 2 },
    { key: 'seoKeywords', label: 'SEO Keywords', type: 'tags', section: 'SEO', colSpan: 2 },
    { key: 'imageAltText', label: 'Image Alt Text', type: 'text', section: 'SEO' },
    { key: 'socialTitle', label: 'Social Media Title', type: 'text', section: 'SEO' },
    { key: 'socialDescription', label: 'Social Media Description', type: 'textarea', section: 'SEO', colSpan: 2 },

    { key: 'termsAndConditions', label: 'Terms & Conditions', type: 'textarea', section: 'Additional', colSpan: 2 },
    { key: 'cancellationPolicy', label: 'Cancellation Policy', type: 'textarea', section: 'Additional', colSpan: 2 },
    { key: 'importantNotes', label: 'Important Notes', type: 'textarea', section: 'Additional', colSpan: 2 },
    { key: 'adminNotes', label: 'Admin Notes', type: 'textarea', section: 'Additional', colSpan: 2 }
  ]
};

export const testimonialsConfig: ResourceConfig = {
  key: 'testimonials', title: 'Testimonials', singular: 'Testimonial', hasSoftDelete: false,
  statusOptions: ['Pending', 'Approved', 'Rejected'],
  columns: [
    { key: 'customerPhoto', label: '', isMedia: true },
    { key: 'customerName', label: 'Customer' },
    { key: 'rating', label: 'Rating' },
    { key: 'eventType', label: 'Event Type' },
    { key: 'source', label: 'Source' },
    { key: 'status', label: 'Status', isStatus: true }
  ],
  fields: [
    { key: 'customerName', label: 'Customer Name', type: 'text', required: true, section: 'Review' },
    { key: 'customerPhoto', label: 'Customer Photo', type: 'image', uploadFolder: 'testimonials', section: 'Review' },
    { key: 'customerLocation', label: 'Customer Location', type: 'text', section: 'Review' },
    { key: 'customerType', label: 'Customer Type', type: 'text', section: 'Review' },
    { key: 'companyName', label: 'Company/Organization Name', type: 'text', section: 'Review' },
    { key: 'rating', label: 'Rating', type: 'select', options: ['1', '2', '3', '4', '5'], section: 'Review' },
    { key: 'reviewTitle', label: 'Review Title', type: 'text', section: 'Review' },
    { key: 'review', label: 'Customer Review', type: 'textarea', section: 'Review', colSpan: 2 },
    { key: 'reviewDate', label: 'Review Date', type: 'date', section: 'Review' },
    { key: 'eventType', label: 'Event Type', type: 'text', section: 'Review' },
    { key: 'eventDate', label: 'Event Date', type: 'date', section: 'Review' },
    { key: 'packageUsed', label: 'Package Used', type: 'text', section: 'Review' },

    { key: 'reviewImage', label: 'Review Image', type: 'image', uploadFolder: 'testimonials', section: 'Media' },
    { key: 'reviewVideo', label: 'Review Video', type: 'video', uploadFolder: 'testimonials', section: 'Media' },
    { key: 'videoUrl', label: 'Video URL', type: 'text', section: 'Media' },

    { key: 'status', label: 'Review Status', type: 'select', options: ['Pending', 'Approved', 'Rejected'], section: 'Management' },
    { key: 'featured', label: 'Featured Review', type: 'boolean', section: 'Management' },
    { key: 'showOnHomepage', label: 'Show on Homepage', type: 'boolean', section: 'Management' },
    { key: 'displayOrder', label: 'Display Order', type: 'number', section: 'Management' },
    { key: 'adminNotes', label: 'Admin Notes', type: 'textarea', section: 'Management', colSpan: 2 },
    { key: 'source', label: 'Review Source', type: 'select', options: ['Website', 'Google', 'Facebook', 'Instagram', 'WhatsApp', 'Direct Customer', 'Other'], section: 'Management' },
    { key: 'verifiedCustomer', label: 'Verified Customer', type: 'boolean', section: 'Management' },
    { key: 'verifiedBooking', label: 'Verified Booking', type: 'boolean', section: 'Management' },
    { key: 'verifiedEvent', label: 'Verified Event', type: 'boolean', section: 'Management' }
  ]
};

export const blogsConfig: ResourceConfig = {
  key: 'blogs', title: 'Blogs', singular: 'Blog', hasSoftDelete: true,
  statusOptions: ['Draft', 'Published'],
  columns: [
    { key: 'images', label: '', render: (r) => (r.images?.[0] ? '🖼️' : '—'), isMedia: false },
    { key: 'heading', label: 'Heading' },
    { key: 'subHeading', label: 'Sub-heading' },
    { key: 'status', label: 'Status', isStatus: true }
  ],
  fields: [
    { key: 'heading', label: 'Heading', type: 'text', required: true, colSpan: 2 },
    { key: 'subHeading', label: 'Sub-heading', type: 'text', colSpan: 2 },
    { key: 'description', label: 'Description', type: 'textarea', colSpan: 2 },
    { key: 'shortKeyHighlights', label: 'Short Key Highlights', type: 'tags', colSpan: 2 },
    { key: 'images', label: 'Images', type: 'multi-image', uploadFolder: 'blogs', colSpan: 2 },
    { key: 'readMoreText', label: '"Read More" Button Text', type: 'text' },
    { key: 'readMoreLink', label: '"Read More" Link', type: 'text' },
    { key: 'displayOrder', label: 'Display Order', type: 'number' },
    { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Published'] },
    { key: 'seoTitle', label: 'SEO Title', type: 'text' },
    { key: 'seoDescription', label: 'SEO Description', type: 'textarea', colSpan: 2 }
  ]
};

export const offersConfig: ResourceConfig = {
  key: 'offers', title: 'Offers & Promotions', singular: 'Offer', hasSoftDelete: true,
  statusOptions: ['Active', 'Scheduled', 'Expired', 'Disabled'],
  columns: [
    { key: 'offerImage', label: '', isMedia: true },
    { key: 'offerName', label: 'Offer Name' },
    { key: 'offerCode', label: 'Code' },
    { key: 'startDate', label: 'Start' },
    { key: 'endDate', label: 'End' },
    { key: 'status', label: 'Status', isStatus: true }
  ],
  fields: [
    { key: 'offerName', label: 'Offer Name', type: 'text', required: true, section: 'Details' },
    { key: 'offerTitle', label: 'Offer Title', type: 'text', section: 'Details' },
    { key: 'offerCode', label: 'Offer Code', type: 'text', section: 'Details' },
    { key: 'offerType', label: 'Offer Type', type: 'text', section: 'Details' },
    { key: 'offerDescription', label: 'Offer Description', type: 'textarea', section: 'Details', colSpan: 2 },
    { key: 'offerImage', label: 'Offer Image', type: 'image', uploadFolder: 'offers', section: 'Details' },
    { key: 'offerBanner', label: 'Offer Banner', type: 'image', uploadFolder: 'offers', section: 'Details' },

    { key: 'percentageDiscount', label: 'Percentage Discount', type: 'number', section: 'Discount' },
    { key: 'fixedAmountDiscount', label: 'Fixed Amount Discount', type: 'number', section: 'Discount' },
    { key: 'minimumBookingAmount', label: 'Minimum Booking Amount', type: 'number', section: 'Discount' },
    { key: 'maximumDiscount', label: 'Maximum Discount', type: 'number', section: 'Discount' },
    { key: 'specialPackagePrice', label: 'Special Package Price', type: 'number', section: 'Discount' },

    { key: 'startDate', label: 'Offer Start Date', type: 'date', section: 'Validity' },
    { key: 'endDate', label: 'Offer End Date', type: 'date', section: 'Validity' },
    { key: 'bookingDeadline', label: 'Booking Deadline', type: 'date', section: 'Validity' },

    { key: 'applicablePackage', label: 'Applicable Package', type: 'text', section: 'Applicability' },
    { key: 'applicableEventType', label: 'Applicable Event Type', type: 'text', section: 'Applicability' },
    { key: 'eligibility', label: 'Eligibility', type: 'select', options: ['All Customers', 'New Customers', 'Existing Customers', 'Selected Customers'], section: 'Applicability' },

    { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Scheduled', 'Expired', 'Disabled'], section: 'Status' },

    { key: 'promotionText', label: 'Promotion Text', type: 'textarea', section: 'Promotion', colSpan: 2 },
    { key: 'whatsappMessage', label: 'WhatsApp Message', type: 'textarea', section: 'Promotion', colSpan: 2 },
    { key: 'socialMediaMessage', label: 'Social Media Message', type: 'textarea', section: 'Promotion', colSpan: 2 },
    { key: 'termsAndConditions', label: 'Terms & Conditions', type: 'textarea', section: 'Promotion', colSpan: 2 }
  ]
};

export const announcementsConfig: ResourceConfig = {
  key: 'announcements', title: 'Announcements', singular: 'Announcement', hasSoftDelete: true,
  statusOptions: ['Draft', 'Scheduled', 'Published', 'Expired', 'Disabled'],
  columns: [
    { key: 'announcementImage', label: '', isMedia: true },
    { key: 'title', label: 'Title' },
    { key: 'priority', label: 'Priority' },
    { key: 'startDate', label: 'Start' },
    { key: 'endDate', label: 'End' },
    { key: 'status', label: 'Status', isStatus: true }
  ],
  fields: [
    { key: 'title', label: 'Announcement Title', type: 'text', required: true, colSpan: 2 },
    { key: 'description', label: 'Announcement Description', type: 'textarea', colSpan: 2 },
    { key: 'image', label: 'Announcement Image', type: 'image', uploadFolder: 'announcements' },
    { key: 'type', label: 'Announcement Type', type: 'text' },
    { key: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Urgent'] },
    { key: 'startDate', label: 'Start Date', type: 'date' },
    { key: 'endDate', label: 'End Date', type: 'date' },
    { key: 'displayLocation', label: 'Display Location', type: 'tags', colSpan: 2 },
    { key: 'showOnHomepage', label: 'Show on Homepage', type: 'boolean' },
    { key: 'showOnHeader', label: 'Show on Header', type: 'boolean' },
    { key: 'showAsPopup', label: 'Show as Popup', type: 'boolean' },
    { key: 'showInFooter', label: 'Show in Footer', type: 'boolean' },
    { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Scheduled', 'Published', 'Expired', 'Disabled'] }
  ]
};

export const broadcastsConfig: ResourceConfig = {
  key: 'broadcasts', title: 'Broadcast Messages', singular: 'Broadcast', hasSoftDelete: true,
  statusOptions: ['Draft', 'Scheduled', 'Published', 'Expired', 'Disabled'],
  columns: [
    { key: 'image', label: '', isMedia: true },
    { key: 'title', label: 'Title' },
    { key: 'type', label: 'Type' },
    { key: 'targetAudience', label: 'Audience' },
    { key: 'status', label: 'Status', isStatus: true }
  ],
  fields: [
    { key: 'title', label: 'Message Title', type: 'text', required: true, section: 'Details' },
    { key: 'heading', label: 'Message Heading', type: 'text', section: 'Details' },
    { key: 'description', label: 'Message Description', type: 'textarea', section: 'Details', colSpan: 2 },
    { key: 'message', label: 'Broadcast Message', type: 'textarea', section: 'Details', colSpan: 2 },
    { key: 'image', label: 'Message Image', type: 'image', uploadFolder: 'broadcasts', section: 'Details' },
    { key: 'bannerImage', label: 'Banner Image', type: 'image', uploadFolder: 'broadcasts', section: 'Details' },
    { key: 'promotionalVideo', label: 'Promotional Video', type: 'video', uploadFolder: 'broadcasts', section: 'Details' },

    { key: 'type', label: 'Type', type: 'select', options: ['Announcement', 'Offer', 'Promotion', 'Event Announcement', 'Festival Greeting', 'Service Update', 'Important Information', 'General Notification'], section: 'Type' },
    { key: 'targetAudience', label: 'Target Audience', type: 'select', options: ['All Customers', 'Previous Customers', 'New Customers', 'Selected Customers', 'Confirmed Customers', 'Enquiry Customers'], section: 'Type' },
    { key: 'displayOptions', label: 'Display Options', type: 'tags', section: 'Type', colSpan: 2, hint: 'e.g. Website Banner, Homepage Popup, Announcement Bar' },

    { key: 'startDate', label: 'Start Date', type: 'date', section: 'Scheduling' },
    { key: 'startTime', label: 'Start Time', type: 'text', section: 'Scheduling' },
    { key: 'endDate', label: 'End Date', type: 'date', section: 'Scheduling' },
    { key: 'endTime', label: 'End Time', type: 'text', section: 'Scheduling' },
    { key: 'publishImmediately', label: 'Publish Immediately', type: 'boolean', section: 'Scheduling' },

    { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Scheduled', 'Published', 'Expired', 'Disabled'], section: 'Status' }
  ]
};

export const slidersConfig: ResourceConfig = {
  key: 'home/slider', title: 'Home Slider', singular: 'Slide', hasSoftDelete: false,
  statusOptions: ['Active', 'Inactive'],
  columns: [
    { key: 'mediaUrl', label: '', isMedia: true },
    { key: 'heading', label: 'Heading' },
    { key: 'mediaType', label: 'Type' },
    { key: 'displayOrder', label: 'Order' },
    { key: 'status', label: 'Status', isStatus: true }
  ],
  fields: [
    { key: 'mediaType', label: 'Media Type', type: 'select', options: ['image', 'video'] },
    { key: 'mediaUrl', label: 'Slide Media', type: 'image', uploadFolder: 'home', required: true, colSpan: 2 },
    { key: 'heading', label: 'Heading', type: 'text' },
    { key: 'subHeading', label: 'Sub Heading', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea', colSpan: 2 },
    { key: 'ctaText', label: 'CTA Button Text', type: 'text' },
    { key: 'ctaLink', label: 'CTA Link', type: 'text' },
    { key: 'displayOrder', label: 'Display Order', type: 'number' },
    { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
  ]
};

export const invoicesConfig: ResourceConfig = {
  key: 'invoices', title: 'Invoices', singular: 'Invoice', hasSoftDelete: true,
  statusOptions: ['Draft', 'Generated', 'Sent', 'Partially Paid', 'Paid', 'Cancelled'],
  columns: [
    { key: 'invoiceNumber', label: 'Invoice #' },
    { key: 'customerName', label: 'Customer' },
    { key: 'eventName', label: 'Event' },
    { key: 'finalAmount', label: 'Amount' },
    { key: 'paymentStatus', label: 'Payment', isStatus: true },
    { key: 'status', label: 'Status', isStatus: true }
  ],
  fields: [
    { key: 'customerName', label: 'Customer Name', type: 'text', required: true, section: 'Customer' },
    { key: 'companyName', label: 'Company Name', type: 'text', section: 'Customer' },
    { key: 'phone', label: 'Phone Number', type: 'text', section: 'Customer' },
    { key: 'whatsapp', label: 'WhatsApp Number', type: 'text', section: 'Customer' },
    { key: 'email', label: 'Email Address', type: 'text', section: 'Customer' },
    { key: 'billingAddress', label: 'Billing Address', type: 'textarea', section: 'Customer', colSpan: 2 },

    { key: 'eventName', label: 'Event Name', type: 'text', section: 'Event' },
    { key: 'eventType', label: 'Event Type', type: 'text', section: 'Event' },
    { key: 'eventDate', label: 'Event Date', type: 'date', section: 'Event' },
    { key: 'eventVenue', label: 'Event Venue', type: 'text', section: 'Event' },
    { key: 'eventLocation', label: 'Event Location', type: 'text', section: 'Event' },

    { key: 'totalAmount', label: 'Total Amount', type: 'number', section: 'Payment' },
    { key: 'advancePaid', label: 'Advance Paid', type: 'number', section: 'Payment' },
    { key: 'balanceAmount', label: 'Balance Amount', type: 'number', section: 'Payment' },
    { key: 'finalAmount', label: 'Final Amount', type: 'number', section: 'Payment' },
    { key: 'paymentStatus', label: 'Payment Status', type: 'select', options: ['Not Paid', 'Partially Paid', 'Paid'], section: 'Payment' },
    { key: 'paymentMethod', label: 'Payment Method', type: 'text', section: 'Payment' },
    { key: 'paymentDate', label: 'Payment Date', type: 'date', section: 'Payment' },
    { key: 'transactionRef', label: 'Transaction/Reference Number', type: 'text', section: 'Payment' },

    { key: 'notes', label: 'Invoice Notes', type: 'textarea', section: 'Other', colSpan: 2 },
    { key: 'termsAndConditions', label: 'Terms & Conditions', type: 'textarea', section: 'Other', colSpan: 2 },
    { key: 'status', label: 'Invoice Status', type: 'select', options: ['Draft', 'Generated', 'Sent', 'Partially Paid', 'Paid', 'Cancelled'], section: 'Other' }
  ]
};
