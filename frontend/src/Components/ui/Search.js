import React,{useEffect,useState} from 'react';
import {getCategories}from '../../FrontEndAPIs/storeManagerApi'
import {itemList}from '../../FrontEndAPIs/apiCore'
import {Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import ProductCard from "./proCard";


const SearchComp = () =>{
    // state initialized
    const [values, setValues] = useState({
        aCategory:'',
        allCategories : [],
        searchVal:'',
        resultData:[],
        didSearch:false
    })
    // retrieve the values from state
    const {aCategory,allCategories,searchVal,resultData,didSearch} = values

    //retrieve the categories and set the allCategories with retrieved data
    const getAllCategories = () =>{
        getCategories().then(res =>{
            if(res.error){
                console.log(res.error)
            }else{
                setValues({...res,allCategories: res})
            }
        })
    }

    //on componentdidmount run the below method and populates state
    useEffect(() =>{
        getAllCategories();
    },[])

    //if user start typing or selects a category pick that change
    //function returning a function
    const handleChange = (val) => e =>{
        setValues({...values,[val]:e.target.value, didSearch: false})


    }

    //when form is submitted
    const searchValue = (e) =>{

        e.preventDefault()
        retrieveData();
    }

    //method to pass the query and retrieve data
    const retrieveData = () =>{
        if(!didSearch){
            itemList({searchVal: searchVal || undefined, aCategory: aCategory})
                .then(response =>{
                    if(response.error){
                        console.log(response.error)
                    }else{
                        setValues({...values, resultData:response, didSearch: true})
                    }
                })
        }
    }

    const displaySearched = (resultData = []) =>{

        return(
            <div>
                <h2 className="mt-4 mb-5">
                    {informUser(didSearch,resultData)}
                </h2>
                <Row>
                    {resultData.map((product ,index) =>(
                        <ProductCard key={index} product={product}/>
                    ))}
                </Row>
            </div>

        )
    }

    const informUser = (didSearch, resultData) =>{
        if(didSearch && resultData.length > 0 && resultData.length < 2){
            return `Found ${resultData.length} Product`
        }
        if(didSearch && resultData.length > 1){
            return `Found ${resultData.length} Products`
        }
        if(didSearch && resultData.length < 1){
            return `No Products Found`
        }

    }

const searchForm = () =>(
    <Form inline onSubmit={searchValue}>
        <span className="input-group-text rounded-top" style={{ backgroundColor:'#eceff1', padding:12}}>
            <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                     <FormControl type="text" placeholder="All Your Fashion Needs Under One Roof" className="mr-2" style={{height:40, width:400}} onChange={handleChange('searchVal')} />
                     <Button className="text-light bg-dark rounded " type="submit">Search</Button>
                </div>

            </div>

        </span>

    </Form>
);

    return(

      <div>
          <div className="d-flex justify-content-center">
              <div className=" mb-3">{searchForm()}</div>
          </div>
          <div className='container-fluid mb-3'>
              {displaySearched(resultData)}
          </div>
      </div>
    )
}


export default SearchComp;
