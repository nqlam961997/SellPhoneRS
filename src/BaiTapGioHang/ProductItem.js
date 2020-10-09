import React, { Component } from "react";

export default class ProductItem extends Component {
  handleChiTiet = () => {
    const currentProduct = this.props.product;
    return this.props.xuLiChiTiet(currentProduct);
  };

  handleCardList = () =>{
      const currentProduct = this.props.product;
      return this.props.xuLiCardList(currentProduct);
  }

  render() {
    return (
      <div className="card">
        <img className="card-img-top" src={this.props.product.hinhAnh} alt />
        <div className="card-body">
          <h4 className="card-title">{this.props.product.tenSP}</h4>
          <button className="btn btn-success" onClick = {this.handleChiTiet}>Chi tiết</button>
          <button className="btn btn-danger" onClick = {this.handleCardList}>Thêm giỏ hàng</button>
        </div>
      </div>
    );
  }
}
