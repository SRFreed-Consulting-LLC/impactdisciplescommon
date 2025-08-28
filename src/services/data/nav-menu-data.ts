import { MenuModel, MobileMenuModel } from "impactdisciplescommon/src/models/utils/nav-menu.model";



const menuData: MenuModel[] = [
  { link: '/', title: 'Home', hasDropdown: false , visible: true, external: false, highlight: false},
  { title: 'Training',
    hasDropdown: true,
    dropdownItems: [
      { link: '/seminars', title: 'Seminars', visible: true, external: false, highlight: false },
      { link: '/equipping-groups', title: 'Equipping Groups', visible: true, external: false, highlight: false },
      { link: '/coaching-with-impact', title: 'Coaching with Impact', visible: true, external: false, highlight: false },
      { link: '/lunch-and-learns', title: 'Lunch and Learns', visible: true, external: false, highlight: false },
      { link: '/events', title: 'Upcoming Training', visible: true, external: false, highlight: false }
    ],
    visible: true,
    external: false,
    highlight: false
  },
  { title: 'Resources',
    hasDropdown: true,
    dropdownItems: [
      { link: '/e-books', title: 'E-Books', visible: true, external: false, highlight: false },
      { link: '/podcasts', title: 'Podcasts', visible: true, external: false, highlight: false },
      { link: '/disciple-making-minute', title: 'Disciple Making Minute', visible: true, external: false, highlight: false },
      { link: '/monthly-newsletter', title: 'Monthly Newsletter', visible: true, external: false, highlight: false },
      { link: '/spanish-resources', title: 'Spanish Resources', visible: true, external: false, highlight: false },
    ],
    visible: true,
    external: false,
    highlight: false
  },
  { title: 'Events',
    hasDropdown: true,
    dropdownItems: [
      { link: '/summit/2026', title: 'Summit 2026', visible: 'check', external: false, highlight: false },
      { link: '/events', title: 'Upcoming Training', visible: true, external: false, highlight: false },
    ],
    visible: true,
    external: false,
    highlight: false
   },
  { link: '/store', title: 'Store', hasDropdown: false , visible: true, external: false, highlight: false},
  { link: '/give', title: 'Donate', hasDropdown: false , visible: true, external: false, highlight: false},
  { link: '/team', title: 'Team', hasDropdown: false, visible: true, external: false, highlight: false},
  { link: 'https://events.golfstatus.com/event/2025-impact-golf-tournament', title: 'Golf Tournament 2025', visible: true, external: true, highlight: false },

]

export default menuData;

export const mobileMenuData: MobileMenuModel[] = [
  { link: '/', title: 'Home', visible: true },
  { link: '/events', title: 'Events', visible: true },
  {
    title: 'About Us',
    dropdownMenu: [
      { link: '/team', title: 'Our Team', visible: true },
      { link: '/contact', title: 'Contact', visible: true },
      { link: '/history', title: 'History', visible: true }
    ], visible: true
  },
  {
    title: 'Training',
    dropdownMenu: [
      { link: '/seminars', title: 'Seminars', visible: true },
      { link: '/equipping-groups', title: 'Equipping Groups', visible: true },
      { link: '/coaching-with-impact', title: 'Coaching with Impact', visible: true },
      { link: '/lunch-and-learns', title: 'Lunch and Learns', visible: true }
    ], visible: true
  },
  {
    title: 'Free Resources',
    dropdownMenu: [
      { link: '/e-books', title: 'E-Books', visible: true },
      { link: '/podcasts', title: 'Podcasts', visible: true },
      { link: '/blog', title: 'Blog', visible: true }
    ], visible: true
  },
  {
    title: 'Get Involved',
    dropdownMenu: [
      { link: '/give', title: 'Give', visible: true },
      { link: '/newsletter', title: 'Newsletter SignUp', visible: true },
      { link: '/prayer-team', title: 'Join the Prayer Team', visible: true }
    ], visible: true
  },
  {
    title: 'Terms of Use',
    dropdownMenu: [
      { link: '/terms', title: 'Terms', visible: true },
      { link: '/private-policy', title: 'Private Policy', visible: true }
    ], visible: true
  },
  { link: '/store', title: 'Shop', visible: true }
]
