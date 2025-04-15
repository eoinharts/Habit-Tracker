// components/AchievementPopup.jsx
import React, { useEffect } from "react";
import { Modal } from "antd";
import "./AchievementPopup.css";
import confetti from "canvas-confetti";

const AchievementPopup = ({
  visible,
  onClose,
  badgeNumber,
  badgeImage,
  title,
  customMessage,
}) => {
  useEffect(() => {
    if (visible) {
      confetti({
  particleCount: 150,
  spread: 100,
  startVelocity: 30,
  ticks: 250,
  zIndex: 9999, // ensures it's on top
  origin: { y: 0.4 }
});
    }
  }, [visible]);
  console.log("Popup received:", { badgeImage, title, customMessage });
  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      centered
      maskClosable={true}
      onCancel={onClose}
      className="achievement-modal"
    >
      <div className="achievement-popup-inner">
        <div className="rays" />

        <div className="achievement-content">
          <div className="badge-container">
            <div className="badge">
              {badgeImage ? (
                <img
                  src={badgeImage}
                  alt="Achievement Badge"
                  className="badge-image"
                />
              ) : (
                <div className="badge-number">{badgeNumber}</div>
              )}
            </div>
          </div>
          <div className="text-box">
          <h2>{title || "Congrats!"}</h2>
          <p>{customMessage || "You just reached your first habit goal!"}</p>
          {badgeImage?.includes("blue_badge") && (
  <>
    <p className="secondary">
      This badge is a symbol of your commitment to yourself.
    </p>
    <p className="secondary">
      Keep going and earn more badges along the way.
    </p>
  </>
)}
          </div>
          <button className="claim-button" onClick={onClose}>Claim</button>
        </div>
      </div>
    </Modal>
  );
};

export default AchievementPopup;
