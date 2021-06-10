import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class DishDetail extends Component{
    constructor(props){ 
        super(props);
        this.state={

        };
    }

    renderDish(dishdetail) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dishdetail.image} alt={dishdetail.name} />
                    <CardBody>
                        <CardTitle>{dishdetail.name}</CardTitle>
                        <CardText>{dishdetail.description}</CardText>
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
                        {new Intl.DateTimeFormat('en-US', 
                        { year: 'numeric', month: 'short', day: '2-digit'})
                        .format(new Date(Date.parse(cmt.date)))}</p>
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
        const dishdetail = this.props.dish;
        if(dishdetail != null)
        {
            return (
                <div className="row">
                    {this.renderDish(dishdetail)}
                    {this.renderComments(dishdetail.comments)}
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