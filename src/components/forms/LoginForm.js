import React from 'react';
import {Field , reduxForm} from 'redux-form';

import MyCustomInput from './../el/MyCustomInput';

import { Form, Grid, Segment, Header, Button } from 'semantic-ui-react';


const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length < 3) {
        errors.username = 'Username should be longer'
    }
    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 3) {
        errors.password = 'Password should be longer'
    }
    return errors
};


class LoginForm extends React.Component {

    render() {

        const { handleSubmit } = this.props;

        return (
            <Grid centered columns={2} style={ { marginTop: '100px' } }>
                <Grid.Column>
                    <Segment color='green'>
                        <Header>Login</Header>

                        <Form onSubmit={handleSubmit}>
                            <Field
                                name="username"
                                component={MyCustomInput}
                                type="text"
                                label="Username"
                                disabled={this.props.disabled}
                            />
                            <Field
                                name="password"
                                component={MyCustomInput}
                                type="password"
                                label="Password"
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
    form: 'login',
    validate
})(LoginForm);

