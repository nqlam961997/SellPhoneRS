import React, { Component } from "react";

export default class CardItem extends Component {
  handleDelete = () => {
    this.props.handleDelete(this.props.card);
  };

  handleUpQuantity = () => {
    const currentCard = this.props.card;
    this.props.handleUpDownQuantity(currentCard, true);
  };

  handleDownQuantity = () => {
    const currentCard = this.props.card;
    this.props.handleUpDownQuantity(currentCard, false);
  };

  render() {
    return (
      <tr className="card-item text-center">
        <td>{this.props.card.maSP}</td>
        <td>{this.props.card.tenSP}</td>
        <td>
          <img src={this.props.card.hinhAnh} width={50} alt="" />
        </td>
        <td>
          <button onClick={this.handleDownQuantity}>-</button>
          {this.props.card.soLuong}
          <button onClick={this.handleUpQuantity}>+</button>
        </td>
        <td>{this.props.card.giaBan.toLocaleString()}</td>
        <td>
          {(this.props.card.soLuong * this.props.card.giaBan).toLocaleString()}
        </td>
        <td>
          <button className="btn btn-danger" onClick={this.handleDelete}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
