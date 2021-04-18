function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import DataTableCell from './DataTableCell';
import DataTableHeader from './DataTableHeader';
import DataTableTitle from './DataTableTitle';
import DataTablePagination from './DataTablePagination'; // eslint-disable-next-line @typescript-eslint/no-unused-vars

import DataTableRow from './DataTableRow';

/**
 * Data tables allow displaying sets of data.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/data-table.png" />
 *     <figcaption>Data table</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { DataTable } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <DataTable>
 *     <DataTable.Header>
 *       <DataTable.Title>Dessert</DataTable.Title>
 *       <DataTable.Title numeric>Calories</DataTable.Title>
 *       <DataTable.Title numeric>Fat</DataTable.Title>
 *     </DataTable.Header>
 *
 *     <DataTable.Row>
 *       <DataTable.Cell>Frozen yogurt</DataTable.Cell>
 *       <DataTable.Cell numeric>159</DataTable.Cell>
 *       <DataTable.Cell numeric>6.0</DataTable.Cell>
 *     </DataTable.Row>
 *
 *     <DataTable.Row>
 *       <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
 *       <DataTable.Cell numeric>237</DataTable.Cell>
 *       <DataTable.Cell numeric>8.0</DataTable.Cell>
 *     </DataTable.Row>
 *
 *     <DataTable.Pagination
 *       page={1}
 *       numberOfPages={3}
 *       onPageChange={page => {
 *         console.log(page);
 *       }}
 *       label="1-2 of 6"
 *     />
 *   </DataTable>
 * );
 *
 * export default MyComponent;
 * ```
 */
const DataTable = ({
  children,
  style,
  ...rest
}) => /*#__PURE__*/React.createElement(View, _extends({}, rest, {
  style: [styles.container, style]
}), children); // @component ./DataTableHeader.tsx


DataTable.Header = DataTableHeader; // @component ./DataTableTitle.tsx

DataTable.Title = DataTableTitle; // @component ./DataTableRow.tsx

DataTable.Row = DataTableRow; // @component ./DataTableCell.tsx

DataTable.Cell = DataTableCell; // @component ./DataTablePagination.tsx

DataTable.Pagination = DataTablePagination;
const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});
export default DataTable;
//# sourceMappingURL=DataTable.js.map