import { useEffect } from "react";
import LoadingComponent from "../../app/Layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/Store/ConfigureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";




export default function Catalog(){
    const products = useAppSelector(productSelectors.selectAll);  
    const dispatch = useAppDispatch();
    const {productsLoaded, status} = useAppSelector(state => state.catalog);
  useEffect(() => {
    if(!productsLoaded) dispatch(fetchProductsAsync());

  }, [productsLoaded, dispatch])
  if(status.includes('pending')) return <LoadingComponent message="Loading Products..." />
    return (
        <>
            <ProductList products={products} / >
        </> 
    )
}