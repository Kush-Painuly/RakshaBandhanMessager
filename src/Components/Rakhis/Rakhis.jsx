import React, { useState } from "react";
import Rakhi1 from "../../assets/Lumba Rakhi.jpg";
import Rakhi2 from "../../assets/Rudra Rakhi.jpg";
import Rakhi3 from "../../assets/Sandalwood Rakkhi.jpg";
import Rakhi4 from "../../assets/Silver Rakhi.jpg";
import Rakhi5 from "../../assets/Divine Rakhi.jpg";
import Rakhi6 from "../../assets/Braided Rakhi.jpg";
import Rakhi7 from "../../assets/HandMade Rakhi.jpg";
import Rakhi8 from "../../assets/Kids Rakhi.jpg";
import Rakhi9 from "../../assets/Pearl Rakhi.jpg";
import Rakhi10 from "../../assets/Kundan Rakhi.jpg";
import Rakhi11 from "../../assets/Bead Rakhi.jpg";
import Rakhi12 from "../../assets/Designer Rakhi.jpg";

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
      image: Rakhi6,
    },
    {
      id: 3,
      name: "Sandalwood Rakhis",
      image: Rakhi3,
    },
    {
      id: 4,
      name: "Divine Rakhis",
      image: Rakhi4,
    },
    {
      id: 5,
      name: "Silver Rakhis",
      image: Rakhi5,
    },
    {
      id: 6,
      name: "Rudra Rakhis",
      image: Rakhi2,
    },
    {
      id: 7,
      name: "HandMade Rakhis",
      image: Rakhi7,
    },
    {
      id: 8,
      name: "Kids Rakhis",
      image: Rakhi8,
    },
    {
      id: 9,
      name: "pearl Rakhis",
      image: Rakhi9,
    },
    {
      id: 10,
      name: "kundan Rakhis",
      image: Rakhi10,
    },
    {
      id: 11,
      name: "bead Rakhis",
      image: Rakhi11,
    },
    {
      id: 12,
      name: "designer Rakhis",
      image: Rakhi12,
    },
  ];

  const [selectedRakhi, setSelectedRakhi] = useState(null);
  const [from,setFrom] = useState("");
  const [to,setTo] = useState("");
  const [senderContact,setSenderContact] = useState("");
  const [receiverContact,setReceiverContact] = useState("");

  const handleRakhiClicked = (rakhi) => {
    setSelectedRakhi(rakhi);
  };

  const handleCloseModal =() =>{
    setSelectedRakhi(null);
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    
    const message =`Wish you Happy Raksha Bandhan ${to} !`;

    const imageUrl = selectedRakhi.image;
    
    const whatsappMessage = `${message}\n\nFrom: ${from}\n\n  ${imageUrl}`;

    const whatsappURL = `https://web.whatsapp.com/send?phone=${receiverContact}&text=${encodeURIComponent(whatsappMessage)}`;


    window.open(whatsappURL,"_blank");

    handleCloseModal();
  }

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
                Sender Contact:
                <input type="tel" name="senderContact" required onChange={(e)=>setSenderContact(e.target.value)} />
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
