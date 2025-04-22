import React, { useEffect, useState, useRef } from "react";
import {
  listUserAchievements,
  listAchievements,
} from "@firebasegen/default-connector"; // adjust if needed
import { useAuth } from "../../contexts/AuthProvider"; // adjust path if needed
import { Typography, Spin } from "antd";
import { LeftOutlined, RightOutlined,TrophyOutlined, } from "@ant-design/icons";
import "./AchievementsBadgeContainer.css";

const { Title } = Typography;

const AchievementsBadgeContainer = ({ userId: overrideUserId }) => {
  const scrollRef = useRef(null);
  const { userData } = useAuth();
  const [allAchievements, setAllAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔧 Map backend icon paths to shared local assets
  const normalizeIcon = (iconPath) => {
    if (iconPath.includes("bronze")) return "/badges/bronze_badge.png";
    if (iconPath.includes("silver")) return "/badges/silver_badge.png";
    if (iconPath.includes("gold")) return "/badges/gold_badge.png";
    if (iconPath.includes("blue")) return "/badges/blue_badge.png";
    return "/badges/blue_badge.png"; // fallback
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 200;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const effectiveUserId = overrideUserId || userData?.id;
    if (!effectiveUserId) return;

    const fetchData = async () => {
      try {
        const [allRes, unlockedRes] = await Promise.all([
          listAchievements(),
          listUserAchievements({ userId: effectiveUserId }),
        ]);

        const all = allRes.data.achievements || [];
        const unlocked = unlockedRes.data.userAchievements || [];
        const unlockedIds = unlocked.map((ua) => ua.achievement.id);

        // 🎉 Manual signup badge (only for current user)
        const signupBadge = {
          id: "signed_up_manual",
          title: "Signed up!",
          description: "Welcome aboard!",
          iconUrl: "/badges/blue_badge.png",
          unlocked: true,
        };

        const merged = all.map((ach) => ({
          id: ach.id,
          title: ach.title,
          description: ach.description,
          iconUrl: normalizeIcon(ach.icon),
          unlocked: unlockedIds.includes(ach.id),
        }));

        const finalList = overrideUserId ? merged : [signupBadge, ...merged];
        setAllAchievements(finalList);
      } catch (err) {
        console.error("❌ Error loading achievements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData, overrideUserId]);

  if (loading) return <Spin style={{ marginTop: 40 }} />;

  return (
    <div className="achievements-wrapper">
      <Title level={4}>
              <TrophyOutlined style={{ marginRight: '8px', color: '#faad14' }} />
              Achievements
            </Title>

      <div className="scroll-arrow-container">
        <button className="arrow-button left" onClick={() => scroll("left")}>
          <LeftOutlined />
        </button>

        <div className="horizontal-scroll" ref={scrollRef}>
          {allAchievements.map((badge) => (
            <div key={badge.id} className="achievement-card">
              <img
                className="achievement-img"
                src={badge.iconUrl}
                alt={badge.title}
                style={{
                  filter: badge.unlocked
                    ? "none"
                    : "grayscale(100%) opacity(0.5)",
                }}
              />
              <p
                className="achievement-label"
                style={{ opacity: badge.unlocked ? 1 : 0.5 }}
              >
                {badge.title}
              </p>
            </div>
          ))}
        </div>

        <button className="arrow-button right" onClick={() => scroll("right")}>
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export default AchievementsBadgeContainer;
