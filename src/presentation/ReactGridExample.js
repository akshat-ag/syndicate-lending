import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import LoanDetails from '../containers/LoanDetails';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import { RowDetailState } from '@devexpress/dx-react-grid';

import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    headerRow: {
        height: theme.spacing.unit * 3.9
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 0.7,
        overflowX: 'auto',
      }
  });
const RowDetail = ({ row }) => (
  <div>
      <LoanDetails loanNo= {row.RequisitionNo} />
    
  </div>
);
const TableRow = ({ row, classes, ...restProps }) => (
    <Table.Row
      {...restProps}
      // eslint-disable-next-line no-alert
      className = {classes.headerRow}
    />
  );
export const TableRowComp = withStyles(styles, { name: 'TableRowComp' })(TableRow);
class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
       expandedRowIds: []
    };

    this.changeExpandedDetails = expandedRowIds => this.setState({ expandedRowIds });
    // (e) => this.props.handleExpandClick(e,expandedRowIds)
  }

  render() {
    const columns = [
        { name: 'RequisitionNo', title: 'RequisitionNo' },
        { name: 'Amount', title: 'Amount' },
        { name: 'StartDate', title: 'StartDate' },
        { name: 'EndDate', title: 'Deadline' },
      ]
    const  rows = this.props.loanList;
    //const { rows, columns, expandedRowIds } = this.state;
    const {classes} = this.props;
    const expandedRowIds = this.state.expandedRowIds;
    return (
      <Paper className={classes.root}>
        <Grid
          rows={rows}
          columns={columns}
        >
          
          <Table />
          
          <TableHeaderRow rowComponent={TableRowComp}/>
          <RowDetailState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={this.changeExpandedDetails}
          />
          
          <TableRowDetail
            contentComponent={RowDetail}
          />
        </Grid>
      </Paper>
    );
  }
}
export default withStyles(styles)(Demo);