import TextInput from "../../components/TextInput";
import "../style/SignUpContainer.css";

const PersonalInformation = ({ style, handleChange }) => {
  return (
    <div className='form_input_PI'>
      <h3 style={{ marginLeft: "12px" }}>Proffesional Information</h3>
      <TextInput
        type='text'
        name='currjobtitle'
        placeholder='Current Job Title *'
        onChange={(event) => handleChange(event, "currjobtitle")}
        style={{ ...style }}
      />
      <TextInput
        type='text'
        name='industry'
        placeholder='Industry/Field of Work *'
        onChange={(event) => handleChange(event, "industry")}
        style={{ ...style }}
      />
      <TextInput
        type='number'
        name='yearsofexp'
        placeholder='Years of Experience *'
        onChange={(event) => handleChange(event, "yearsofexp")}
        style={{ ...style }}
      />
      <TextInput
        type='text'
        name='educationalbg'
        placeholder='Educational Background *'
        onChange={(event) => handleChange(event, "educationalbg")}
        style={{ ...style }}
      />
      <TextInput
        type='text'
        name='desiredjob'
        placeholder='Desired Job Title or Position *'
        onChange={(event) => handleChange(event, "desiredjob")}
        style={{ ...style }}
      />
    </div>
  );
};

export default PersonalInformation;
