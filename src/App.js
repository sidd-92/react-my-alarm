import React from "react";
import SearchTextBox from "./components/SearchTextBox";
import PrimaryButton from "./components/PrimaryButton";
import { Checkbox } from "primereact/checkbox";
import UserSelectDropdown from "./components/UserSelectDropdown";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userInfo: {}, contacts: [], selectedUsers: {}, viewUser: {} };
    this.renderContacts = this.renderContacts.bind(this);
    this.renderContactInfoCard = this.renderContactInfoCard.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelectedContact = this.handleSelectedContact.bind(this);
  }

  handleSelectedContact(e, index) {
    let selectedUsers = { ...this.state.selectedUsers };
    if (index in this.state.selectedUsers) {
      delete selectedUsers[index];
    } else {
      selectedUsers[index] = true;
    }
    this.setState({ selectedUsers });
  }

  renderContacts() {
    return this.state.contacts.length > 0
      ? this.state.contacts.map((contact, index) => (
          <div
            className="flex items-center hover:bg-gray-100 text-black p-4"
            onClick={() => {
              this.setState({ viewUser: { ...contact } });
            }}
          >
            <div className="w-12">
              <Checkbox
                onChange={(e) => {
                  this.handleSelectedContact(e, index);
                }}
                checked={index in this.state.selectedUsers}
              ></Checkbox>
            </div>
            <div className="w-4/5">
              <div className="w-full grid grid-cols-12 items-center">
                <div className="w-10 h-10 capitalize rounded-full bg-green-600 text-center text-white flex justify-center items-center">
                  {contact.firstname.charAt(0)}
                  {contact.lastname.charAt(0)}
                </div>
                <div className="col-span-11 ml-6">
                  <div className="flex flex-col items-start ml-2">
                    <div className="font-bold break-words">
                      {contact.firstname} {contact.lastname}
                    </div>
                    <div className="font-thin text-xs truncate">{contact.email}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/5 font-bold truncate">{contact.company}</div>
          </div>
        ))
      : "";
  }

  renderContactInfoCard() {
    let viewUser = { ...this.state.viewUser };
    return viewUser.firstname && viewUser.lastname ? (
      <div className="bg-gray-300 p-6 lg:ml-10">
        <div className="text-center text-sm w-16 bg-white rounded-md transition duration-200 hover:bg-indigo-500 hover:text-white cursor-pointer">
          <i className="pi pi-comments" style={{ fontSize: "0.875rem" }}></i> Chat
        </div>
        <div className="flex flex-col items-center ">
          <div className="capitalize text-2xl w-24 h-24 rounded-full bg-green-600 text-center text-white flex justify-center items-center">
            {viewUser.firstname && viewUser.firstname.charAt(0)}
            {viewUser.lastname && viewUser.lastname.charAt(0)}
          </div>
          <div className="text-center text-black flex justify-center items-center font-bold text-lg xxl:text-2xl py-2 break-all">
            {viewUser.firstname} {viewUser.lastname}
          </div>
          <div className="mt-6">
            <div className="w-full grid grid-cols-3">
              <div>Full Name</div>
              <div className="col-span-2 break-all">
                {viewUser.firstname} {viewUser.lastname}
              </div>
            </div>
            <div className="w-full grid grid-cols-3 mt-4">
              <div>Email</div>
              <div className="col-span-2 break-all">{viewUser.email}</div>
            </div>
            <div className="w-full grid grid-cols-3 mt-4">
              <div>Phone</div>
              <div className="col-span-2 break-all">{viewUser.phone || "-"}</div>
            </div>
            <div className="w-full grid grid-cols-3 mt-4">
              <div>Company</div>
              <div className="col-span-2 break-all">{viewUser.company}</div>
            </div>
            <div className="w-full grid grid-cols-3 mt-4">
              <div>Address</div>
              <div className="col-span-2 break-all">{viewUser.address}</div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  }

  handleClick() {
    if (
      this.state.userInfo &&
      this.state.userInfo.firstname &&
      this.state.userInfo.lastname &&
      this.state.userInfo.email &&
      this.state.userInfo.company &&
      this.state.userInfo.address
    ) {
      let contactInfo = Object.assign({}, this.state.userInfo);
      this.setState({ contacts: [...this.state.contacts, contactInfo], errorMessage: "", displayBasic: false }, () => {
        this.setState({ userInfo: {} });
      });
    } else {
      this.setState({ errorMessage: "Please Fill The Required(*) Fields" });
    }
  }
  handleFormInput(e, field) {
    this.setState({ userInfo: { ...this.state.userInfo, [field]: e.target.value } });
  }
  customDropdownTemplate(option) {
    return <div className="truncate">{option.firstname}</div>;
  }

  render() {
    return (
      <React.Fragment>
        <Dialog
          header="Add A Contact"
          visible={this.state.displayBasic}
          className="w-3/4 xxl:w-2/5"
          onHide={() => {
            this.setState({ displayBasic: false });
          }}
        >
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="firstname1">Firstname*</label>
              <InputText value={this.state.userInfo && this.state.userInfo.firstname} onChange={(e) => this.handleFormInput(e, "firstname")} id="firstname1" type="text" />
            </div>
            <div className="p-field">
              <label htmlFor="lastname1">Lastname*</label>
              <InputText value={this.state.userInfo && this.state.userInfo.lastname} onChange={(e) => this.handleFormInput(e, "lastname")} id="lastname1" type="text" />
            </div>
            <div className="p-field">
              <label htmlFor="email">Email*</label>
              <InputText value={this.state.userInfo && this.state.userInfo.email} onChange={(e) => this.handleFormInput(e, "email")} id="email" type="email" />
            </div>
            <div className="p-field">
              <label htmlFor="company">Company*</label>
              <InputText value={this.state.userInfo && this.state.userInfo.company} onChange={(e) => this.handleFormInput(e, "company")} id="company" type="text" />
            </div>
            <div className="p-field">
              <label htmlFor="company">Address*</label>
              <InputTextarea autoResize rows={5} cols={30} value={this.state.userInfo && this.state.userInfo.address} onChange={(e) => this.handleFormInput(e, "address")} />
            </div>
            <div className="p-field">
              <Button label="Add Contact" className="bg-buttonGradient" onClick={this.handleClick} />
              <div className="font-bold text-red-600 h-1 text-center">{this.state.errorMessage}</div>
            </div>
          </div>
        </Dialog>
        <nav class="absolute w-full font-sans bg-white text-center flex items-center justify-between overflow-hidden shadow-md mb-2 h-12 px-6 z-0">
          <i className="pi pi-search ml-16" style={{ fontSize: "21px" }}></i>

          <ul class="text-sm text-gray-700 list-none p-0 flex items-center">
            <div className="w-48">
              <UserSelectDropdown
                disabled={this.state.contacts.length === 0}
                value={this.state.selectedContact}
                options={this.state.contacts}
                itemTemplate={(value) => this.customDropdownTemplate(value)}
                panelClassName="w-48"
                panelStyle={{ width: "200px" }}
                className="border-0 placeholder-black"
                appendTo={document.body}
                optionLabel="firstname"
                onChange={(e) => {
                  this.setState({ selectedContact: e.value });
                }}
                placeholder="Select a Contact"
              />
            </div>
          </ul>
        </nav>
        <div class="sidenav z-10 bg-buttonGradient flex flex-col justify-start items-center text-white">
          <i className="pi pi-bars mb-16"></i>
          <i className="pi pi-home mb-8"></i>
          <i className="pi pi-user mb-8"></i>
          <i className="pi pi-briefcase mb-8"></i>
          <i className="pi pi-shopping-cart mb-8"></i>
          <i className="pi pi-sitemap mb-8"></i>
          <i className="pi pi-money-bill mb-8"></i>
          <i className="pi pi-cog mb-8"></i>
          <i className="pi pi-power-off mb-8"></i>
        </div>

        <div className="bg-white pt-16 ml-16 pl-8 pr-10 mb-16">
          <div className="text-2xl font-bold">Contacts</div>
          <div className="w-full flex items-center flex-wrap my-6">
            <div className="w-full mt-6 md:mt-0 md:w-2/6">
              <SearchTextBox />
            </div>
            <div className="w-full mt-2 md:mt-0 md:w-auto md:ml-6">
              <PrimaryButton
                onClick={() => {
                  this.setState({ displayBasic: true });
                }}
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-1 row-gap-8 md:row-gap-0 lg:grid-cols-6">
            <div className={this.state.viewUser && this.state.viewUser.firstname ? "col-span-4" : "col-span-6"}>
              <div className="flex flex-col">
                <div className="flex items-center bg-gray-200 text-black p-4">
                  <div className="w-12">
                    <i className="pi pi-plus"></i>
                  </div>
                  <div className="w-4/5">Basic Info</div>
                  <div className="w-1/5">Company</div>
                </div>
                {this.renderContacts()}
              </div>
            </div>
            <div className="col-span-2">{this.renderContactInfoCard()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
