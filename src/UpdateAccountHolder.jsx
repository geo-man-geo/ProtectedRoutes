import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const UpdateAccountHoldercomp = () => {
  const { accountId } = useParams();
  const [accountHolder, setAccountHolder] = useState({});

  useEffect(() => {
    fetchAccountHolder(accountId);
  }, [accountId]);

  const fetchAccountHolder = (accountId) => {
    axios
      .get(`http://localhost:3001/account-holder/${accountId}`)
      .then((response) => {
        setAccountHolder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateAccountHolder = (e) => {
    e.preventDefault(); // Prevent the form from submitting

    axios
      .put(`http://localhost:3001/account-holder`, {
        accountHolderName: accountHolder.accountHolderName,
        nomineeName: accountHolder.nomineeName,
        bankAccountType: accountHolder.bankAccountType,
        accountId: accountId,
      })
      .then((response) => {
        // Handle successful update
        console.log("Account holder updated:", response.data);
      })

      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", marginTop: "-20vh" }}
    >
      <div className="col-lg-9">
        <h2 className="m-1 p-2 text-center">Update Account Holder Details</h2>
        <div className="p-1">
          <form onSubmit={updateAccountHolder}>
            <div className="form-group form-row justify-content-center">
              <input
                type="text"
                className="form-control col-lg-4  placeholder-transparent text-center"
                value={accountHolder.accountHolderName || ""}
                onChange={(e) =>
                  setAccountHolder((prevAccountHolder) => ({
                    ...prevAccountHolder,
                    accountHolderName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group form-row justify-content-center">
              <input
                type="text"
                className="form-control col-lg-4  placeholder-transparent text-center"
                value={accountHolder.nomineeName || ""}
                onChange={(e) =>
                  setAccountHolder((prevAccountHolder) => ({
                    ...prevAccountHolder,
                    nomineeName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group form-row justify-content-center">
              <input
                type="text"
                className="form-control col-lg-4  placeholder-transparent text-center"
                placeholder={accountId}
                value={accountHolder.accountId || ""}
                onChange={(e) =>
                  setAccountHolder((prevAccountHolder) => ({
                    ...prevAccountHolder,
                    accountId: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group form-row justify-content-center">
              <input
                type="text"
                className="form-control col-lg-4  placeholder-transparent text-center"
                value={accountHolder.bankAccountType || ""}
                onChange={(e) =>
                  setAccountHolder((prevAccountHolder) => ({
                    ...prevAccountHolder,
                    bankAccountType: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group form-row justify-content-center">
              <button
                type="submit"
                className="btn btn-primary m-1 align-items-center"
              >
                Update
              </button>
            </div>

            <div className="form-group form-row justify-content-center">
              <Link to="/maincontent">
                <button
                  type="submit"
                  className="btn btn-primary m-1 align-items-center"
                >
                  Back to the maincontent
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAccountHoldercomp;
