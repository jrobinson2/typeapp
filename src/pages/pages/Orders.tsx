import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { Helmet } from "react-helmet";

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Checkbox,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Link,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";

import { green, orange, red } from "@material-ui/core/colors";

import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@material-ui/icons";

import { spacing, SpacingProps } from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

interface ChipPropstype extends SpacingProps {
  shipped?: boolean;
  processing?: boolean;
  cancelled?: boolean;
}
const Chip = styled(MuiChip)<ChipPropstype>`
  ${spacing};

  background: ${(props) => props.shipped && green[500]};
  background: ${(props) => props.processing && orange[700]};
  background: ${(props) => props.cancelled && red[500]};
  color: ${(props) => props.theme.palette.common.white};
`;

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

function createData(
  id: string,
  product: string,
  date: string,
  total: string,
  status: number,
  method: string
) {
  return { id, product, date, total, status, method };
}

type RowType = {
  [key: string]: string | number;
  id: string;
  product: string;
  date: string;
  total: string;
  status: number;
  method: string;
};
const rows: Array<RowType> = [
  createData(
    "000253",
    "Salt & Pepper Grinder",
    "2020-01-02",
    "$32,00",
    0,
    "Visa"
  ),
  createData("000254", "Backpack", "2020-01-04", "$130,00", 0, "PayPal"),
  createData(
    "000255",
    "Pocket Speaker",
    "2020-01-04",
    "$80,00",
    2,
    "Mastercard"
  ),
  createData("000256", "Glass Teapot", "2020-01-08", "$45,00", 0, "Visa"),
  createData(
    "000257",
    "Unbreakable Water Bottle",
    "2020-01-09",
    "$40,00",
    0,
    "PayPal"
  ),
  createData("000258", "Spoon Saver", "2020-01-14", "$15,00", 0, "Mastercard"),
  createData("000259", "Hip Flash", "2020-01-16", "$25,00", 1, "Visa"),
  createData("000260", "Woven Slippers", "2020-01-22", "$20,00", 0, "PayPal"),
  createData("000261", "Womens Watch", "2020-01-22", "$65,00", 2, "Visa"),
  createData(
    "000262",
    "Over-Ear Headphones",
    "2020-01-23",
    "$210,00",
    0,
    "Mastercard"
  ),
];

function descendingComparator(a: RowType, b: RowType, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: "desc" | "asc", orderBy: string) {
  return order === "desc"
    ? (a: RowType, b: RowType) => descendingComparator(a, b, orderBy)
    : (a: RowType, b: RowType) => -descendingComparator(a, b, orderBy);
}

function stableSort(
  array: Array<RowType>,
  comparator: (a: RowType, b: RowType) => number
) {
  const stabilizedThis = array.map((el: RowType, index: number) => ({
    el,
    index,
  }));
  stabilizedThis.sort((a, b) => {
    const order = comparator(a.el, b.el);
    if (order !== 0) return order;
    return a.index - b.index;
  });
  return stabilizedThis.map((element) => element.el);
}

type HeadCell = {
  id: string;
  alignment: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  label: string;
  disablePadding?: boolean;
};
const headCells: Array<HeadCell> = [
  { id: "id", alignment: "right", label: "Order ID" },
  { id: "product", alignment: "left", label: "Product" },
  { id: "date", alignment: "left", label: "Date" },
  { id: "total", alignment: "right", label: "Total" },
  { id: "status", alignment: "left", label: "Status" },
  { id: "method", alignment: "left", label: "Payment Method" },
  { id: "actions", alignment: "right", label: "Actions" },
];

type EnhancedTableHeadPropsType = {
  numSelected: number;
  order: "desc" | "asc";
  orderBy: string;
  rowCount: number;
  onSelectAllClick: (e: any) => void;
  onRequestSort: (e: any, property: string) => void;
};
const EnhancedTableHead: React.FC<EnhancedTableHeadPropsType> = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property: string) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>
        {headCells.map((headCell: HeadCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

type EnhancedTableToolbarPropsType = { numSelected: number };
const EnhancedTableToolbar = (props: EnhancedTableToolbarPropsType) => {
  // Here was 'let'
  const { numSelected } = props;

  return (
    <Toolbar>
      <ToolbarTitle>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Orders
          </Typography>
        )}
      </ToolbarTitle>
      <Spacer />
      <div>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <ArchiveIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

function EnhancedTable() {
  const [order, setOrder] = React.useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = React.useState("customer");
  const [selected, setSelected] = React.useState<Array<string>>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds: Array<string> = rows.map((n: RowType) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: Array<string> = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: RowType, index: number) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.id}-${index}`}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>

                      <TableCell align="right">#{row.id}</TableCell>
                      <TableCell align="left">{row.product}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="right">{row.total}</TableCell>
                      <TableCell>
                        {row.status === 0 && (
                          <Chip
                            size="small"
                            mr={1}
                            mb={1}
                            label="Shipped"
                            shipped
                          />
                        )}
                        {row.status === 1 && (
                          <Chip
                            size="small"
                            mr={1}
                            mb={1}
                            label="Processing"
                            processing
                          />
                        )}
                        {row.status === 2 && (
                          <Chip
                            size="small"
                            mr={1}
                            mb={1}
                            label="Cancelled"
                            cancelled
                          />
                        )}
                      </TableCell>
                      <TableCell align="left">{row.method}</TableCell>
                      <TableCell padding="none" align="right">
                        <Box mr={2}>
                          <IconButton aria-label="delete">
                            <ArchiveIcon />
                          </IconButton>
                          <IconButton aria-label="details">
                            <RemoveRedEyeIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

function OrderList() {
  return (
    <React.Fragment>
      <Helmet title="Orders" />

      <Grid justify="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Orders
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to="/">
              Dashboard
            </Link>
            <Link component={NavLink} exact to="/">
              Pages
            </Link>
            <Typography>Orders</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <Button variant="contained" color="primary">
              <AddIcon />
              New Order
            </Button>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default OrderList;
