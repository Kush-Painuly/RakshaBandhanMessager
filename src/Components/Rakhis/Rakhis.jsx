import React, { useState } from "react";
import "../../styles/Rakhi.css";
const Rakhis = () => {
  const Rakhi = [
    {
      id: 1,
      name: "Lumba Rakhis",
      image: "https://m.media-amazon.com/images/I/8123pCWHY1L._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 2,
      name: "Braided Rakhis",
      image: 'https://img2.ogaanindia.com/pub/media/catalog/product/cache/3f6619daccdb194398d06464ab49fa6e/p/p/ppsrl2061.jpg',
    },
    {
      id: 3,
      name: "Sandalwood Rakhis",
      image: 'https://5.imimg.com/data5/SELLER/Default/2024/2/391547729/OA/SE/ZB/120577758/kc786613.webp',
    },
    {
      id: 4,
      name: "Divine Rakhis",
      image: 'https://www.unrealgift.com/uploads/products/divine-rakhi-set-with-kaju-phool-sweets-c.jpg',
    },
    {
      id: 5,
      name: "Silver Rakhis",
      image: "https://www.rakhiz.com/catalog/rakhi/RZ21-264.jpg",
    },
    {
      id: 6,
      name: "Rudra Rakhis",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ5RDos7S3WdctYzaudKrrbnUvmviWt3rBAg&s',
    },
    {
      id: 7,
      name: "HandMade Rakhis",
      image: "https://www.rakhiz.com/catalog/rakhi/f2_IMG_4388.jpg",
    },
    {
      id: 8,
      name: "Kids Rakhis",
      image: 'https://res.cloudinary.com/joinventures/f_auto,q_auto,t_pnopt19prodlp/products/p-cute-kids-rakhi-set-of-3-262575-m.jpg',
    },
    {
      id: 9,
      name: "pearl Rakhis",
      image: "https://rukminim2.flixcart.com/image/850/1000/krwec280/rakhi-set/u/8/x/2-cr-24-red-ratgal-white-pearl-original-imag5hfu5n6bnfwf.jpeg?q=90&crop=false",
    },
    {
      id: 10,
      name: "kundan Rakhis",
      image: 'https://www.rakhiz.com/catalog/rakhi/IMG3_1218.jpg',
    },
    {
      id: 11,
      name: "bead Rakhis",
      image: 'https://www.zakarto.com/wp-content/uploads/2019/08/7002332630.jpg',
    },
    {
      id: 12,
      name: "designer Rakhis",
      image: 'https://www.saugatonline.com/products_image/fcb0ad5be591ecc9ce275df46f78a46c.jpg',
    },
  ];

  const [selectedRakhi, setSelectedRakhi] = useState(null);
  const [from,setFrom] = useState("");
  const [to,setTo] = useState("");
  const [receiverContact,setReceiverContact] = useState("");

  const handleRakhiClicked = (rakhi) => {
    setSelectedRakhi(rakhi);
  };

  const handleCloseModal =() =>{
    setSelectedRakhi(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const message = `Wish you Happy Raksha Bandhan ${to} !`;
    const imageUrl = selectedRakhi.image;
    const whatsappMessage = `${message}\n\nFrom: ${from}\n\n${imageUrl}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
  
    const whatsappURL = `whatsapp://send?phone=${receiverContact}&text=${encodedMessage}`;
    const whatsappWebURL = `https://wa.me/${receiverContact}?text=${encodedMessage}`;
  
    // Try to open with whatsapp:// scheme, fallback to WhatsApp Web
    window.location.href = whatsappURL;
  
    setTimeout(() => {
      if (!document.hidden) {
        window.location.href = whatsappWebURL;
      }
    }, 200);
  
    handleCloseModal();
  };
  

  return (
    <>
      <div className="rakhis-bg">
        <div className="rakhi-selection-container">
          <h1>Select your Rakhis</h1>
          <div className="rakhi-grid">
            {Rakhi.map((rakhi) => {
              return (
                <div
                  key={rakhi.id}
                  className="rakhi-card"
                  onClick={() => handleRakhiClicked(rakhi)}
                >
                  <img src={rakhi.image} alt={rakhi.name} />
                  <p>{rakhi.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedRakhi && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={handleCloseModal}>
              &times;
            </button>
            <img
              src={selectedRakhi.image}
              alt={selectedRakhi.name}
              className="modal-image"
            />
            <h2>{selectedRakhi.name}</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <label>
                From:
                <input type="text" name="from" required onChange={(e)=>setFrom(e.target.value)} />
              </label>
              <label>
                To:
                <input type="text" name="to" required onChange={(e)=>setTo(e.target.value)} />
              </label>
              <label>
                Receiver Contact:
                <input type="tel" name="receiverContact" required onChange={(e)=>setReceiverContact(e.target.value)} />
              </label>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Rakhis;
