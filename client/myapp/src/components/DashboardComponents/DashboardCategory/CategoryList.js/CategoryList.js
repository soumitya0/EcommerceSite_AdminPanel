import React, { Component, Fragment } from "react";

class CategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Headerdata: ["#", "CategoryName"],

      data: [
        { CategoryName: "Fruits" },
        { CategoryName: "Vegetables" },
        { CategoryName: "other" },
      ],
    };
  }

  TableHeaderdata() {
    return this.state.Headerdata.map((data, index) => <th>{data}</th>);
  }

  TableData() {
    return this.state.data.map((data, index) => {
      const { CategoryName } = data;
      return (
        <tr>
          <td>{index}</td>
          <td>{CategoryName}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Fragment>
        <div className="FormContainer marginTop-50">
          <div className="tableName text-700">
            <p>List of Category</p>
          </div>

          <table className="TableState">
            <tr>{this.TableHeaderdata()}</tr>

            <tbody>{this.TableData()}</tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

export default CategoryList;
