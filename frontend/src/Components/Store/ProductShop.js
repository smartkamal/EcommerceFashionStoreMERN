import React,{useEffect,useState} from 'react';
import  ProductCard from '../ui/proCard'
import {getCategories} from '../../FrontEndAPIs/storeManagerApi'
import Row from "react-bootstrap/Row";
import Check from "./CheckBoxStore";
import {getCheckedResults} from '../../FrontEndAPIs/apiCore'
import Button from "react-bootstrap/Button";



const ProductShop= () =>{

    const [allCat, setAllCat] = useState([]);
    // eslint-disable-next-line
    const [error, setError] = useState([]);
    const [myConditions, setMyConditions] = useState({
        conditions:{category :[]}
    })
    // eslint-disable-next-line
    const [limit, setLimit] = useState(6);
    const [more, setMore] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [size,setSize] = useState(0);



    const load = () =>{
        getCategories().then(response =>{
                if(response.error){
                   setError(response.error)
                }
                else{
                    setAllCat(response);
                }
            }
        )
    }

    const checkConditions = (conditions, conditionBy) =>{
        const newConditions = {...myConditions}

        newConditions.conditions[conditionBy] = conditions


        loadResults(myConditions.conditions)
        setMyConditions(newConditions)
    }

    const loadResults = (newFilters) =>{
        console.log('new',newFilters)
        getCheckedResults(more,limit,newFilters).then(response =>{
            if(response.error){
                setError(response.error)
            }else{

                setFilteredResults(response.result);
                setSize(response.size)
                setMore(0);
            }
        })
    }


    useEffect(() =>{
        load();
        loadResults(more,limit,myConditions.conditions)
        // eslint-disable-next-line
    },[])


    const loadMoreProducts = () =>{

        let  morePro = more+limit;

        getCheckedResults(morePro,limit,myConditions.conditions).then(response =>{
            if(response.error){
                setError(response.error)
            }else{

                setFilteredResults([...filteredResults,...response.result]);
                setSize(response.size)
                setMore(morePro);
            }
        })
    }

    const loadMoreBtn= () =>{
        return(
            size> 0 && size>= limit && (
                <Button onClick={loadMoreProducts} className="mb-5 ml-3" variant="danger" >Load More</Button>
            )
        )
    }

    return (
      <div className="mt-lg-5 ml-5">
          <Row>
              <div className="col-2 mt-5">
                  <h4>Category Filter</h4>
                  <div style={{marginTop:40}}>
                      <Check  checkConditions={ conditions => checkConditions(conditions,'category')}  categories={allCat}/>
                  </div>

              </div>

              <div className="col-10 mt-5">
                 <h2 className="mb-3 ml-2">Products</h2>
                  <Row>
                      {filteredResults.map((product, index) =>(

                              <ProductCard key={index}  product={product}/>

                      ))}
                  </Row>
                  <br/>
                  {loadMoreBtn()}
              </div>
          </Row>
      </div>




    );
}

export default ProductShop