import { LoadingButton } from "@mui/lab";
import {  Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/Api/agent";
import { Product } from "../../app/Models/Products";
import { useAppDispatch, useAppSelector } from "../../app/Store/ConfigureStore";
import { addBasketItemAsync, setBasket } from "../Basket/basketSlice";


interface Props{
    product:Product;
}
export default function ProductCard({product}:Props){

    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
   
    return (
        <Card>
            <CardHeader 
                avatar={
                    <Avatar sx={{bgcolor:'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name }
                titleTypographyProps={{
                    sx:{fontWeight:'bold', color:'primary.main'}
                }}
            
            />
          <CardMedia
            sx={{heigth:140,backgroundSize:'contain', bgcolor:'primary.light'}}
            component="img"
            title={product.name}
            height="140"
            image={product.pictureUrl}
          />
          <CardContent>
            <Typography gutterBottom color='secondary' variant="h5">
                ${(product.price/100).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {product.brand} / {product.type}
            </Typography>
          </CardContent>
          <CardActions>
            <LoadingButton 
                loading={status.includes('pendingAddItem' + product.id)} 
                onClick={()=>dispatch(addBasketItemAsync(({ProductId:product.id})))} 
                size="small">Add to Cart</LoadingButton>
            <Button component={Link } to={`/catalog/${product.id}`} size="small">View</Button>
          </CardActions>
        </Card>
      );
}