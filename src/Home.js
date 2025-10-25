function Home() {
  var classname = "HCE 01";
  var dssv = [
    "Nguyễn Văn Cu Cường",
    "Trần Văn Chí Phèo",
    "Nguyễn Thị Nở",
    "Trần Văn Bá Kiến",
  ];

  var dssv2 = [
    { id: 1, hoten: "Nguyễn Văn Cu Cường", lop: "k19" },
    { id: 2, hoten: "Trần Văn Chí Phèo", lop: "k19" },
    { id: 3, hoten: "Nguyễn Thị Nở", lop: "k19" },
    { id: 4, hoten: "Trần Văn Bá Kiến", lop: "k19" },
  ];

  return (
    <div>
      <div>
        <h1>THỨ BẢY NGÀY 27/09/2025</h1>
      </div>
      <div>Xin chào các bạn {classname}</div>
      <div>Danh sách sinh viên</div>
      <div>
        {dssv.map((sinhvien) => {
          return (
            <p>
              <span>{sinhvien}</span>
            </p>
          );
        })}
      </div>
      <div>
        <h2>Danh sách sinh viên 2</h2>
        <table>
          {dssv2.map((sinhvien) => {
            return (
              <tr>
                <td>id: {sinhvien.id}</td>
                <td>{sinhvien.hoten}</td>
                <td>{sinhvien.lop}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Home;
