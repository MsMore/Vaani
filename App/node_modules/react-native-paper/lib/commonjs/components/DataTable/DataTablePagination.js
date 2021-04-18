"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTablePagination = exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _color = _interopRequireDefault(require("color"));

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _Text = _interopRequireDefault(require("../Typography/Text"));

var _theming = require("../../core/theming");

var _MaterialCommunityIcon = _interopRequireDefault(require("../MaterialCommunityIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * A component to show pagination for data table.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/data-table-pagination.png" />
 *   </figure>
 * </div>
 *
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { DataTable } from 'react-native-paper';
 *
 * const itemsPerPage = 2;
 *
 * const items = [
 *   {
 *     key: 1,
 *     name: 'Page 1',
 *   },
 *   {
 *     key: 2,
 *     name: 'Page 2',
 *   },
 *   {
 *     key: 3,
 *     name: 'Page 3',
 *   },
 * ];
 *
 * const MyComponent = () => {
 *   const [page, setPage] = React.useState(0);
 *   const from = page * itemsPerPage;
 *   const to = (page + 1) * itemsPerPage;
 *
 *   return (
 *     <DataTable>
 *       <DataTable.Pagination
 *         page={page}
 *         numberOfPages={Math.floor(items.length / itemsPerPage)}
 *         onPageChange={page => setPage(page)}
 *         label={`${from + 1}-${to} of ${items.length}`}
 *       />
 *     </DataTable>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DataTablePagination = ({
  label,
  page,
  numberOfPages,
  onPageChange,
  style,
  theme,
  ...rest
}) => {
  const labelColor = (0, _color.default)(theme.colors.text).alpha(0.6).rgb().string();
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({}, rest, {
    style: [styles.container, style]
  }), /*#__PURE__*/React.createElement(_Text.default, {
    style: [styles.label, {
      color: labelColor
    }],
    numberOfLines: 1
  }, label), /*#__PURE__*/React.createElement(_IconButton.default, {
    icon: ({
      size,
      color
    }) => /*#__PURE__*/React.createElement(_MaterialCommunityIcon.default, {
      name: "chevron-left",
      color: color,
      size: size,
      direction: _reactNative.I18nManager.isRTL ? 'rtl' : 'ltr'
    }),
    color: theme.colors.text,
    disabled: page === 0,
    onPress: () => onPageChange(page - 1)
  }), /*#__PURE__*/React.createElement(_IconButton.default, {
    icon: ({
      size,
      color
    }) => /*#__PURE__*/React.createElement(_MaterialCommunityIcon.default, {
      name: "chevron-right",
      color: color,
      size: size,
      direction: _reactNative.I18nManager.isRTL ? 'rtl' : 'ltr'
    }),
    color: theme.colors.text,
    disabled: numberOfPages === 0 || page === numberOfPages - 1,
    onPress: () => onPageChange(page + 1)
  }));
};

exports.DataTablePagination = DataTablePagination;
DataTablePagination.displayName = 'DataTable.Pagination';

const styles = _reactNative.StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16
  },
  label: {
    fontSize: 12,
    marginRight: 44
  }
});

var _default = (0, _theming.withTheme)(DataTablePagination); // @component-docs ignore-next-line


exports.default = _default;
//# sourceMappingURL=DataTablePagination.js.map