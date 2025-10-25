export interface User {
  id: number;
  name: string;
  age: number;
  job: string;
  email: string;
  avatar: string;
}

const users: User[] = [
  {
    id: 1,
    name: "B Ray",
    age: 31,
    job: "Huấn luyện viên Rap Việt mùa 3, rapper nổi tiếng với phong cách rap cá tính và lyrics sâu sắc.",
    email: "bray@rapvietnam.vn",
    avatar: "/images/user1.jpg",
  },
  {
    id: 2,
    name: "YOUNG H",
    age: 44,
    job: "Người truyền cảm hứng",
    email: "youngh@rapvietnam.vn",
    avatar: "/images/user2.jpg",
  },
  {
    id: 3,
    name: "24k.Right",
    age: 25,
    job: "Thành viên của đội B Ray, rapper với phong cách lôi cuốn và giai điệu bắt tai.",
    email: "24kright@rapvietnam.vn",
    avatar: "/images/user3.jpg",
  },
  {
    id: 4,
    name: "ROBBER",
    age: 23,
    job: "Thí sinh của Rap Việt mùa 4, nổi bật với khả năng chơi chữ và phong cách trình diễn năng lượng.",
    email: "robber@rapvietnam.vn",
    avatar: "/images/user4.jpg",
  },

  // --- Mùa 3 (đội B Ray) ---
  {
    id: 5,
    name: "Dlow",
    age: 24,
    job: "Được B Ray cứu về đội sau khi không được chọn từ đội của HLV Andree Right Hand.",
    email: "dlow@rapvietnam.vn",
    avatar: "/images/user5.jpg",
  },
  {
    id: 6,
    name: "LoR",
    age: 23,
    job: "Thành viên của đội B Ray.",
    email: "lor@rapvietnam.vn",
    avatar: "/images/user6.jpg",
  },
  {
    id: 7,
    name: "Huỳnh Công Hiếu",
    age: 21,
    job: "Thành viên của đội B Ray.",
    email: "huynhconghieu@rapvietnam.vn",
    avatar: "/images/user7.jpg",
  },
  {
    id: 8,
    name: "CAPTAIN",
    age: 26,
    job: "Thành viên của đội B Ray.",
    email: "captain@rapvietnam.vn",
    avatar: "/images/user8.jpg",
  },
  {
    id: 9,
    name: "DT Tập Rap",
    age: 22,
    job: "Thành viên của đội B Ray.",
    email: "dttaprap@rapvietnam.vn",
    avatar: "/images/user9.jpg",
  },

  // --- Mùa 4 ---
  {
    id: 10,
    name: "RAMC",
    age: 24,
    job: "Thí sinh mùa 4 của Rap Việt.",
    email: "ramc@rapvietnam.vn",
    avatar: "/images/user10.jpg",
  },
  {
    id: 11,
    name: "YOUNG PUPPY",
    age: 20,
    job: "Thí sinh mùa 4 của Rap Việt.",
    email: "youngpuppy@rapvietnam.vn",
    avatar: "/images/user11.jpg",
  },
  {
    id: 12,
    name: "GILL",
    age: 23,
    job: "Thí sinh mùa 4 của Rap Việt.",
    email: "gill@rapvietnam.vn",
    avatar: "/images/user12.jpg",
  },
  {
    id: 13,
    name: "NGẮN",
    age: 27,
    job: "Thí sinh mùa 4 của Rap Việt.",
    email: "ngan@rapvietnam.vn",
    avatar: "/images/user13.jpg",
  },
  {
    id: 14,
    name: "VLARY",
    age: 21,
    job: "Thí sinh mùa 4 của Rap Việt.",
    email: "vlary@rapvietnam.vn",
    avatar: "/images/user14.jpg",
  },
  {
    id: 15,
    name: "ICY FAMOU$",
    age: 22,
    job: "Thí sinh mùa 4 của Rap Việt.",
    email: "icyfamous@rapvietnam.vn",
    avatar: "/images/user15.jpg",
  },
];

export default users;
