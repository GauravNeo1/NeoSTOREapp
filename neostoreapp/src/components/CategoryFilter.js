import React, { useState, useEffect } from 'react'
import { getCategories } from '../config/Myservice';



function RadioBox(props) {

    const [Value, setValue] = useState('0')

    const [categories, setCategories] = useState([])
    useEffect(() => {

        getCategories()
            .then(res => {
                setCategories(res.data);
            })
    }, [])

    console.log(categories)


    const handleChange = (event) => {
        setValue(event.target.value)
        props.handleFilters(event.target.value)
        console.log(event.target.value)
    }

    return (
        <div>

            {
                categories && categories.map((value, index) => {
                    return (
                        <div class="form-check" style={{ textAlign: "left", marginLeft: "5px" }}>
                            <div class="form-check form-check-inline" onChange={handleChange} value={Value} >
                                <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                    key={value._id}
                                    value={`${value._id}`}
                                />
                                <label class="form-check-label">{value.category_name}</label>
                            </div>
                            <br /></div>
                    )
                })
            }
        </div>
    )
}

export default RadioBox