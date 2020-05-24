import React,{useState} from 'react';
import Form from "react-bootstrap/Form";


const Check = ({ checkConditions,categories}) =>{

    const [isChecked, setCheck] = useState([])

    /*
    checks if a category is checked or not if so return -1
    if there is no category checked then push the id to the state
    else uncheck the checked id and remove from state
     */

    const handleCheck = i => () =>{
        const existingCatId = isChecked.indexOf(i)
        const checkedID = [...isChecked ]

        if(existingCatId === -1){
            checkedID.push(i)
        }else{
            checkedID.splice(existingCatId, 1)
        }

        setCheck(checkedID)
        //send the List of array to ProductShop
        checkConditions(checkedID)

    }

    return categories.map((category,index) =>(
        <div  key={index}>
            <Form >
                <Form.Group id="formGridCheckbox"  >
                    <Form.Check onChange={handleCheck(category._id)} value={isChecked.indexOf(category._id=== -1)} type="checkbox" label={category.categoryName} />
                </Form.Group>
            </Form>

        </div>


    ))
}

export default Check;