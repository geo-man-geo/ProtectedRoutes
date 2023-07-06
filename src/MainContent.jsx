import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

class MainContent extends Component {
  state = {
    pageTitle: "Account Holders",
    holders: [],
    file: null, // Add a file state
  };

  componentDidMount() {
    this.fetchAccountHolders();
  }

  fetchAccountHolders = () => {
    axios
      .get("http://localhost:3030/holders") // Replace with your API endpoint
      .then((response) => {
        this.setState({ holders: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this account holder?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:3030/account-holder/${id}`)
        .then(() => {
          console.log(`Deleted holder with id ${id}`);
          // After deletion, fetch the updated account holders
          this.fetchAccountHolders();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Deletion canceled by user");
    }
  };

  generatePDF = (holder) => {
    const doc = new jsPDF();

    // Add Heading
    doc.setFontSize(18);
    doc.text("Account Holder Report", 70, 10);

    // Add Date
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(`Date: ${currentDate}`, 70, 20);

    // Add Account Holder Details
    doc.setFontSize(12);
    doc.text(`Account Holder Name: ${holder.accountHolderName}`, 10, 40);
    doc.text(`Nominee Name: ${holder.nomineeName}`, 10, 50);
    doc.text(`Account ID: ${holder.accountId}`, 10, 60);
    doc.text(`Account Type: ${holder.bankAccountType}`, 10, 70);

    doc.save(`account-holder-${holder.accountId}.pdf`);
  };

  handleFileUpload = (accountId) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/pdf"; // Set the accepted file type if needed
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        // Send formData to the server using an HTTP request
        axios
          .post(`http://localhost:3030/bank/filesupload/${accountId}`, formData)
          .then((response) => {
            // Handle the response
          })
          .catch((error) => {
            // Handle errors
          });
      }
    };
    fileInput.click();
  };

  renderHolderRows = (holders) => {
    return holders.map((holder, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{holder.accountHolderName}</td>
        <td>{holder.nomineeName}</td>
        <td>{holder.accountId}</td>
        <td>{holder.bankAccountType}</td>
        <td>
          <span className="mr-2">
            <Link to={`/update-account-holder/${holder.accountId}`}>
              <button className="btn btn-primary">Edit</button>
            </Link>
          </span>
          <span>
            <button
              className="btn btn-danger"
              onClick={() => this.handleDelete(holder.accountId)}
            >
              Delete
            </button>
          </span>
          <span className="ml-2">
            <button
              className="btn btn-success"
              onClick={() => this.generatePDF(holder)}
            >
              Download
            </button>
          </span>
          <span className="ml-2">
            <button
              className="btn btn-primary"
              onClick={() => this.handleFileUpload(holder.accountId)}
            >
              Upload
            </button>
          </span>
        </td>
      </tr>
    ));
  };

  render() {
    const { holders } = this.state;

    return (
      <div className="container">
        <div className="row mb-4">
          <div className="col">
            <h4 className="text-center">{this.state.pageTitle}</h4>
          </div>
          <div className="col-auto mt-2">
            <Link to="/add-account-holder">
              <button className="btn btn-primary">Add Account Holders</button>
            </Link>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Account Holder Name</th>
              <th>Nominee Name</th>
              <th>Account ID</th>
              <th>Account Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderHolderRows(holders)}</tbody>
        </table>
      </div>
    );
  }
}

export default MainContent;
