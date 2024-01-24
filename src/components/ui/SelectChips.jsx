import { InputAdornment, MenuItem, TextField } from "@mui/material";

const SelectChips = (props) => {
    const { onChange, value, icon, chipsArr, label } = props;

    return (
        <TextField
            label={<p className='font-bold'>{label}</p>}
            variant="outlined"
            value={value}
            onChange={onChange}
            // onChange={e => handleChangePills(e, 1)}
            select
            size="small"
            SelectProps={{
                multiple: true,
                renderValue: (selected) => (
                    <div className="flex gap-2 overflow-hidden">
                        {
                            selected.map((value) => (
                                <div key={value} className="bg-primary2-50 text-sm text-neutral-800 border border-primary rounded-full px-2">{value}</div>
                            ))
                        }
                    </div>
                )
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        { icon }
                    </InputAdornment>
                ),
            }}
        >
            {
                chipsArr.map((item) => (
                    <MenuItem
                        key={item.id}
                        value={item.nombre}
                    >
                        {item.nombre}
                    </MenuItem>
                ))
            }
        </TextField>
    )
}

export default SelectChips