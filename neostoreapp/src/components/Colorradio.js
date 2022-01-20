import React, { useState, useEffect } from 'react'
import { getColors } from '../config/Myservice';

function CheckBox(props) {

    const [Checked, setChecked] = useState([])
    const [C, setC] = useState([])
    const [colors, setColors] = useState([])
    useEffect(() => {

        getColors()
            .then(res => {
                setColors(res.data);
            })
    }, [])

    console.log(colors)
    const handleToggle = (value) => {


        const currentIndex = Checked.indexOf(value._id);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value._id)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)

        console.log(newChecked)
        props.handleFilters(newChecked)
    }



    return (
        <div>
            {
                colors && colors.map((value, index) => {
                    return (
                        <div class="form-check" style={{ textAlign: "left", marginLeft: "30px" }}>
                            <input type="checkbox"
                                className="form-check-input"
                                checked={Checked.indexOf(value._id) === -1 ? false : true}
                                onChange={() => handleToggle(value)}
                            /><span>{value.color_name}</span> <br /></div>
                    )
                })
            }
        </div>
    )
}

export default CheckBox