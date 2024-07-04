import styled from "styled-components";

// Sign up section of the page.
const SignUp = ({
  formData,
  handleChangeForm,
  blankInputSU,
  handleSignUp,
  signUpMessage,
  btnTextSignup,
}) => {
  return (
    // Fills up info from user to be used when making a shipment. 
    <SUContainer>
      <Div>
        <form className="form" onSubmit={handleSignUp} />
        <h2 style={{ textDecoration: "underline" }}>Sign Up</h2>
        <p>
          Create an account to take advantage of all the benefits we have to
          offer!
        </p>
        <br />
        <br />
        <Label>First Name: </Label>
        <br />
        <input
          className="input-field"
          type="text"
          name="fname"
          value={formData.fname}
          onChange={handleChangeForm}
          placeholder="E.g. John"
          required
        />
        <br />
        <br />

        <Label>Last Name: </Label>
        <br />
        <input
          className="input-field"
          type="text"
          name="lname"
          value={formData.lname}
          onChange={handleChangeForm}
          placeholder="E.g. Doe"
          required
        />
        <br />
        <br />

        <Label>Email Address: </Label>
        <br />
        <input
          className="input-field"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChangeForm}
          placeholder="E.g. john.doe@email.com"
          required
        />
        <br />
        <br />

        <Label>Phone Number (Optional): </Label>
        <br />
        <input
          className="input-field"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChangeForm}
          placeholder="E.g. (123) 456-789"
        />
        <br />
        <br />

        <Label>Address: </Label>
        <br />
        <input
          className="input-field"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChangeForm}
          placeholder="E.g. 123 Main St"
        />
        <br />
        <br />

        <Label>City: </Label>
        <br />
        <input
          className="input-field"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChangeForm}
          placeholder="E.g. New York"
        />
        <br />
        <br />

        <Label>Province: </Label>
        <br />
        <input
          className="input-field"
          type="text"
          name="province"
          value={formData.province}
          onChange={handleChangeForm}
          placeholder="E.g. NY"
        />
        <br />
        <br />

        <Label>Postcode: </Label>
        <br />
        <input
          className="input-field"
          type="text"
          name="postcode"
          value={formData.postcode}
          onChange={handleChangeForm}
          placeholder="E.g. 10001"
        />
        <br />
        <br />

        <Label>Country: </Label>
        <br />
        <input
          className="input-field"
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChangeForm}
          placeholder="E.g. USA"
        />
        <br />
        <br />

        <Label>Password: </Label>
        <br />
        <input
          className="input-field"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChangeForm}
          required
        />
        <br />
        <br />

        <Label>Confirm Password: </Label>
        <br />
        <input
          className="input-field"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChangeForm}
          required
        />
        <br />
        <br />

        <button className="website-btn" type="submit" disabled={blankInputSU} onClick={handleSignUp}>
          {btnTextSignup}
        </button>
        <br />
        <p>{signUpMessage}</p>
      </Div>
    </SUContainer>
  );
};

export default SignUp;

const SUContainer = styled.div`
  padding: 100px 0;
  text-align: center;
`;

const Label = styled.label`
  font-weight: bold;
  padding: 0 0 10px 0;
  font-size: large;
`;

const Div = styled.div`
  background-color: #e5e1d6;
  outline-style: solid;
  outline-color: black;
  border-radius: 10px;
  padding: 50px;
  margin: 0 50px 0;

  @media (max-width: 500px) {
    padding: 20px;
    margin: 0 55px 0;
  }
`;
