import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Loading } from '../Loading/Loading'
import { Product } from '../Product/Product'
export const Products = ({ products: { result, loading, error }, addProductCart }) => {



    return (

        <Container>
            <Row>

                {

                    loading || !result ? <Loading />
                        : result.map((product, index) => (
                            <Product key={index} product={product} addProductCart={addProductCart}/>
                        ))
                }


            </Row>



        </Container>

    )
}
