/* eslint-disable react/prop-types */

function CustomRadio(props) {
  function checkedOrNot() {
    if (props.updatePriority) {
      return props.editPriority === props.value;
    }
  }

  return (
    <input
      type="radio"
      className={`${props.class}`}
      id={`${props.value}`}
      name="priority"
      value={props.value}
      checked={checkedOrNot()}
      onChange={(e) =>
        props.setRadioValue
          ? props.setRadioValue(e.target.value)
          : props.updatePriority(e.target.value)
      }
    />
  );
}

export default CustomRadio;
