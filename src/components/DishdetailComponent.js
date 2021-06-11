import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function RenderDish({dish}) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
}

function RenderComments({comments}) {

    if (comments == null) {
        return (
            <div></div>
        )
    }

    const comment = comments.map(cmt => {
        return (
            <li key={cmt.id}>
                <p align="left"> {cmt.comment} </p>
                <p align="left">-- {cmt.author} ,
                    {new Intl.DateTimeFormat('en-US',
                    { year: 'numeric', month: 'short', day: '2-digit' })
                        .format(new Date(Date.parse(cmt.date)))}</p>
            </li>
        )
    })

    return (
        <div className='col-12 col-md-5 m-1'>
            <h4 align="left"><strong> Comments </strong></h4>
            <ul class="list-unstyled">
                {comment}
            </ul>
        </div>
    )
}

const DishDetail = (props) => {

    const dishdetail = props.dish;
    if(dishdetail != null)
    {
        return (
            <div className="row">
                <RenderDish dish = {dishdetail} />
                <RenderComments comments = {dishdetail.comments} /> 
            </div>
        )
    }
    else
    {
        return (
            <div></div>
        )
    }
}

export default DishDetail;