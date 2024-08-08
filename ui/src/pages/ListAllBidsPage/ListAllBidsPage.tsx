import React, { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { deleteBidsBulk, GetAllBidsByUser } from '../../utils/ApiClient';
import { toast } from 'react-toastify';
import { IBidItem } from '../../utils/Types';
import { CommonUtils } from '../../utils/CommonUtils';
import { API_ERROR_MESSAGES } from '../../utils/Constants';

interface Data {
	dbObjectId: string,
	id: number,
	title: string,
	startDate: string,
	startTime: string,
	endDate: string,
	endTime: string

}

function createData(
	dbObjectId: string,
	id: number,
	title: string,
	startDate: string,
	startTime: string,
	endDate: string,
	endTime: string
): Data {
  return {
	dbObjectId,
    id,
    title,
	startDate,
	startTime,
	endTime,
	endDate,
  };
}

type BidData = {
	id: string,
	title: string,
	startDate: string,
	startTime: string,
	endDate: string,
	endTime: string,
	bidItems: IBidItem[]
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string },
) => number {
	return order === 'desc'
	? (a, b) => descendingComparator(a, b, orderBy)
	: (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'ID',
  },
  {
	id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Title',
  },
  {
    id: 'startDate',
    numeric: false,
    disablePadding: false,
    label: 'Start Date',
  },
  {
    id: 'startTime',
    numeric: false,
    disablePadding: false,
    label: 'Start Time',
  },
  {
    id: 'endDate',
    numeric: false,
    disablePadding: false,
    label: 'End Date',
  },
  {
	id: 'endTime',
	numeric: false,
	disablePadding: false,
	label: 'EndTime',
  }
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  selectedItems: readonly number[],
  rows: Data[],
  refreshData: () => void
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { selectedItems, rows, refreshData } = props;

  const handleDeleteBids = async () => {
	console.log(selectedItems, rows)
	const deleteIds = rows.filter((row) => selectedItems.includes(row.id))
								.map(row => row.dbObjectId)

	try {
		const result = await deleteBidsBulk(deleteIds)
		console.log(result)
		if (result.success) {
			toast.success(result.message)
			refreshData()
		} else {
			toast.error(result.message || "Something went wrong, please try again")
		}
	} catch (error) {
		console.log(error)
	}
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedItems.length > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {selectedItems.length > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selectedItems.length} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Created Bids
        </Typography>
      )}
      {selectedItems.length > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteBids}>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
export default function ListAddBidsPage() {

	const [bids, setBids] = useState<BidData[]>([])
	const [rows, setRows] = useState<Data[]>([])
	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<keyof Data>('title');
	const [selected, setSelected] = useState<readonly number[]>([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	useEffect(() => {
		(async () => {
			const result = await GetAllBidsByUser()
			if (result.success) {
				console.log(result)
				setBids(() => {
					const newRows = result.bids.map((b: BidData, i: number) => createData(
						b.id,
						i + 1, 
						b.title, 
						CommonUtils.parseDate(b.startTime), 
						CommonUtils.parseTime(b.startTime), 
						CommonUtils.parseDate(b.endTime), 
						CommonUtils.parseTime(b.endTime)
					))
					setRows(newRows)
					console.log(bids)
					return result
				})
			} else {
				toast.error(API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
			}
		})()
	}, [])

	const fetchRowData = async () => {
		try {
			const result = await GetAllBidsByUser()
			if (result.success) {
				setBids(() => {
					const newRows = result.bids.map((b: BidData, i: number) => createData(
						b.id,
						i + 1, 
						b.title, 
						CommonUtils.parseDate(b.startTime), 
						CommonUtils.parseTime(b.startTime), 
						CommonUtils.parseDate(b.endTime), 
						CommonUtils.parseTime(b.endTime)
					))
					setRows(newRows)
					console.log(bids)
					return result
				})
			} else {
				toast.error(API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const refreshData = async () => {
		await fetchRowData()
	}

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Data,
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
		const newSelected = rows.map((n) => n.id);
		setSelected(newSelected);
		return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: readonly number[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = React.useMemo(
		() =>
		stableSort(rows, getComparator(order, orderBy)).slice(
			page * rowsPerPage,
			page * rowsPerPage + rowsPerPage,
		),
		[rows, order, orderBy, page, rowsPerPage],
	);

	return (
		<Box sx={{ width: '100%' }}>
		<Paper sx={{ width: '100%', mb: 2 }}>
			<EnhancedTableToolbar selectedItems={selected} rows={rows} refreshData={refreshData}/>
			<TableContainer>
			<Table
				sx={{ minWidth: 750 }}
				aria-labelledby="tableTitle"
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
				{visibleRows.map((row, index) => {
					const isItemSelected = isSelected(row.id);
					const labelId = `enhanced-table-checkbox-${index}`;

					return (
					<TableRow
						hover
						onClick={(event) => handleClick(event, row.id)}
						role="checkbox"
						aria-checked={isItemSelected}
						tabIndex={-1}
						key={row.id}
						selected={isItemSelected}
						sx={{ cursor: 'pointer' }}
					>
						<TableCell padding="checkbox">
						<Checkbox
							color="primary"
							checked={isItemSelected}
							inputProps={{
							'aria-labelledby': labelId,
							}}
						/>
						</TableCell>
						<TableCell
						component="th"
						id={labelId}
						scope="row"
						//   padding="none"
						>
						{row.id}
						</TableCell>
						<TableCell align="left">{row.title}</TableCell>
						<TableCell align="left">{row.startDate}</TableCell>
						<TableCell align="left">{row.startTime}</TableCell>
						<TableCell align="left">{row.endDate}</TableCell>
						<TableCell align="left">{row.endTime}</TableCell>
					</TableRow>
					);
				})}
				{emptyRows > 0 && (
					<TableRow>
						<TableCell colSpan={6} />
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
			onPageChange={handleChangePage}
			onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
		</Box>
	);
}
