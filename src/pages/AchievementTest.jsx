import React, { useState } from "react";
import AchievementPopup from "../components/AchievementPopup/AchievementPopup";

const AchievementTest = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Achievement Test Page</h1>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onClick={() => setVisible(true)}
      >
        Show Achievement Popup
      </button>

      <AchievementPopup
        visible={visible}
        onClose={() => setVisible(false)}
        badgeNumber={1}
      />
    </div>
  );
};

export default AchievementTest;