import React, { Component } from "react";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import { getAllCases } from "./../services/caseServicde";
import Pagination from "./common/pagination";
import Table from "./common/table";
import _ from "lodash";

class CaseCheck extends Component {
  state = {
    columns: [
      {
        path: "caseNum",
        label: "شماره پرونده",
        content: (caseItem) => (
          <Link to={`/admin/case/${caseItem._id}`}>{caseItem.caseNum}</Link>
        ),
      },
      { path: "p1.name", label: "خواهان" },
      { path: "p2.name", label: "خوانده" },
      { path: "arbi.name", label: "داور" },
      { path: "value", label: "ارزش خواسته (تومان)" },
    ],
    cases: [],
    currentPage: 1,
    pageSize: 8,
    sortColumn: { path: "caseNum", label: "شماره پرونده" },
  };
  async componentDidMount() {
    let { data: cases } = await getAllCases();
    cases.map(
      (c) =>
        (c.value = c.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    );
    this.setState({ cases });
  }
  componentWillMount() {
    if (window.innerWidth < 425) {
      this.setState({
        columns: [
          {
            path: "caseNum",
            label: "شماره پرونده",
            content: (caseItem) => (
              <Link to={`/admin/case/${caseItem._id}`}>{caseItem.caseNum}</Link>
            ),
          },
          { path: "p1.name", label: "خواهان" },
        ],
      });
    }
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, cases: allCases } = this.state;

    const sorted = _.orderBy(allCases, [sortColumn.path], [sortColumn.order]);

    const cases = paginate(sorted, currentPage, pageSize);

    return { totalCount: allCases.length, data: cases };
  };

  render() {
    const { length: count } = this.state.cases;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>پرونده ای یافت نشد</p>;

    const { totalCount, data: cases } = this.getPagedData();
    const { ...rest } = this.state;
    return (
      <React.Fragment>
        <Table
          data={cases}
          columns={this.state.columns}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          {...rest}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default CaseCheck;
