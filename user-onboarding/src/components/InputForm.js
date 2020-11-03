import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function InputForm() {
return (
    <Form className="inputForm">
        <FormGroup>
        <Label for='name'>Name </Label>
        <Input type='text' name='name' placeholder='Full Name' id='name' />
        </FormGroup>
        <FormGroup>
        <Label for=''></Label>
        <Input type='' name='' placeholder='' id='' />
        </FormGroup>
    </Form>
)
}
export default InputForm