// components/AchievementPopup.jsx
import React from "react";
import { Modal } from "antd";
import "./AchievementPopup.css";

const AchievementPopup = ({ visible, onClose, badgeNumber }) => {
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
      <div className="rays" /> {/* This is now a full background layer */}
  
      <div className="achievement-content">
        <div className="badge-container">
          <div className="badge">
            <div className="badge-number">{badgeNumber}</div>
          </div>
        </div>
  
        <h2>Congrats!</h2>
        <p>You just reached your first habit goal!</p>
        <p className="secondary">
          This badge is a symbol of your commitment to yourself.
        </p>
        <p className="secondary">
          Keep going and earn more badges along the way.
        </p>
  
        <button className="claim-button" onClick={onClose}>Claim</button>
      </div>
    </div>
  </Modal>
  );
};

export default AchievementPopup;
