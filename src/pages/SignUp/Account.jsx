import TextInput from "../../components/shared/TextInput";
import "../style/SignUpContainer.css";

const Account = ({ style, handleChange }) => {
  return (
    <div className="form_input_account">
      <h3 style={{ marginLeft: "12px" }}>Account</h3>
      <TextInput
        type="text"
        name="username"
        placeholder="Username *"
        onChange={(event) => handleChange(event, "username")}
        style={{ ...style }}
      />
      <TextInput
        type="password"
        name="password"
        placeholder="Password *"
        onChange={(event) => handleChange(event, "password")}
        style={{ ...style }}
      />
      <TextInput
        type="password"
        name="confirmpassword"
        placeholder="Confirm Password *"
        onChange={(event) => handleChange(event, "confirmpassword")}
        style={{ ...style }}
      />
    </div>
  );
};

export default Account;
