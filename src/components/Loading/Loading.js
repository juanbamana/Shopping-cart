import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

import './Loading.scss';

export const Loading = () => {
    return (
        <div className='loading'>
            <Spinner animation="border" role="status">
            </Spinner>
            <h4>Loading....</h4>


        </div>)
}
