import React from 'react'
import { Col, Card, Button } from 'react-bootstrap'

import './Product.scss';

export const Product = ({ product, addProductCart }) => {


    return (

        <Col xs={3} className='product'>

            <Card>
                <Card.Img variant='top' src={product.image} />
                <Card.Body>

                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>{product.price}$</Card.Text>

                    <Button onClick={()=> addProductCart(product.id, product.title)}> Añadir al carrito</Button>
                </Card.Body>

            </Card>



        </Col>
    )
}
