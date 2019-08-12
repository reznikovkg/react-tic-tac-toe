import React from 'react';

import { Form } from 'semantic-ui-react';

class MyCustomInput extends React.Component {
    render() {
        const {
            input,
            label,
            type,
            meta: { touched, error, warning }
        } = this.props;

        return (
            <Form.Field>
                <label>{ label }</label>
                <input {...input} disabled={this.props.disabled} type={type}/>
                <p style={{margin: '0px', color: 'red'}}>{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</p>
            </Form.Field>
        )
    }
}

export default MyCustomInput;