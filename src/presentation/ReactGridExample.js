import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import LoanDetails from '../containers/LoanDetails';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Tooltip from '@material-ui/core/Tooltip';
import TimelineComponent from '../presentation/TimelineComponent.js';
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
        open: false,
        currIndex: '',
       expandedRowIds: []
    };

    this.changeExpandedDetails = expandedRowIds => this.setState({ expandedRowIds });
    // (e) => this.props.handleExpandClick(e,expandedRowIds)
  }
  addResetBtn = ({ index }) => {
    return (
      <Tooltip title="Click here to View History">
        <Button
            className="viewHistoryBtn"
            onClick={() => this.handleResetClick({ index: index })}
        >
           Pending
        </Button>
        </Tooltip>
    );
  };
  handleClose = () => {
    this.setState({open: false});
  }
  handleResetClick = ({ index }) => {
    this.setState({open: true, currIndex: index});
};
  getLoanList(loanList) {
    for(let i=0;i<loanList.length; i++) {
      loanList[i].Status = this.addResetBtn({ index: 0 });
    }
    return loanList;
  }
  render() {
    const columns = [
        { name: 'RequisitionNo', title: 'RequisitionNo' },
        { name: 'Amount', title: 'Amount' },
        { name: 'StartDate', title: 'StartDate' },
        { name: 'EndDate', title: 'Deadline' },
        { name: 'Status', title: 'Status'}
      ]
    const  rows = this.getLoanList(this.props.loanList);
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
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}>
            <TimelineComponent 
            loanNo = {this.props.loanList[this.state.currIndex] ? this.props.loanList[this.state.currIndex] : ''} />
          </Modal>
      </Paper>
    );
  }
}
export default withStyles(styles)(Demo);