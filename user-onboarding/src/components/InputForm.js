import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import * as yup from "yup";

const ReviewSchema = yup.object().shape({
  name: yup.string().required("This is a required field.").min(5),
  email: yup
    .string()
    .email("Must be a valid email address.")
    .required("This is a required field"),
  password: yup
    .string()
    .min(9, "Password needs to be at least 9 characters.")
    .required("This is a required field."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("This is a required field."),
  terms: yup.boolean().oneOf([true], "Terms of Service need to be agreed to."),
});

function InputForm() {
  //States//
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectColor: "",
    terms: false,
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [formValues, setFormValues] = useState("");
  const [errorState, setErrorState] = useState("");
  const [users, setUsers] = useState([]);
  //To disable the submit button:
  useEffect(() => {
    ReviewSchema.isValid(formState).then((valid) => {
      setSubmitDisabled(!valid);
    });
  }, [formState]);
  //for all yup validation:
  const validate = (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(ReviewSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: "",
        });
      });
  };
  const onChange = (e) => {
    e.persist();
    validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };
  //to put the new user on our Users page.
  const addNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((response) => {
        setUsers([response.data, ...users]);
      })
      .catch((error) => {
        alert("There was an issue", error);
      })
      .finally(() => {
        setFormValues();
      });
  };
  return (
    <Form className="inputForm">
      <FormGroup>
        <Label for="name">Name </Label>
        <br />
        <Input
          type="text"
          name="name"
          placeholder="Full Name"
          id="name"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email </Label>
        <br />
        <Input
          type="email"
          name="email"
          placeholder="email@email.com"
          id="email"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password </Label>
        <br />
        <Input type="password" name="password" id="password" required />
      </FormGroup>
      <FormGroup>
        <Label for="confirmPassword">Confirm Password </Label>
        <br />
        <Input type="password" name="password" id="confirmPassword" required />
      </FormGroup>

      <FormGroup>
        <Label for="selectColor">
          What is your favorite color of the options below?
        </Label>
        <br />
        <Input
          type="select"
          name="select"
          id="selectColor"
          value="💚 Green"
          required
        >
          <option>🖤 Black</option>
          <option>💙 Blue</option>
          <option>💚 Green</option>
          <option>💕 Red</option>
          <option>💛 Yellow</option>
        </Input>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" required /> I agree to{" "}
          <a href="./InputForm.js">Terms of Services</a>
        </Label>
      </FormGroup>
      <FormGroup>
        <Button>Submit</Button>
      </FormGroup>
    </Form>
  );
}
export default InputForm;
