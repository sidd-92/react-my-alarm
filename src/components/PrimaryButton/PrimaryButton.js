import React from "react";
import { Button } from "primereact/button";

class PrimaryButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }
  render() {
    return <Button {...this.props} label="Add Contact" iconPos="left" icon="pi pi-plus" className="w-full h-10 bg-buttonGradient" />;
  }
}

export default PrimaryButton;
