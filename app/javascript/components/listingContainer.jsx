import React from "react";
import axios from "axios";
import ListingItem from "components/listingItem";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import Select from "react-select";
import RangeSlider from "components/rangeSlider";

const TotalCount = styled.span`
  position: absolute;
  top: 7px;
  right: 7px;
`;
const RefreshButton = styled.button`
  position: absolute;
  top: 7px;
  left: 7px;
`;

const ResetButton = styled.button`
  position: absolute;
  top: 7px;
  left: 197px;
`;
const Container = styled.div`
  margin-top: 20px;
`;
const CtaWrapper = styled.div``;
const SortListingSelect = styled.span`
  position: absolute;
  top: 7px;
  width: 220px;
`;
const ZipcodeSelectionWrapper = styled.span`
  display: inline-flex;
  position: absolute;
  top: 7px;
  left: 475px;
`;
const RangeSliderWrapper = styled.span`
  position: relative;
  left: 234px;
  bottom: 13px;
`;
export default class ListingContainer extends React.Component {
  constructor(props) {
    super(props);
    const zipcodeOptions = [
      { value: "69001", label: "1er" },
      { value: "69002", label: "2ème" },
      { value: "69003", label: "3ème" },
      { value: "69004", label: "4ème" },
      { value: "69005", label: "5ème" },
      { value: "69006", label: "6ème" },
      { value: "69007", label: "7ème" },
      { value: "69008", label: "8ème" },
      { value: "69009", label: "9ème" }
    ];
    this.state = {
      listings: [],
      listingsCount: 0,
      pendingRefresh: false,
      pendingReset: false,
      sortBy: "square_meter_price",
      sortOrder: "asc",
      zipcodeOptions: zipcodeOptions,
      startPrice: 50000,
      endPrice: 190000,
      selectedZipcodeOptions: [
        { value: "69001", label: "1er" },
        { value: "69002", label: "2ème" },
        { value: "69003", label: "3ème" },
        { value: "69004", label: "4ème" },
        { value: "69005", label: "5ème" },
        { value: "69006", label: "6ème" },
        { value: "69007", label: "7ème" },
        { value: "69008", label: "8ème" },
        { value: "69009", label: "9ème" }
      ]
    };
  }
  async componentDidMount() {
    const url = new URL(location.href);
    const zipcodes = url.searchParams.get("zipcodes");
    const zipcodesInUrl =
      zipcodes === null
        ? this.state.zipcodeOptions.map(zip => zip.value)
        : zipcodes.split(",");
    const currentZipcodes = this.state.zipcodeOptions
      .map(zipcode => {
        if (zipcodesInUrl.includes(zipcode.value)) {
          return zipcode;
        }
      })
      .filter(z => z);
    this.setState(
      {
        sortBy: url.searchParams.get("sort_by") || this.state.sortBy,
        sortOrder: url.searchParams.get("sort_order") || this.state.sortOrder,
        startPrice:
          url.searchParams.get("start_price") || this.state.startPrice,
        endPrice: url.searchParams.get("end_price") || this.state.endPrice,
        selectedZipcodeOptions: currentZipcodes
      },
      () => this.getListing()
    );
  }
  getListing = async () => {
    const res = await this.fetchListing(0);
    this.setState({
      listings: res.data.results,
      listingsCount: res.data.listings_count
    });
  };
  fetchListing = async pageNb => {
    return await axios.get(
      `/api/listings?page=${pageNb}&sort_by=${this.state.sortBy ||
        "square_meter_price"}&sort_order=${this.state.sortOrder ||
        "asc"}&zipcodes=${this.state.selectedZipcodeOptions.map(
        zipcode => zipcode.value
      )}&start_price=${this.state.startPrice}&end_price=${this.state.endPrice}`
    );
  };
  refreshListing = async () => {
    this.setState({ pendingRefresh: true });
    const refreshRes = await axios.get("/api/listings/refresh");
    this.setState({ pendingRefresh: false });
    this.getListing();
  };
  handlePageClick = async e => {
    const pageNb = e.selected + 1;
    const res = await this.fetchListing(pageNb);
    this.setState({ listings: res.data.results });
    window.scrollTo(0, 0);
  };
  resetListing = async () => {
    this.setState({ pendingReset: true });
    const refreshRes = await axios.get("/api/listings/reset");
    this.setState({ pendingReset: false });
    this.getListing();
  };
  sortedListing = listing => {
    return listing.sort((key, value) => {
      return key.price - value.price;
    });
  };
  sortListing = e => {
    console.log(e);
    const [sortBy, sortOrder] = e.value.split(":");
    this.setState({ sortBy, sortOrder }, () => this.updateUrl());
  };
  handleZipcodeChange = e => {
    this.setState({ selectedZipcodeOptions: e }, () => this.updateUrl());
  };
  handleRangeChange = values => {
    const [startPrice, endPrice] = values;
    this.setState({ startPrice, endPrice }, () => this.updateUrl());
  };
  updateUrl = () => {
    const currentSearch = this.props.history.location.search;
    const url = `?sort_by=${this.state.sortBy ||
      "square_meter_price"}&sort_order=${this.state.sortOrder ||
      "asc"}&zipcodes=${this.state.selectedZipcodeOptions.map(
      zipcode => zipcode.value
    )}&start_price=${this.state.startPrice}&end_price=${this.state.endPrice}`;

    this.props.history.push(url);
    this.getListing();
  };
  render() {
    const pageCount = Math.round(this.state.listingsCount / 25);
    const options = [
      { label: "prix au m2 ascendant", value: "square_meter_price:asc" },
      { label: "prix au m2 descendant", value: "square_meter_price:desc" },
      { label: "prix ascendant", value: "price:asc" },
      { label: "prix descendant", value: "price:desc" },
      { label: "surface ascendante", value: "surface:asc" },
      { label: "surface descendante", value: "surface:desc" },
      { label: "date ascendante", value: "first_publication_date:asc" },
      { label: "date descendante", value: "first_publication_date:desc" }
    ];
    const currentOptionValue = options.find(
      el => el.value === `${this.state.sortBy}:${this.state.sortOrder}`
    );
    return (
      <Container className="container-fluid">
        <CtaWrapper>
          {/* <RefreshButton
            className="btn btn-success"
            onClick={this.refreshListing}
            disabled={this.state.pendingRefresh}
          >
            Mettre à jour le listing
          </RefreshButton>
          <ResetButton
            className="btn btn-danger"
            onClick={this.resetListing}
            disabled={this.state.pendingReset}
          >
            Remettre à zéro le listing
          </ResetButton> */}
          <SortListingSelect className="form-group">
            <Select
              value={currentOptionValue}
              onChange={this.sortListing}
              isMulti={false}
              options={options}
            />
          </SortListingSelect>
          <RangeSliderWrapper>
            <RangeSlider
              onRangeChange={this.handleRangeChange}
              startPrice={this.state.startPrice}
              endPrice={this.state.endPrice}
            />
          </RangeSliderWrapper>
          <ZipcodeSelectionWrapper>
            <Select
              className="zipcode-select"
              style={{
                width: "150px"
              }}
              value={this.state.selectedZipcodeOptions}
              onChange={this.handleZipcodeChange}
              isMulti={true}
              options={this.state.zipcodeOptions}
            />
          </ZipcodeSelectionWrapper>
        </CtaWrapper>
        <TotalCount className="badge badge-warning">
          {this.state.listingsCount} Annonces
        </TotalCount>
        {this.state.listings.map((item, index) => (
          <ListingItem key={index} listing={item}></ListingItem>
        ))}
        <nav>
          {this.state.listings.length > 0 && (
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"page-item"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          )}
        </nav>
      </Container>
    );
  }
}
