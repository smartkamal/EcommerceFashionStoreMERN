import React from 'react'
import {API} from '../../Config'

const GetImage = ({product , url}) =>(
    <div className="image">
        <img
        src={`${API}/${url}/image/${product._id}`}
        alt={product.productName}
        className="mb-1"
        style={{maxHeight:"100%", maxWidth:"50%"}}

        />

    </div>
)

export default GetImage;