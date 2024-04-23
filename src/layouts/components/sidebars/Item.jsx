import { Link, useLocation } from 'react-router-dom';

const Item = ({ item, icons, setShowMenu }) => {
    const location = useLocation();
    // console.log(item)
    const isActive = (url) => {
    const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
        return location.pathname === normalizedUrl;
    }

    return (
        <li key={item.id} onClick={()=>setShowMenu(false)}>
            <Link
            to={item.url}
            className={`${isActive(item.url) ? 'bg-primary text-white' : ''} flex items-center gap-4 py-2 px-4 rounded-lg text-secondary-50 hover:bg-secondary-900 transition-colors`}
            
            >
            {icons[item.icon] && icons[item.icon]()}
            {item.title}
            </Link>
        </li>
    )
}

export default Item;
