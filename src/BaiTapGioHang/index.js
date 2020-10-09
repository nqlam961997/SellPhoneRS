// các bước thực hiện:
// 1. dàn layout (html css) - done
// 2. xác dịnh dữ liệu thay đổi và lưu state
// 3. lấy data trong state di binding ra jsx
// 4. render danh sách sản phẩm
// 5. xây dựng chức năng xem chi tiết
// 6. xấy dựng chức nâng thêm vào giỏ hàng
// 7. xây dựng chức năng tăng giảm số lượng
// 8. xây dựng chức năng xóa sản phẩm trong giỏ hàng
// 9. xây dựng chức năng hiển thị tổng số sản phẩm trong giỏ hàng

import React, { Component } from "react";
import DanhSachSanPham from "./data.json";
import Modal from "./Modal";
import ProductItem from "./ProductItem";

export default class BaiTapGioHang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sanPhamChiTiet: {
        maSP: 1,
        tenSP: "VinSmart Live",
        manHinh: 'AMOLED, 6.2", Full HD+',
        heDieuHanh: "Android 9.0 (Pie)",
        cameraTruoc: "20 MP",
        cameraSau: "Chính 48 MP & Phụ 8 MP, 5 MP",
        ram: "4 GB",
        rom: "64 GB",
        giaBan: 5700000,
        hinhAnh: "./img/vsphone.jpg",
      },
      cardList: [],
    };
  }

  renderDanhSachSanPham = () => {
    return DanhSachSanPham.map((sanPham, index) => {
      return (
        <div className="col-sm-4" key={index}>
          <ProductItem
            product={sanPham}
            xuLiChiTiet={this.handleChiTiet}
            xuLiCardList={this.handleCardList}
          />
        </div>
      );
    });
  };

  handleChiTiet = (sanPhamChiTiet) => {
    this.setState({
      sanPhamChiTiet,
    });
  };

  handleCardList = (sanPham) => {
    const index = this.state.cardList.findIndex((card) => {
      return card.maSP === sanPham.maSP;
    });
    let cardList = [...this.state.cardList];
    const newCard = { ...sanPham, soLuong: 1 };
    if (index !== -1) {
      cardList[index].soLuong += 1;
    } else {
      cardList = [...cardList, newCard];
    }
    this.setState({
      cardList,
    });
  };

  handleDeleteCard = (sanPham) => {
    let cardListUpdate = this.state.cardList.filter(
      (card) => card.maSP !== sanPham.maSP
    );
    this.setState({
      cardList: cardListUpdate,
    });
  };

  handleUpDownQuantity = (sanPham, UpDown) => {
    let cardListUpdate = [...this.state.cardList];
    let index = cardListUpdate.findIndex((card) => card.maSP === sanPham.maSP);
    if (UpDown) {
      cardListUpdate[index].soLuong += 1;
    } else {
      if (cardListUpdate[index].soLuong > 1) {
        cardListUpdate[index].soLuong -= 1;
      }
    }
    this.setState({
      cardList: cardListUpdate,
    });
  };

  render() {

    let TotalQuantity = this.state.cardList.reduce((Quantity,sanPham,index)=>{
      return Quantity += sanPham.soLuong;
    },0)
 
    return (
      <section className="container">
        <h3 className="title text-center">Bài tập giỏ hàng</h3>
        <div className="container text-center my-2">
          <button
            className="btn btn-danger "
            data-toggle="modal"
            data-target="#modelId"
          >
            Giỏ hàng ({TotalQuantity})
          </button>
        </div>
        <div className="container danh-sach-san-pham">
          <div className="row">{this.renderDanhSachSanPham()};</div>
        </div>
        <Modal
          DSSanPham={this.state.cardList}
          xuLiDelete={this.handleDeleteCard}
          xuLiSoLuong={this.handleUpDownQuantity}
          xuLiGiabanSanPham={this.handleTotalItem}
        />
        <div className="row">
          <div className="col-sm-5">
            <img
              className="img-fluid"
              src={this.state.sanPhamChiTiet.hinhAnh}
              alt
            />
          </div>
          <div className="col-sm-7">
            <h3>Thông số kỹ thuật</h3>
            <table className="table">
              <tbody>
                <tr>
                  <td>Màn hình</td>
                  <td>{this.state.sanPhamChiTiet.manHinh}</td>
                </tr>
                <tr>
                  <td>Hệ điều hành</td>
                  <td>{this.state.sanPhamChiTiet.heDieuHanh}</td>
                </tr>
                <tr>
                  <td>Camera trước</td>
                  <td>{this.state.sanPhamChiTiet.cameraTruoc}</td>
                </tr>
                <tr>
                  <td>Camera sau</td>
                  <td>{this.state.sanPhamChiTiet.cameraSau}</td>
                </tr>
                <tr>
                  <td>RAM</td>
                  <td>{this.state.sanPhamChiTiet.ram}</td>
                </tr>
                <tr>
                  <td>ROM</td>
                  <td>{this.state.sanPhamChiTiet.rom}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
}
