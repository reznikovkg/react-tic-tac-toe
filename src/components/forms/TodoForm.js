import React from 'react';
import {Field , reduxForm} from 'redux-form';

import MyCustomInput from './../el/MyCustomInput';

import { Form, Grid, Segment, Header, Button } from 'semantic-ui-react';


const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required'
    } else if (values.title.length < 3) {
        errors.title = 'title should be longer 3'
    }
    if (!values.description) {
        errors.description = 'Required'
    } else if (values.description.length < 3) {
        errors.description = 'description should be longer 3'
    }
    return errors
};


class LoginForm extends React.Component {

    render() {

        const { handleSubmit } = this.props;

        return (
            <Grid centered columns={2} style={ { marginTop: '50px' } }>
                <Grid.Column>
                    <Segment color='blue'>
                        <Header>new todo</Header>

                        <Form onSubmit={handleSubmit}>
                            <Field
                                name="title"
                                component={MyCustomInput}
                                type="text"
                                label="title"
                                disabled={this.props.disabled}
                            />
                            <Field
                                name="description"
                                component={MyCustomInput}
                                type="text"
                                label="description"
                                disabled={this.props.disabled}
                            />
                            <div style={{color:'red'}}>{ this.props.message }</div>
                            <Button color='green' type='submit' disabled={this.props.disabled} loading={this.props.disabled}>Go</Button>
                        </Form>

                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }

}

export default reduxForm({
    form: 'todos',
    validate
})(LoginForm);

