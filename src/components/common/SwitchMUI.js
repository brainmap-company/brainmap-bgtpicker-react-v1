import { styled as MUIStyled, Switch } from '@mui/material';

export default MUIStyled(Switch)({
    color: '#fff',
    width: 33,
    height: 19,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        top: 1,
        left: 2,
    },
    '& .MuiSwitch-thumb': {
        color: '#fff',
        width: 22,
        height: 17,
        borderRadius: 8,
        boxShadow: 'none',
    },
    '& .MuiSwitch-track': {
        borderRadius: 9.5,
        opacity: 1,
        backgroundColor: '#D1D7E2',
    },

    '& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
        opacity: '1',
        backgroundColor: '#5E748E',
        color: '#5E748E',
    },

    '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(8px)',
    },
});
