import React from 'react';

const SimpleSelect = (props) => {
    const { label, items, pos, onValueChanged } = props;
    const [value, setValue] = React.useState('0');

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setValue(selectedValue);
        onValueChanged(pos, selectedValue);
    };

    return (
            <select value={value}
                onChange={handleChange}>
                <option disabled>
                    Select {label}
                </option>
                {items.map((option, index) => (
                    <option key={index} value={index}>
                        {option}
                    </option>
                ))}
            </select>
    );
}

export default SimpleSelect;
