import React, { useEffect, useState } from "react";
import { listUserAchievements } from "@firebasegen/default-connector";
import { useAuth } from "../contexts/AuthProvider";
import { Spin, Empty, List, Avatar, Typography, message } from "antd";

const { Title, Text } = Typography;

export default function UserAchievements() {
  const { userData } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData?.id) return;

    (async () => {
      setLoading(true);
      try {
        const res = await listUserAchievements({ userId: userData.id });
        setAchievements(res.data.userAchievements || []);
      } catch (err) {
        console.error(err);
        message.error("Failed to load achievements");
      } finally {
        setLoading(false);
      }
    })();
  }, [userData]);

  if (loading) return <Spin style={{ marginTop: 50 }} />;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Your Achievements</Title>
      {achievements.length === 0 ? (
        <Empty description="No achievements unlocked yet" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={achievements}
          renderItem={({ achievement, unlockedAt }) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={achievement.icon} />}
                title={achievement.title}
                description={achievement.description}
              />
              <Text type="secondary">
                {new Date(unlockedAt).toLocaleString()}
              </Text>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
