import { MenuItem, TextField } from "@mui/material";

const CommonSelect = ({ value, eventChange, options, inputProps = {}, details }) => {

    return (
        <TextField
            {...details}
            value={value}
            onChange={eventChange}
            select
            InputProps={inputProps}
        >
            {
                options.map((item, index) => (
                    <MenuItem
                        key={index}
                        value={item.value}
                    >
                        {item.label}
                    </MenuItem>
                ))
            }
        </TextField>
    )
}

export default CommonSelect