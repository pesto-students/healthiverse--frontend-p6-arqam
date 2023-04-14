import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";

function StripePayment() {
    const [product, setProduct] = useState({
        name: "Go FullStack with KnowledgeHut",
        price: 1000,
        productOwner: "KnowledgeHut",
        description:
            "This beginner-friendly Full-Stack Web Development Course is offered online in blended learning mode, and also in an on-demand self-paced format.",
        quantity: 1,
    });

    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51MwgmMSEwiVRPen9PC9C3ZonqcXvldGrhFxX1kBR2jYKMaqTiafcLOVp9UiLcskYz6J9WAWyw6N0UiFkUWkXZHP600Y2wW7ncD");
        const response = await axios.post(
            "http://localhost:4000/api/stripe/pay",
            { product: product }
        );
        const session = await response.data;
        const result = stripe.redirectToCheckout({
            sessionId: session.id,
        });
        if (result.error) {
            console.log(result.error);
        }
    };

    return (

        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                sx={{ height: 140 }}
                image="https://images.pexels.com/photos/12428359/pexels-photo-12428359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={makePayment}>
                    Buy Now for {product.price}
                </Button>

            </CardActions>
        </Card>


    );
}
export default StripePayment; 