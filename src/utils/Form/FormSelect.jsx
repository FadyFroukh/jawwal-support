import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';

const FormSelect = ({field,placeholder,inputLabel,items}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">
        {inputLabel}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={placeholder}
        {...field}
      >
        {
            items.map((item,index)=>(
                <MenuItem value={item} key={index}>
                    <strong>
                        {item}
                    </strong>
                </MenuItem>
            ))
        }
      </Select>
    </FormControl>
  </Box>
  )
}

export default FormSelect