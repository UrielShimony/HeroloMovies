import React, {Component} from 'react';
import {DatePicker, Form, Input, Modal, Rate, Row, Select} from "antd";
import "antd/dist/antd.css";
import APILayer from "../APIUtils/APILayer";
import * as moment from 'moment';
import * as _ from "lodash";

const {Option} = Select;

class EditPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            movieGenreList: {},

        }
        this.genresOptions = APILayer.getGenreList().map((genre) => {
            return (<Option key={genre.id}>{genre.name}</Option>)
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const prevMovie = prevState.movie;
        const currentMovie = nextProps.movie;

        if (currentMovie && _.isEqual(prevMovie, prevMovie)) {
            const movie = nextProps.movie;
            const genres = movie.genre_ids.map(id => id.toString());
            return {
                movie: movie,
                movieGenreList: genres,
            }
        }

        return null
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {closeFunction, movieTitle} = this.props;
        const {movie} = this.state;
        return (
            <Modal visible={this.props.visible}
                   onCancel={closeFunction}
                   onText={'Save'}
                   onOk={this.saveEdit}
                   title={movieTitle}
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Form.Item label="Movie Title" value={movie.title}>
                            {getFieldDecorator('title', {
                                initialValue: movie.title,
                                rules: [
                                    {transform: this.mainpluateTitle},
                                    {required: true, message: 'please enter title'},
                                    {validator: this.isTitleExist,}],
                            })(<Input placeholder="please enter movie name"/>)}
                        </Form.Item>
                    </Row>
                    <Row gutter={16}>
                        <Form.Item label="Rate">
                            {getFieldDecorator('rate', {
                                initialValue: Math.round(movie.vote_average) / 2,
                            })(
                                <Rate allowHalf/>
                            )}
                        </Form.Item>
                    </Row>
                    <Row gutter={16}>

                        <Form.Item>
                            {getFieldDecorator('genre', {
                                initialValue: this.state.movieGenreList,
                                rules: [{required: true, message: 'please enter movie genre'}],
                            })(<Select
                                mode="multiple"
                                size='default'
                                placeholder="genre"
                                maxTagCount={3}
                                style={{width: '100%'}}
                            >
                                {this.genresOptions}
                            </Select>)}
                        </Form.Item>
                    </Row>
                    <Row gutter={16}>
                        <Form.Item label="Release Time">
                            {getFieldDecorator('dateTime', {
                                initialValue: moment(movie.release_date),
                                rules: [{required: true, message: 'Please choose the release time'}],
                            })(
                                <DatePicker
                                    style={{width: '100%'}}
                                    getPopupContainer={trigger => trigger.parentNode}
                                />
                            )}
                        </Form.Item>
                    </Row>
                </Form>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'right',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                    }}
                >
                </div>
            </Modal>
        )
    }

    isTitleExist = (rule, value, callback) => {
        if (value) {
            if (value.trim() === '') {
                callback(`Title must have Alphabeth characters`);
            }
            if (!APILayer.isTitleExist(value, this.state.movie.id)) {
                callback('This title is already exist');
            }
        }
        callback()
        // callback('Title required')
    }

    saveEdit = () => {
        this.props.form.validateFields((err, values) => {
            if (err) {
                //User will see the errors on the form
            } else {
                const genre_ids = _.map(values.genre, genre => Number(genre)).slice(0, 3);
                const relaesDate = values.dateTime.format("YYYY-MM-DD");
                const title = this.mainpluateTitle(values.title);
                let newMovie = this.props.movie;
                newMovie.title = title;
                newMovie.vote_average = values.rate * 2;
                newMovie.genre_ids = genre_ids;
                newMovie.release_date = relaesDate;

                this.props.saveEdit(newMovie);
                this.props.form.resetFields();
                this.props.closeFunction();
            }
        });
    }

    mainpluateTitle(title) {
        return title.toLowerCase()
            .replace(/[^a-z| ]/g, '')
            .replace(/\b[a-z](?=[a-z]{0})/g, (letter => {
                return letter.toUpperCase()
            }));
    }
}

export default Form.create()(EditPopUp);