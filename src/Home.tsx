import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  role: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) return null;

  // Demo images (ngẫu nhiên từ Unsplash)
  const images = [
    "https://source.unsplash.com/400x250/?nature,water",
    "https://source.unsplash.com/400x250/?city,night",
    "https://source.unsplash.com/400x250/?technology,computer",
    "https://source.unsplash.com/400x250/?music,concert",
    "https://source.unsplash.com/400x250/?art,design",
    "https://source.unsplash.com/400x250/?travel,adventure",
  ];

  const cards = [
    {
      title: "Khám phá âm nhạc",
      desc: "Cập nhật các bài hát mới, album hot và xu hướng âm nhạc hiện nay.",
    },
    {
      title: "Sự kiện nổi bật",
      desc: "Xem các sự kiện, concert, workshop hấp dẫn sắp diễn ra gần bạn.",
    },
    {
      title: "Học hỏi kỹ năng",
      desc: "Những tips, tutorial về nhảy, hát, mix nhạc, và phong cách cá nhân.",
    },
    {
      title: "Thư viện hình ảnh",
      desc: "Ngắm nhìn các hình ảnh đẹp, nghệ thuật, và truyền cảm hứng.",
    },
    {
      title: "Công nghệ & Mạng xã hội",
      desc: "Cập nhật các xu hướng công nghệ, mạng xã hội và giải trí.",
    },
    {
      title: "Du lịch & Trải nghiệm",
      desc: "Khám phá những địa điểm mới và trải nghiệm độc đáo.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      {/* Header */}
      <div className="text-center mt-10 mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Chào mừng, {user.name}!
        </h1>
        <p className="text-lg text-gray-300">
          Vai trò:{" "}
          <span className="text-green-400 font-semibold">{user.role}</span>
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl mb-16">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center transform hover:-translate-y-3 hover:shadow-3xl transition-all duration-300"
          >
            <img
              src={images[index % images.length]}
              alt={card.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-center flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
              <p className="text-gray-300">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Section */}
      <div className="bg-gradient-to-r from-purple-700 via-pink-700 to-red-600 rounded-3xl p-10 shadow-inner max-w-4xl flex flex-col items-center text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Lời nhắn từ hệ thống
        </h3>
        <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
          Chào mừng bạn đến với trang quản lý! Khám phá các thông tin thú vị,
          học hỏi kỹ năng mới, và tận hưởng trải nghiệm trực quan với hình ảnh
          sống động, giao diện hiện đại và responsive.
        </p>
      </div>
    </div>
  );
};

export default Home;
