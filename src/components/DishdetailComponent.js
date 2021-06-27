import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Row, Col, Label, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        const required = (val) => val && val.length;
        const minLength = (len) => (val) => !(val) || (val.length >= len);
        const maxLength = (len) => (val) => (val) && (val.length <= len);

        return (
            <div>
                <Button outline onClick={this.toggleModal}> <span className="fa fa-pen fa-lg"></span> Submit Comment </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Submit Comment </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}> Rating </Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option> 1 </option>
                                        <option> 2 </option>
                                        <option> 3 </option>
                                        <option> 4 </option>
                                        <option> 5 </option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={4}> Your Name </Label>
                                <Col md={12}>
                                    <Control.text model=".author" name="author" id="author"
                                        className="form-control" placeholder="Your Name"
                                        validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} />
                                    <Errors className="text-danger" model=".author" show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={4}> Comment </Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment"
                                        name="comment" rows="6" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={4}>
                                    <Button type="submit" color="primary" className="mt-3"> Submit </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderDish({ dish }) {
    return (
        <div className="col-12 col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg width="100%" top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        </div>
    );
}

function RenderComments({ comments, postComment, dishId }) {

    if (comments == null) {
        return (
            <div></div>
        )
    }
    //<Stagger in> 
    const comment = comments.map(cmt => {
        return (
            <Fade in>
            <li key={cmt.id}>
                <p align="left"> {cmt.comment} </p>
                <p align="left">-- {cmt.author} ,
                    {new Intl.DateTimeFormat('en-US',
                        { year: 'numeric', month: 'short', day: '2-digit' })
                        .format(new Date(Date.parse(cmt.date)))}</p>
            </li>
            </Fade>
        )
    })
    //</Stagger>

    return (
        <div className='col-12 col-md-5 m-1'>
            <h4 align="left"><strong> Comments </strong></h4>
            <ul class="list-unstyled">
                {comment}
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    )
}

const DishDetail = (props) => {

    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />

                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

export default DishDetail;