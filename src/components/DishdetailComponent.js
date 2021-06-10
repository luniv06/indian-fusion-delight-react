import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class DishDetail extends Component{
    constructor(props){ 
        super(props);
        this.state={
        };
    }

    renderDish(dish) {
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

    renderComments(dishcomments) {
        if(dishcomments == null) {
            return(
                <div></div>
            )
        } 

            const comments = dishcomments.map(cmt =>  {
                return (
                    <li key={cmt.id}>
                        <p align="left"> {cmt.comment} </p>
                        <p align="left">-- {cmt.author} ,
                        {new Intl.DateTimeFormat('en-US', {
                            month: 'long',
                            day: '2-digit',
                            year: 'numeric'
                            }).format(new Date(cmt.date))} </p>
                    </li>
                )
            })

        return (
            <div className='col-12 col-md-5 m-1'>
                <h4 align="left"><strong> Comments </strong></h4>
                <ul class="list-unstyled">
                    {comments}
                </ul>
            </div>
        )
    }

    render() {
        const dish = this.props.dishdetail;
        if(dish != null)
        {
            return (
                <div className="row">
                    {this.renderDish(dish)}
                    {this.renderComments(dish.comments)}
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

}

export default DishDetail;