import React, { useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase.js";
import "../../styles/CustomRakhi.css"
import card1 from "../../assets/rakhi1.png";
import card2 from "../../assets/rakhi2.jpg";
import card3 from "../../assets/rakhi3.jpg";
import card4 from "../../assets/rakhi4.jpg";
import card5 from "../../assets/rakhi5.jpg";
import card6 from "../../assets/rakhi6.jpg";

const RakhisWithMessage = () => {
  const [selectedCard, setSelectedCard] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [messageType, setMessageType] = useState("text");
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [senderContact, setSenderContact] = useState("");
  const [receiverContact, setReceiverContact] = useState("");
  const canvasRef = useRef(null);

  const handleCardSelection = (card) => {
    setSelectedCard(card);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = card;
    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  };

  const startRecording = () => {
    setRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks = [];
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        setAudioBlob(audioBlob);
        setRecording(false);
      });

      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const canvas = canvasRef.current;
    const cardImage = canvas.toDataURL("image/png");

    try {
      const base64Response = await fetch(cardImage);
      const blob = await base64Response.blob();

      const cardImageRef = ref(storage, `cards/${Date.now()}.png`);
      await uploadBytes(cardImageRef, blob);
      const cardImageURL = await getDownloadURL(cardImageRef);
      console.log("Card Image URL:", cardImageURL);

      let voiceMessageURL = null;
      if (messageType === "voice" && audioBlob) {
        const voiceMessageRef = ref(storage, `voices/${Date.now()}.mp3`);
        await uploadBytes(voiceMessageRef, audioBlob);
        voiceMessageURL = await getDownloadURL(voiceMessageRef);
        console.log("Voice Message URL:", voiceMessageURL);
      }

      let messageContent;
      if (messageType === "text") {
        messageContent = `${customMessage}\n\n ${cardImageURL}]`;
      } else if (messageType === "voice") {
        messageContent = `${voiceMessageURL}\n\n ${cardImageURL}]`;
      }

      const whatsappURL = `https://wa.me/${receiverContact}?text=${encodeURIComponent(messageContent)}`;


      console.log("WhatsApp URL:", whatsappURL);

      window.open(whatsappURL, "_blank");
    } catch (error) {
      console.error("Error uploading or getting URLs:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="customize-rakhi-container">
          <h1>Select a Rakhi Card</h1>
          <div className="card-selection">
            <img
              src={card1}
              alt="Card 1"
              onClick={() => handleCardSelection(card1)}
            />
            <img
              src={card2}
              alt="Card 2"
              onClick={() => handleCardSelection(card2)}
            />
            <img
              src={card3}
              alt="Card 3"
              onClick={() => handleCardSelection(card3)}
            />
          </div>
          <div className="card-selection">
            <img
              src={card4}
              alt="Card 1"
              onClick={() => handleCardSelection(card4)}
            />
            <img
              src={card5}
              alt="Card 2"
              onClick={() => handleCardSelection(card5)}
            />
            <img
              src={card6}
              alt="Card 3"
              onClick={() => handleCardSelection(card6)}
            />
          </div>
          <form onSubmit={handleSubmit}>
            {/* Message Input */}
            <label htmlFor="messageType">
              Select Message Type:
              <select
                value={messageType}
                name="messageType"
                id="message-type"
                onChange={(e) => setMessageType(e.target.value)}
              >
                <option value="text">Text</option>
                <option value="voice">Voice</option>
              </select>
            </label>
            {messageType === "text" && (
              <label htmlFor="customMessage">
                Your Message:
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Enter your message here..."
                />
              </label>
            )}
            {messageType === "voice" && (
              <div>
                <button
                  type="button"
                  onClick={startRecording}
                  disabled={recording}
                >
                  {recording ? "Recording..." : "Record Voice Message"}
                </button>
              </div>
            )}

            {/* Contact Details */}
            <label htmlFor="receiverContact">
              Receiver's Contact:
              <input
                type="text"
                name="receiverContact"
                id="receiver-contact"
                value={receiverContact}
                onChange={(e) => setReceiverContact(e.target.value)}
                placeholder="Enter receiver's WhatsApp number"
              />
            </label>

            {/* Submit Button */}
            <button type="submit">Send Rakhi Card</button>
          </form>
        </div>
        {/* Canvas for Card Preview */}
        <div className="rakhi-canvas">
          <canvas ref={canvasRef} width="300" height="300" />
        </div>
      </div>
    </>
  );
};

export default RakhisWithMessage;
