import React, { Component, Fragment } from "react";
import "./DeliveryAddressFormStyle.css";

class DeliveryAddressForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reciverName: "",
      phoneNumber: "",
      houseNumber: "",
      Sector: "",
      fullAddress: "",
    };
  }

  onChangeHandler = (event) => {
    console.log(event.target);

    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });

    console.log(this.state);
  };

  demoMethod = () => {
    this.props.sendData(this.state);
  };

  render() {
    this.demoMethod();

    return (
      <Fragment>
        <div className="FormContainerAddressHeader">
          <p className="AddressHeaderText">Address Reciver</p>
        </div>
        <div className="FormContainerAddress">
          <form>
            <div className="FromGridAddress">
              <div>
                <p className="formLable">Reciver Name</p>
                <input
                  className="formInput"
                  type="text"
                  name="reciverName"
                  placeholder="Reciver Name"
                  onChange={this.onChangeHandler}
                  required
                />
              </div>

              <div>
                <p className="formLable"> Phone No</p>

                <input
                  className="formInput"
                  type="tel"
                  minLength="10"
                  maxLength="10"
                  name="phoneNumber"
                  placeholder="Reciver Phone Number"
                  onChange={this.onChangeHandler}
                  required
                />
              </div>

              <div>
                <p className="formLable"> House No</p>
                <input
                  className="formInput"
                  type="text"
                  name="houseNumber"
                  placeholder="Reciver Product Name"
                  onChange={this.onChangeHandler}
                  required
                />
              </div>

              <div>
                <p className="formLable"> Sector </p>

                <select
                  className="formInput"
                  name="Sector"
                  onChange={this.onChangeHandler}
                  required
                >
                  <option>Select Sector</option>
                  <option value="Sector-30">Sector-30</option>
                  <option value="Sector-31">Sector-31</option>
                  <option value="Sector-28">Sector-28</option>
                  <option value="Sector-29">Sector-29</option>
                </select>
              </div>

              <div className="FormFullAddress">
                <p className="formLable"> Full Address</p>
                <input
                  className="formInput"
                  type="text"
                  name="fullAddress"
                  placeholder="ex: HouseNo sector cityName "
                  onChange={this.onChangeHandler}
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default DeliveryAddressForm;
