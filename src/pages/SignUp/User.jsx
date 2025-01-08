import TextInput from "../../components/shared/TextInput";
import "../style/SignUpContainer.css";

const User = ({ style, handleChange }) => {
  return (
    <div className="form_input_user">
      <h3 style={{ marginLeft: "12px" }}>User</h3>
      <TextInput
        type="text"
        name="firstname"
        placeholder="First Name"
        onChange={(event) => handleChange(event, "firstname")}
        style={{ ...style }}
      />
      <TextInput
        type="text"
        name="lastname"
        placeholder="Last Name"
        onChange={(event) => handleChange(event, "lastname")}
        style={{ ...style }}
      />
      <TextInput
        type="email"
        name="email"
        placeholder="Email *"
        onChange={(event) => handleChange(event, "email")}
        style={{ ...style }}
      />
      <TextInput
        type="number"
        name="phonenumber"
        placeholder="Phone Number"
        onChange={(event) => handleChange(event, "phonenumber")}
        style={{ ...style }}
      />
      <select
        style={{ ...style, width: "308px" }}
        name="role"
        id="role"
        onChange={(event) => handleChange(event, "type")}
      >
        <option style={{ height: "30px" }} value="Employee">
          Employee
        </option>
        <option value="Employer">Employer</option>
      </select>
    </div>
  );
};

export default User;
