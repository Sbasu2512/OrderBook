import React, { useEffect, useState } from "react";
import "./styles.scss";
import { MdOutlineZoomIn } from "react-icons/md";
import { MdOutlineZoomOut } from "react-icons/md";
import { TbDecimal } from "react-icons/tb";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { store } from "../store";
import { changePrecision } from "../actions/orderBookActions";

const OrderBookChart = ({ bids, asks }) => {
  const maxBidAmount = Math.max(
    ...bids
      .map((b) => b?.book_entries?.amount)
      .filter((amount) => amount !== undefined && amount !== null)
  );

  const maxAskAmount = Math.max(
    ...asks
      .map((a) => a?.book_entries?.amount)
      .filter((amount) => amount !== undefined && amount !== null)
  );
  const [precision, setPrecision] = useState(0);
  const [divisionFactor, setdivisionFactor] = useState(1);

  const increasePrecision = () => {
    if (precision === null) {
      store.dispatch(changePrecision(1));
      setPrecision(1);
    } else {
      if (precision > 4) {
        store.dispatch(changePrecision(4));
        setPrecision(4);
      } else {
        store.dispatch(changePrecision(precision + 1));
        setPrecision(precision + 1);
      }
    }
  };

  const decreasePrecision = () => {
    if (precision === null) {
      store.dispatch(changePrecision(0));
      setPrecision(0);
    } else {
      if (precision === 0) {
        store.dispatch(changePrecision(0));
        setPrecision(0);
      } else {
        store.dispatch(changePrecision(precision - 1));
        setPrecision(precision - 1);
      }
    }
  };

  function getAskBarWidth(ask) {
    let denom = 10000;
    if (precision === 1) {
      denom = 1000;
    } else if (precision === 2) {
      denom = 100;
    } else if (precision === 3) {
      denom = 100;
    } else if (precision === 4) {
      denom = 1;
    }

    const p = (maxAskAmount / ask?.book_entries?.amount) * denom;

    return `${p > 100 ? 98 / divisionFactor : p / divisionFactor}%`;
  }

  function getBidBarWidth(bid) {
    let p = (bid?.book_entries?.amount * 100) / maxBidAmount;
    // console.log("bid", divisionFactor, p);
    return `${p / divisionFactor}%`;
  }

  function handleZoomIn() {
    setdivisionFactor(1);
  }

  function handleZoomOut() {
    setdivisionFactor(2);
  }

  return (
    <div className="orderbook-container">
      <div className="head">
        <div>OrderBook</div>
        <div className="type-row">
          <span>
            <button
              onClick={increasePrecision}
              className="type-col btn-transparent"
            >
              <TbDecimal />
              <GoArrowLeft />
            </button>
          </span>
          <span>
            <button
              onClick={decreasePrecision}
              className="type-col ml-1 btn-transparent"
            >
              <TbDecimal />
              <GoArrowRight />
            </button>
          </span>
          <span className="ml-1">
            <button onClick={handleZoomOut} className="btn-transparent">
              <MdOutlineZoomOut />
            </button>
          </span>
          <span className="ml-1">
            <button onClick={handleZoomIn} className="btn-transparent">
              <MdOutlineZoomIn />
            </button>
          </span>
        </div>
      </div>
      <hr className="w-100" />
      <div className="orderbook-table">
        <div className="orderbook-bids">
          <table>
            <thead>
              <tr className="table-row">
                <th>Count</th>
                <th className="mr-1">Amount</th>
                <th>Total</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid, index) => (
                <tr key={index} className="bid-row">
                  <td colSpan="3" className="bar-cell">
                    <div
                      className="bar-fill"
                      style={{
                        width: getBidBarWidth(bid),
                        right: 0,
                        backgroundColor: "rgb(18, 74, 80)",
                        position: "absolute",
                        top: 0,
                        height: "100%",
                        zIndex: 1,
                        overflow: "hidden",
                      }}
                    />
                    <div
                      style={{
                        position: "relative",
                        zIndex: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0 10px",
                        visibility: isNaN(
                          bid?.book_entries?.price * bid?.book_entries?.amount
                        )
                          ? "hidden"
                          : "visible",
                      }}
                    >
                      <span>{bid?.book_entries?.count}</span>
                      <span>{bid?.book_entries?.amount.toFixed(4)}</span>
                      <span>
                        {!isNaN(
                          bid?.book_entries?.price * bid?.book_entries?.amount
                        )
                          ? (
                              bid?.book_entries?.price *
                              bid?.book_entries?.amount
                            ).toFixed(2)
                          : null}
                      </span>
                      <span>{bid?.book_entries?.price}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="orderbook-asks">
          <table>
            <thead>
              <tr className="table-row">
                <th>Price</th>
                <th className="ml-3">Total</th>
                <th className="ml-1">Amount</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {asks.map((ask, index) => (
                <tr key={index} className="bid-row">
                  <td colSpan="3" className="bar-cell">
                    <div
                      className="bar-fill"
                      style={{
                        width: getAskBarWidth(ask),
                        left: 0,
                        backgroundColor: "rgb(64, 55, 68)",
                        position: "absolute",
                        top: 0,
                        height: "100%",
                        zIndex: 1,
                      }}
                    />
                    <div
                      style={{
                        position: "relative",
                        zIndex: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0 10px",
                        visibility: isNaN(
                          ask?.book_entries?.price * ask?.book_entries?.amount
                        )
                          ? "hidden"
                          : "visible",
                      }}
                    >
                      <span>{ask?.book_entries?.price}</span>
                      <span>
                        {!isNaN(
                          ask?.book_entries?.price * ask?.book_entries?.amount
                        )
                          ? (
                              ask?.book_entries?.price *
                              ask?.book_entries?.amount
                            ).toFixed(2)
                          : null}
                      </span>
                      <span>{ask?.book_entries?.amount?.toFixed(4)}</span>
                      <span>{ask?.book_entries?.count}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderBookChart;
