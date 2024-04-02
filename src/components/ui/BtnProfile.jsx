import React from "react";
import { Menu, MenuItem } from "@mui/material"

const BtnProfile = ({
    showUserLogged = true,
    nombre,
    options = [],
    img,
    alt,
    expandIcon = <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 15.375l-6-6l1.4-1.4l4.6 4.6l4.6-4.6l1.4 1.4l-6 6Z" /></svg>
}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEventItem = (eventOpt) => {
        handleClose();
        eventOpt();
    };

    return (
        <>
            <button
                className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-secondary-100 transition-all"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img src={img} alt={alt} className="rounded-full" width={30} height={30} />
                <p className="font-bold text-sm text-secondary-150">{nombre}</p>
                {expandIcon}
            </button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={null}>
                    <div className="w-full flex flex-col items-center justify-center gap-1 ">
                        <img src={img} alt={alt} className="rounded-full" width={40} height={40} />
                        <p className="font-bold text-sm text-secondary-150">{nombre}</p>
                    </div>
                </MenuItem>
                <hr className="mb-1" />
                {
                    options.map((opt, index) => (<MenuItem key={index} onClick={() => handleEventItem(opt.event)}>{opt.label}</MenuItem>))
                }
            </Menu>
        </>
    )
}

export default BtnProfile