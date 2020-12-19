import { Dropdown } from "primereact/dropdown";
import React from "react";

class UserSelectDropdown extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Dropdown {...this.props} />;
  }
}
export default UserSelectDropdown;
