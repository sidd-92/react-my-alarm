import React from "react";
import { InputText } from "primereact/inputtext";

class SearchTextBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }
  render() {
    return (
      <span className="w-full p-input-icon-right">
        <i className="pi pi-search" />
        <InputText
          className="w-full rounded-full h-10 bg-gray-100 focus:bg-white"
          value={this.state.value3}
          onChange={(e) => this.setState({ value3: e.target.value })}
          placeholder="Search"
        />
      </span>
    );
  }
}

export default SearchTextBox;
