import React, { useRef, useState } from "react";
import "./AchievementsBadgeContainer.css";
import { Typography, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import AchievementPopup from "../AchievementPopup/AchievementPopup";
import { ALL_ACHIEVEMENTS } from "../../utils/achievementData"; // adjust path if needed

const { Title } = Typography;

const AchievementsBadgeContainer = ({ earnedAchievementIds }) => {
  const scrollRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 200;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Optional: test popup achievement
  const testAchievement = {
    title: "Achievement Unlocked!",
    description: "You clicked the Test Popup button!",
    iconUrl: "/badges/blue_badge.png",
  };
  console.log("🏁 ALL_ACHIEVEMENTS:", ALL_ACHIEVEMENTS);
console.log("✅ earnedAchievementIds:", earnedAchievementIds);
  return (
    <div className="achievements-wrapper">
      <Title level={4}>Achievements</Title>

      <div className="scroll-arrow-container">
        <button className="arrow-button left" onClick={() => scroll("left")}>
          <LeftOutlined />
        </button>

        <div className="horizontal-scroll" ref={scrollRef}>
          {ALL_ACHIEVEMENTS.map((badge) => {
            const unlocked = earnedAchievementIds.includes(badge.id);
            return (
              <div key={badge.id} className="achievement-card">
                <img
                  className="achievement-img"
                  src={badge.iconUrl}
                  alt={badge.title}
                  style={{
                    filter: unlocked ? "none" : "grayscale(100%) opacity(0.5)",
                  }}
                />
                <p
                  className="achievement-label"
                  style={{ opacity: unlocked ? 1 : 0.5 }}
                >
                  {badge.title}
                </p>
              </div>
            );
          })}
        </div>

        <button className="arrow-button right" onClick={() => scroll("right")}>
          <RightOutlined />
        </button>
      </div>

      {/* 👇 Test Popup Button (Optional) */}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <Button type="primary" onClick={() => setShowPopup(true)}>
          Test Popup
        </Button>
      </div>

      {/* 👇 Popup Component */}
      <AchievementPopup
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        badgeNumber={1} // Adjust this if you want to test different popup content
      />
    </div>
  );
};

export default AchievementsBadgeContainer;