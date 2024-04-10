import React, { useContext } from 'react';
import { AuthContext } from '../../../context/auth';
import Item from './Item';
import Group from './Group';
import Collapse from './Collapse';

const SubMenu = ({ item, icons,setShowMenu }) => {
    const { user } = useContext(AuthContext);
    const { permissions = [] } = user || [];

    if (!item || !item.type) {
        return null;
    }

    switch (item.type) {
        case "group":
            return (
            <Group item={item}>
                {item.children && item.children.map(subitem => (
                <SubMenu key={subitem.id} item={subitem} icons={icons} setShowMenu={setShowMenu}/>
                ))}
            </Group>
            );
        case "collapse":
            return (
            <Collapse item={item} icons={icons}>
                {item.children && item.children.map(subitem => (
                <SubMenu key={subitem.id} item={subitem} icons={icons} setShowMenu={setShowMenu}/>
                ))}
            </Collapse>
            );
        default:
            const menu = permissions.includes(item.url) ? <Item item={item} icons={icons} setShowMenu={setShowMenu} /> : null;
            return menu;
    }
}

export default SubMenu;
