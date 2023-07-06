import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-responsive/js/dataTables.responsive.js";
import "datatables.net-dt/js/dataTables.dataTables.js";

const MainContentTemp = () => {
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const tableElement = tableRef.current;

    const fetchData = async () => {
      const response = await fetch("http://localhost:3030/holders");
      const jsonData = await response.json();
      setData(jsonData);
      initializeDataTable(jsonData); // Pass the fetched data to the initialization function
    };

    const initializeDataTable = (data) => {
      // Accept the data as a parameter
      if (!$.fn.DataTable.isDataTable(tableElement)) {
        dataTableRef.current = $(tableElement).DataTable({
          dom: "Bfrtip",
          buttons: ["copy", "csv", "pdf", "print"],
          responsive: true,
          paging: true,
          lengthMenu: [10, 25, 50, 75, 100],
          pageLength: 10,
          pagingType: "full_numbers",
          data: data,
          columns: [
            { data: "accountHolderName" },
            { data: "nomineeName" },
            { data: "accountId" },
            { data: "bankAccountType" },
          ],
        });
      }
    };

    fetchData();

    return () => {
      if ($.fn.DataTable.isDataTable(tableElement)) {
        dataTableRef.current.destroy();
        dataTableRef.current = null;
      }
    };
  }, []);

  return (
    <div className="container">
      <table
        ref={tableRef}
        className="display responsive"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>Account Holder Name</th>
            <th>Nominee Name</th>
            <th>Account ID</th>
            <th>Bank Account Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((holder, index) => (
            <tr key={index}>
              <td>{holder.accountHolderName}</td>
              <td>{holder.nomineeName}</td>
              <td>{holder.accountId}</td>
              <td>{holder.bankAccountType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainContentTemp;
