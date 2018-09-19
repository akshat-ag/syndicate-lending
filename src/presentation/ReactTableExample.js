import React from "react";
import { render } from "react-dom";


// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class ReactTablee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.loanList
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
                  Header: "RequisitionNo",
                  accessor: "RequisitionNo"
                },
                {
                  Header: "Amount",
                  accessor: "Amount",
                
                },{
                  Header: "StartDate",
                  accessor: "StartDate",
                
                },
                {
                  Header: "EndDate",
                  accessor: "EndDate",
                
                }, {
                  expander: true,
                  Header: () => <strong>More</strong>,
                  Expander: ({ isExpanded, ...rest }) =>
                    <div>
                      {isExpanded
                        ? <span>&#x2299;</span>
                        : <span>&#x2295;</span>}
                    </div>,
                  style: {
                    cursor: "pointer",
                    fontSize: 25,
                    padding: "0",
                    textAlign: "center",
                    userSelect: "none"
                  }
                }
              ]
            }
           
            
            showPagination= {false}
            loading = {false}
            className="-striped -highlight"
            minRows = {0}
          SubComponent={() => <div style={{padding: '10px'}}>Hello</div>}
        />
        <br />
      
      </div>
    );
  }
}


