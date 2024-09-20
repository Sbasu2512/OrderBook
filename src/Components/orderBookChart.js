import React from "react";
import "./styles.css";
import { MdOutlineZoomIn } from "react-icons/md";
import { MdOutlineZoomOut } from "react-icons/md";
import { TbDecimal } from "react-icons/tb";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";

const OrderBookChart = ({ bids, asks }) => {
  const maxBidAmount = Math.max(...bids.map((b) => b.book_entries.amount));
  const maxAskAmount = Math.max(...asks.map((a) => a.book_entries.amount));

  return (
    <div className="orderbook-container">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "1rem",
        }}
      >
        <span style={{ display: "flex", flexDirection: "column" }}>
          <TbDecimal />
          <GoArrowLeft />
        </span>
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "0.5rem",
          }}
        >
          <TbDecimal />
          <GoArrowRight />
        </span>
        <span style={{ marginLeft: "0.5rem" }}>
          <MdOutlineZoomOut />
        </span>
        <span style={{ marginLeft: "0.5rem" }}>
          <MdOutlineZoomIn />
        </span>
      </div>
      <div className="orderbook-table">
        <div className="orderbook-bids">
          <table>
            <thead>
              <tr>
                <th>Amount</th>
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
                        width: `${
                          (bid.book_entries.amount * 100) / maxBidAmount
                        }%`,
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
                      }}
                    >
                      <span>{bid.book_entries.amount.toFixed(4)}</span>
                      <span>
                        {(
                          bid.book_entries.price * bid.book_entries.amount
                        ).toFixed(2)}
                      </span>
                      <span>{bid.book_entries.price}</span>
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
              <tr>
                <th>Price</th>
                <th>Total</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {asks.map((ask, index) => (
                <tr key={index} className="bid-row">
                  <td colSpan="3" className="bar-cell">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${
                          ask.book_entries.amount / (maxAskAmount * 1000)
                        }%`,
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
                      }}
                    >
                      <span>{ask.book_entries.price}</span>
                      <span>
                        {(
                          ask.book_entries.price * ask.book_entries.amount
                        ).toFixed(2)}
                      </span>
                      <span>{ask.book_entries.amount.toFixed(4)}</span>
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
