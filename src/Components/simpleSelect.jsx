import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SimpleSelect = (props) => {
    const classes = useStyles();
    const [algo, setAlgo] = React.useState('0');
    const [state, setState] = React.useState({
        pos: props.pos,
    });

    const handleChange = (event) => {
        setAlgo(event.target.value);
        props.onAlgoChanged(state.pos, event.target.value);
    };

    return (
        <div className="ml-2 mr-2">
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Algorithm</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={algo}
                    onChange={handleChange}
                >
                    {props.items.map((option, index) => (
                        <MenuItem key={index} value={index} >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SimpleSelect;