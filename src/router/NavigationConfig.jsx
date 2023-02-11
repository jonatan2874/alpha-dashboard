//import icons
import { 
  HiOutlineClipboardCheck,
  HiOutlineChartPie,
  HiOutlineCash,
  HiOutlineCurrencyDollar,
  HiOutlineShoppingCart,
  HiCursorClick,
} from "react-icons/hi";

const navigationConfig = [
    {
      id: 'documentation',
      title: 'Documentation',
      subtitle: 'Everything you need to know about alpha',
      type: 'group',
      icon: 'heroicons-outline:home',
      translate: 'DOCUMENTATION',
      children : [
        {
          id: 'documentation.components',
          title: 'Components',
          type: 'collapse',
          icon: <HiOutlineShoppingCart/>,
          translate: 'COMPONENTS',
          children: [
            {
              id: 'components-buttons',
              title: 'Buttons',
              type: 'item',
              icon: <HiCursorClick/>,
              url: 'documentation/buttons',
              end: true,
            },
            
          ],
        },
      ]
    },
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
    
  ];
  
  export default navigationConfig;