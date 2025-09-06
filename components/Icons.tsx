
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const LogoIcon: React.FC<IconProps> = (props) => (
  <img src= 'public\lesions\avian_icon.jpeg'  width = '50 px' height = '50 px' />
);


export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

export const UsersIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

export const BookOpenIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export const FilterIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

export const MapPinIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
export const ClockIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
export const CheckCircleIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);
export const GlobeIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);
export const DatabaseIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
);
export const CameraIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
);
export const DownloadIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

export const XIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);

export const ZoonoticHighIcon: React.FC<IconProps> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Human */}
        <circle cx="6" cy="5" r="2" />
        <path d="M6 7v6" />
        <path d="M3 13h6" />
        <path d="M6 13l-2 5" />
        <path d="M6 13l2 5" />
        {/* Bird */}
        <path d="M18 9a2 2 0 0 1-2-2 2 2 0 0 0-2-2" />
        <path d="M14 9h4l2 4-3 4h-3l-2-4z" />
        {/* Arrows */}
        <path d="M10 10.5h4" />
        <path d="M13 9.5l1 1-1 1" />
        <path d="M14 13.5h-4" />
        <path d="M11 14.5l-1-1 1-1" />
    </svg>
);

export const ZoonoticModerateIcon: React.FC<IconProps> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Simplified Hand */}
        <path d="M8 20v-5.5a2.5 2.5 0 0 1 5 0V20" />
        <path d="M10.5 14.5a2.5 2.5 0 0 1 5 0V20" />
        <path d="M5.5 20v-8a2.5 2.5 0 0 1 5 0V20" />
        <path d="M3 20v-5.5a2.5 2.5 0 0 1 5 0V20" />
        {/* Drop */}
        <path d="M18 4a3 3 0 0 0-3 3c0 1.66 3 4 3 4s3-2.34 3-4a3 3 0 0 0-3-3z" />
    </svg>
);

export const ZoonoticNoneIcon: React.FC<IconProps> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Human */}
        <circle cx="6" cy="5" r="2" />
        <path d="M6 7v6" />
        <path d="M3 13h6" />
        <path d="M6 13l-2 5" />
        <path d="M6 13l2 5" />
        {/* Bird */}
        <path d="M18 9a2 2 0 0 1-2-2 2 2 0 0 0-2-2" />
        <path d="M14 9h4l2 4-3 4h-3l-2-4z" />
        {/* No Symbol */}
        <circle cx="17" cy="11.5" r="5.5" />
        <line x1="13.5" y1="15" x2="20.5" y2="8" />
    </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
);

export const SyringeIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 2 4 4"></path>
        <path d="m17 7 3-3"></path>
        <path d="M19 9 8.7 19.3a2.4 2.4 0 0 1-3.4 0L2.7 16.7a2.4 2.4 0 0 1 0-3.4L13 3"></path>
        <path d="m8 12 4 4"></path>
        <path d="m12 8 4 4"></path>
    </svg>
);

export const SprayIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1Z"></path>
        <path d="M11 11H3"></path>
        <path d="M11 11a2 2 0 0 1 2-2h1"></path>
        <path d="M14 9a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"></path>
        <path d="m14 9 3-3"></path>
        <path d="M17 6h.01"></path>
        <path d="M21 4h.01"></path>
        <path d="M21 8h.01"></path>
        <path d="M17 10h.01"></path>
    </svg>
);

export const BugIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 9V7a2 2 0 0 0-2-2h-4" />
        <path d="M4 9V7a2 2 0 0 1 2-2h4" />
        <path d="M12 20v-8" />
        <path d="M20 15v-2a2 2 0 0 0-2-2h-2" />
        <path d="M4 15v-2a2 2 0 0 1 2-2h2" />
        <path d="M10 9h4" />
        <path d="M10 13h4" />
        <path d="M10 17h4" />
    </svg>
);

export const HomeQuarantineIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
        <path d="M2 12h20" />
    </svg>
);

export const ClipboardListIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <line x1="12" y1="11" x2="12" y2="11.01"></line>
        <line x1="8" y1="11" x2="8" y2="11.01"></line>
        <line x1="16" y1="11" x2="16" y2="11.01"></line>
        <line x1="12" y1="16" x2="12" y2="16.01"></line>
        <line x1="8" y1="16" x2="8" y2="16.01"></line>
        <line x1="16" y1="16" x2="16" y2="16.01"></line>
    </svg>
);

export const FirstAidIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21h-16a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2Z"></path>
        <path d="M12 10v6"></path>
        <path d="M9 13h6"></path>
        <path d="M12 3v2"></path>
        <path d="M9 3h6"></path>
    </svg>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export const RodentIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6a6 6 0 0 0-12 0"/>
        <path d="M12 12c-3.33 0-10 4-10 10h20c0-6-6.67-10-10-10z"/>
        <path d="M13 3a1 1 0 1 0-2 0 1 1 0 1 0 2 0"/>
        <path d="M4.5 10.5c-1.5 0-3-1.5-3-3"/>
        <path d="M19.5 10.5c1.5 0 3-1.5 3-3"/>
    </svg>
);

export const BirdIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3.1c.9.5 1.8 1.2 2.5 2.1C20.4 7.7 21 10.3 21 13c0 4.4-3.6 8-8 8-4.4 0-8-3.6-8-8 0-2.7.6-5.3 2.5-7.8.7-.9 1.6-1.6 2.5-2.1"/>
        <path d="M12 21c-2.2 0-4-1.8-4-4 0-1.5.8-2.8 2-3.5"/>
        <path d="M12 15c2.2 0 4-1.8 4-4 0-1.5-.8-2.8-2-3.5"/>
        <path d="M10 8c0-1.1.9-2 2-2s2 .9 2 2"/>
    </svg>
);

export const FlyIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8a2 2 0 0 0-2 2v2a2 2 0 0 0 4 0v-2a2 2 0 0 0-2-2z" />
        <path d="m20 7-3 1" />
        <path d="m4 7 3 1" />
        <path d="m11 12 1 8" />
        <path d="m12 12-1 8" />
        <path d="m20 17-3-1" />
        <path d="m4 17 3-1" />
        <path d="m14 4-2 2" />
        <path d="m10 4 2 2" />
    </svg>
);

export const MoroccoIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 16 20 10C20 5.58 16.42 2 12 2C7.58 2 4 5.58 4 10C4 16 12 22 12 22Z" fill="#D1D5DB"/>
    <circle cx="12" cy="10" r="7" fill="#C8102E"/>
    <path d="M12 7.5L13.16 9.85L15.75 10.15L13.88 11.95L14.32 14.5L12 13.25L9.68 14.5L10.12 11.95L8.25 10.15L10.84 9.85L12 7.5Z" stroke="#006233" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
  </svg>
);

// Symptom Category Icons
export const LungsIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 12c-3 0-3 3-3 3v2a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-2s0-3-3-3z"/>
        <path d="M18 12c3 0 3 3 3 3v2a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-2s0-3 3-3z"/>
        <path d="M6 12V8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v4"/>
        <path d="M18 12V8a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v4"/>
        <path d="M12 6V4a2 2 0 0 0-2-2H8"/>
    </svg>
);
export const StomachIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.5 16.5C21 15 21 14 21 12c0-4.5-3-8.5-7-8.5-3.5 0-6.5 3-7 7.5"/>
        <path d="M4.5 16.5c-.5-1.5-.5-2.5-.5-4.5 0-4.5 3-8.5 7-8.5 1.7 0 3.3.6 4.5 1.5"/>
        <path d="M16 19.5c0 1.5-1.5 3-3.5 3S9 21 9 19.5c0-1.5 1.5-3 3.5-3S16 18 16 19.5z"/>
    </svg>
);
export const BrainIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5V6" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5V6" />
        <path d="M12 6V8" />
        <path d="M4.5 7A2.5 2.5 0 0 0 2 9.5v1" />
        <path d="M19.5 7A2.5 2.5 0 0 1 22 9.5v1" />
        <path d="M2.5 15a2.5 2.5 0 0 0 2 2.5h.5" />
        <path d="M19 17.5a2.5 2.5 0 0 0 2-2.5" />
        <path d="M12 14v8" />
        <path d="M12 14h2.5a2.5 2.5 0 0 1 2.5 2.5V18" />
        <path d="M12 14H9.5A2.5 2.5 0 0 0 7 16.5V18" />
        <path d="M16 11.5a2.5 2.5 0 0 1-5 0" />
    </svg>
);
export const BoneIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" />
        <path d="M20 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" />
        <path d="M12 8v8" />
        <path d="M12 4v0" />
        <path d="M12 20v0" />
    </svg>
);
export const HeartbeatIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
);

// Breed Detail Icons
export const FeatherIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>
);

export const ScaleIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16.5l4-4"/><path d="M20 12.5l-4 4"/><path d="M4 21v-7"/><path d="M4 14a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2"/><path d="M8 14v7"/></svg>
);

export const EggIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8z"/></svg>
);

export const ThermometerIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>
);

export const SmileIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
);

export const DnaIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.5A3.5 3.5 0 0 1 7.5 11H12"/><path d="M16.5 11A3.5 3.5 0 0 1 20 14.5"/><path d="M12 11v10"/><path d="M7.5 21a3.5 3.5 0 0 1-3.5-3.5V14"/><path d="M4 14h3.5"/><path d="M16.5 21a3.5 3.5 0 0 0 3.5-3.5V14"/><path d="M20 14h-3.5"/><path d="M7.5 3A3.5 3.5 0 0 0 4 6.5"/><path d="M12 3v8"/><path d="M16.5 3A3.5 3.5 0 0 1 20 6.5"/></svg>
);

export const MapIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
);

// Resources Page Icons
export const GavelIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 10-5.5 5.5a2.12 2.12 0 0 1-3-3L11 7"/><path d="m16 4 3 3"/><path d="M12 6l4 4"/><path d="M16 10h.01"/><path d="M3 21h7"/><path d="M7 17l4 4"/></svg>
);

export const BuildingIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><line x1="8" y1="20" x2="8" y2="4"/><line x1="16" y1="20" x2="16" y2="4"/><line x1="4" y1="12" x2="20" y2="12"/></svg>
);

export const CoinsIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="M16.71 13.88c.7.7 1 1.41 1 2.12 0 .71-.29 1.42-1 2.12-.7.7-1.41 1-2.12 1-.71 0-1.42-.29-2.12-1-.7-.7-1-1.41-1-2.12 0-.71.29-1.42 1-2.12.7-.7 1.42-1 2.12-1 .71 0 1.41.29 2.12 1Z"/></svg>
);

export const GraduationCapIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.838l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12v5a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-5"/></svg>
);

export const LabIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 22h-5c-.83 0-1.5-.67-1.5-1.5v-6c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5v6c0 .83-.67 1.5-1.5 1.5Z"/><path d="M10 13V2"/><path d="M14 13V2"/><path d="M10 2H7"/><path d="M14 2h3"/><path d="M9 13h6"/></svg>
);

export const MessageCircleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

export const SendIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);