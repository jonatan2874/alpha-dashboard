//import icons
import { 
  HiOutlineClipboardCheck,
  HiOutlineChartPie,
  HiOutlineCash,
  HiOutlineCurrencyDollar,
  HiOutlineShoppingCart,
  HiOutlineAcademicCap
} from "react-icons/hi";

const navigationConfig = [
    {
      id: 'dashboards',
      title: 'Dashboards',
      subtitle: 'Unique dashboard designs',
      type: 'group',
      icon: 'heroicons-outline:home',
      translate: 'DASHBOARDS',
      children: [
        {
          id: 'dashboards.project',
          title: 'Project',
          type: 'item',
          icon: <HiOutlineClipboardCheck/>,
          url: '/tickets',
        },
        {
          id: 'dashboards.analytics',
          title: 'Analytics',
          type: 'item',
          icon: <HiOutlineChartPie />,
          url: '/dashboards/analytics',
        },
        {
          id: 'dashboards.finance',
          title: 'Finance',
          type: 'item',
          icon: <HiOutlineCash />,
          url: '/dashboards/finance',
        },
        {
          id: 'dashboards.crypto',
          title: 'Crypto',
          type: 'item',
          icon: <HiOutlineCurrencyDollar />,
          url: '/dashboards/crypto',
        },
      ],
    },
    {
      id: 'apps',
      title: 'Applications',
      subtitle: 'Custom made application designs',
      type: 'group',
      // icon: 'heroicons-outline:cube',
      translate: 'APPLICATIONS',
      children: [
        {
          id: 'apps.academy',
          title: 'Academy',
          type: 'item',
          icon: <HiOutlineAcademicCap/>,
          url: '/apps/academy',
          translate: 'ACADEMY',
        },
        {
          id: 'apps.calendar',
          title: 'Calendar',
          subtitle: '3 upcoming events',
          type: 'item',
          // // icon: 'heroicons-outline:calendar',
          url: '/apps/calendar',
          translate: 'CALENDAR',
        },
        {
          id: 'apps.chat',
          title: 'Chat',
          type: 'item',
          // // icon: 'heroicons-outline:chat-alt',
          url: '/apps/chat',
          translate: 'CHAT',
        },
        {
          id: 'apps.contacts',
          title: 'Contacts',
          type: 'item',
          // // icon: 'heroicons-outline:user-group',
          url: '/apps/contacts',
          translate: 'CONTACTS',
        },
        {
          id: 'apps.ecommerce',
          title: 'ECommerce',
          type: 'collapse',
          icon: <HiOutlineShoppingCart/>,
          translate: 'ECOMMERCE',
          children: [
            {
              id: 'e-commerce-products',
              title: 'Products',
              type: 'item',
              // icon: <HiOutlineShoppingCart/>,
              url: 'apps/e-commerce/products',
              end: true,
            },
            {
              id: 'e-commerce-product-detail',
              title: 'Product Detail',
              type: 'item',
              url: 'apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print',
            },
            {
              id: 'e-commerce-new-product',
              title: 'New Product',
              type: 'item',
              url: 'apps/e-commerce/products/new',
            },
            {
              id: 'e-commerce-orders',
              title: 'Orders',
              type: 'item',
              url: 'apps/e-commerce/orders',
              end: true,
            },
            {
              id: 'e-commerce-order-detail',
              title: 'Order Detail',
              type: 'item',
              url: 'apps/e-commerce/orders/1',
            },
          ],
        },
        {
          id: 'apps.file-manager',
          title: 'File Manager',
          type: 'item',
          // // icon: 'heroicons-outline:cloud',
          url: '/apps/file-manager',
          end: true,
          translate: 'FILE_MANAGER',
        },
        
      ],
    },
    
    
  ];
  
  export default navigationConfig;