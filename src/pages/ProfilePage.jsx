import React, { useState, useEffect } from "react";
import {
  Typography,
  Tabs,
  Avatar,
  List,
  Badge,
  Button,
  message,
  Popconfirm,
  Modal,
} from "antd";
import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  listMyAchievements,
  listUserAchievements,
  listFriends,
  deleteFriend, // Updated import
  removeReverseFriend,
  acceptFriendRequest,
  declineFriendRequest,
  debugFriendships,
} from "../../dataconnect-generated/js/default-connector/esm/index.esm.js";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import SelectFriendList from "../components/SelectFriendList";
import SelectAchievementList from "../components/SelectAchievementList";
import HeaderContainer from "../components/HeaderContainer.jsx";
import AchievementsBadgeContainer from "../components/AchievementsBadgeContainer/AchievementsBadgeContainer";
import AchievementPopup from "../components/AchievementPopup/AchievementPopup.jsx";
import { ALL_ACHIEVEMENTS } from "../utils/achievementData";
const { Title, Text } = Typography;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState({ accepted: [], pending: [] });
  const [achievements, setAchievements] = useState(ALL_ACHIEVEMENTS);
  const [userPoints, setUserPoints] = useState(0);
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const showResetPopupButton = true; // Change to false or remove for production
  const [bronzePopupVisible, setBronzePopupVisible] = useState(false);
  const [earnedAchievementIds, setEarnedAchievementIds] = useState([]);
  
  const navigate = useNavigate();
  console.log("Achievements in ProfilePage:", achievements);

  const fetchUserData = async (userId) => {
   
    try {
      console.log("🔄 fetchUserData triggered for user:", userId);
      console.log("👤 Current Firebase user ID:", userId); // ✅ Add this line
      console.log("📡 About to fetch all user data...");

const debugPromise = debugFriendships({}, { cache: "no-store" });
const userDetailsPromise = getUserDetails({ userId });
const achievementsPromise = listUserAchievements({ userId }) // <- pass manually
  .then((res) => {
    console.log("🧪 listUserAchievements fallback result:", res);
    return res;
  })
  .catch((err) => {
    console.error("❌ Error fetching achievements:", err);
    return { data: { userAchievements: [] } }; // fail-safe fallback
  });
  
const [debugRes, userDetailsRes, userAchievementsRes] = await Promise.all([
  debugPromise,
  userDetailsPromise,
  achievementsPromise,
]);
console.log("⚠️ Reached after listUserAchievements call");
const extractedUserData = userDetailsRes?.data?.users?.[0];

if (!extractedUserData) {
  console.warn("🛑 No user details found in userDetailsRes:", userDetailsRes);
  setUserData(null);
  return; // Exit early to avoid crashing below
}

setUserData(extractedUserData);
      const allDebug = debugRes?.data?.friendships || [];
      console.log("🚨 Raw listMyAchievements result:", userAchievementsRes);
      const unlockedAchievements = userAchievementsRes?.data?.userAchievements || [];
  
      // 🧠 Extract just the IDs (adjust the key if needed — sometimes it's "achievementId")
      const earnedIds = unlockedAchievements.map((a) => a.achievement_id);
  
      console.log("🎯 Earned Achievement IDs:", earnedIds);
  
      // Friend Mapping (unchanged)
      const accepted = await Promise.all(
        allDebug
          .filter(
            (f) =>
              f.status === "accepted" &&
              (f.user1Id === userId || f.user2Id === userId)
          )
          .map(async (f) => {
            const isUser1 = f.user1Id === userId;
            const friendId = isUser1 ? f.user2Id : f.user1Id;
            const detailsRes = await getUserDetails({ userId: friendId });
            const friendUser = detailsRes?.data?.users?.[0];
            return {
              ...f,
              id: friendId,
              friendDetails: friendUser || { id: friendId, email: "unknown" },
            };
          })
      );
  
      const pending = await Promise.all(
        allDebug
          .filter(
            (f) =>
              f.status === "pending" &&
              (f.user1Id === userId || f.user2Id === userId)
          )
          .map(async (f) => {
            const isReceived = f.user2Id === userId;
            const friendId = isReceived ? f.user1Id : f.user2Id;
            const detailsRes = await getUserDetails({ userId: friendId });
            const friendUser = detailsRes?.data?.users?.[0];
            return {
              ...f,
              isIncoming: isReceived,
              friendDetails: friendUser || { id: friendId, email: "unknown" },
              id: friendId,
            };
          })
      );
  
      const deduplicateById = (arr) => {
        return arr.filter((item, index, self) =>
          index === self.findIndex((t) => t.id === item.id)
        );
      };
  
      const uniqueAccepted = deduplicateById(accepted);
  
      setFriends({ accepted: uniqueAccepted, pending });
      const earnedAchievements = ALL_ACHIEVEMENTS.filter((ach) =>
        earnedIds.includes(ach.id)
      );
      setAchievements(earnedAchievements);
      setUserPoints(extractedUserData.totalPoints || 0);
    } catch (err) {
      console.error("❌ Error loading profile:", err);
      message.error("Failed to load profile data");
    }
  };
  useEffect(() => {
    const fetchAchievements = async () => {
      if (!userData?.id) return;
      try {
        console.log("⏳ Fetching achievements for:", userData.id);
        const response = await listMyAchievements(); // no args needed for "my" achievements
        console.log("🎯 listMyAchievements raw response:", response);
        
        const unlocked = response?.data?.userAchievements || [];
        const ids = unlocked.map((a) => a.achievement_id);
  
        console.log("✅ Earned achievements loaded:", unlocked);
        setEarnedAchievementIds(ids);
      } catch (err) {
        console.error("❌ Failed to fetch achievements:", err);
      }
    };
    fetchAchievements();
  }, [userData?.id]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/auth");
      } else {
        setUser(currentUser);
        await fetchUserData(currentUser.uid);

        if (!localStorage.getItem("signedUpPopupShown")) {
          setTimeout(() => setPopupVisible(true), 1000); // delay to make it look smooth
          localStorage.setItem("signedUpPopupShown", "true");
        }
        
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleRemoveFriend = async (friendId) => {
    console.log("🗑️ Attempting to remove friend:", friendId);
    let removed = false;

    try {
      const result1 = await deleteFriend({
        currentUserId: user?.uid,
        friendId,
      });
      console.log("✅ Removed (attempt #1):", result1);
      removed = true;
    } catch (err1) {
      console.warn("↩️ Failed (attempt #1), trying reverse:", err1);
      try {
        const result2 = await removeReverseFriend({ friendId });
        console.log("✅ Removed (attempt #2):", result2);
        removed = true;
      } catch (err2) {
        console.error("❌ Remove failed both directions:", err2);
        message.error("Could not remove friend");
        return;
      }
    }

    if (removed) {
      message.success("Friend removed");
      setFriends((prev) => ({
        ...prev,
        accepted: prev.accepted.filter((f) => f.id !== friendId),
      }));
      await fetchUserData(user?.uid);
    }
  };

  const handleAcceptFriend = async (friendId) => {
    // 1) Optimistically move the friend in local state:
    setFriends((prev) => {
      const movedFriend = prev.pending.find((p) => p.id === friendId);
      return {
        ...prev,
        pending: prev.pending.filter((p) => p.id !== friendId),
        accepted: [...prev.accepted, movedFriend],
      };
    });

    // 2) Then call the backend
    try {
      await acceptFriendRequest({ user1Id: friendId, user2Id: user.uid });

      await fetchUserData(user.uid);
      message.success("Friend request accepted");
    } catch (err) {
      // If error, revert local state or show error
      console.error("Error accepting friend:", err);
      message.error("Failed to accept request");
    }
  };

  // Decline a pending friend request
  const handleDeclineFriend = async (friendId) => {
    const user1Id = friendId; // the requester’s ID
    const user2Id = user?.uid; // the current user
    try {
      await declineFriendRequest({ user1Id, user2Id });
      await fetchUserData(user.uid);
      message.success("Friend request declined");
    } catch (err) {
      console.error("Error declining friend request:", err);
      message.error("Failed to decline request");
    }
  };

  if (loading) return <div>Loading...</div>;

  const items = [
    {
      key: "1",
      label: "Friends",
      children: (
        <>
          <Button
            onClick={() => setShowFriendsModal(true)}
            type="primary"
            style={{ marginBottom: 16 }}
          >
            Add Friends
          </Button>
          <List
            dataSource={friends.accepted}
            renderItem={(friend) => (
              <List.Item
                actions={[
                  <Button
                    icon={<EyeOutlined />}
                    onClick={() => navigate(`/friend/${friend.id}`)}
                  >
                    View
                  </Button>,
                  <Popconfirm
                    title="Remove this friend?"
                    onConfirm={() => handleRemoveFriend(friend.id)}
                  >
                    <Button icon={<DeleteOutlined />} danger />
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={
                    friend.friendDetails?.email ||
                    friend.friendDetails?.id ||
                    "Unknown"
                  }
                />
              </List.Item>
            )}
            locale={{ emptyText: "No friends" }}
          />
        </>
      ),
    },
    {
      key: "2",
      label: "Pending Requests",
      children: (
        <List
          dataSource={friends.pending}
          renderItem={(friend) => (
            <List.Item
              actions={
                friend.isIncoming
                  ? [
                      <Button
                        type="primary"
                        onClick={() => handleAcceptFriend(friend.id)}
                      >
                        Accept
                      </Button>,
                      <Button
                        danger
                        onClick={() => handleDeclineFriend(friend.id)}
                      >
                        Decline
                      </Button>,
                    ]
                  : null
              }
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={friend.friendDetails?.email || friend.id}
                description={
                  friend.isIncoming ? "Sent you a request" : "Request sent"
                }
              />
            </List.Item>
          )}
          locale={{ emptyText: "No pending requests" }}
        />
      ),
    },
  ];
  console.log("🏅 Earned Achievements:", achievements);
  console.log("🏅 Earned Achievement IDs:", achievements.map(a => a.id));
  return (
    <>
      <HeaderContainer title="Your Profile" />
      <div style={{ padding: "0 12px", flex: 1 }}>
  <div style={{ width: "100%" }}>


          {/* Profile Card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "24px",
              background: "#fff",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Avatar
              size={80}
              src={user?.photoURL}
              icon={!user?.photoURL && <UserOutlined />}
              style={{ marginBottom: "12px" }}
            />
            <Title level={4} style={{ margin: 0 }}>
              {user?.displayName || user?.email}
            </Title>
            <Text type="secondary">{user?.email}</Text>
            <Badge
              count={userPoints}
              overflowCount={999}
              style={{ backgroundColor: "#3B82F6", marginTop: "8px" }}
            >
              <Text style={{ marginLeft: "8px" }}>Total Points</Text>
            </Badge>
          </div>

          {/* Tabs */}
          <Tabs
            defaultActiveKey="1"
            items={items}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          />
          
{/* Achievement Badges Section */}

<AchievementsBadgeContainer earnedAchievementIds={achievements.map((a) => a.id)} />
        </div>

        {/* Modals */}
        <Modal
          title="Add Friends"
          open={showFriendsModal}
          onCancel={() => setShowFriendsModal(false)}
          footer={null}
          width={600}
        >
          <SelectFriendList
            userId={user?.uid}
            onSuccess={() => {
              fetchUserData(user.uid);
              setShowFriendsModal(false);
            }}
            onClose={() => setShowFriendsModal(false)}
          />
        </Modal>

        <Modal
          title="Add Achievements"
          open={showAchievementsModal}
          onCancel={() => setShowAchievementsModal(false)}
          footer={null}
          width={600}
        >
          <SelectAchievementList
            userId={user?.uid}
            onSuccess={() => {
              fetchUserData(user.uid);
              setShowAchievementsModal(false);
            }}
            onClose={() => setShowAchievementsModal(false)}
          />
         
        </Modal>
        <AchievementPopup
  visible={popupVisible}
  onClose={() => setPopupVisible(false)}
  badgeImage="/badges/blue_badge.png"
  title="Welcome Aboard! 🚀"
  message="You've officially signed up and started your habit journey!"
/>
<AchievementPopup
  visible={bronzePopupVisible}
  onClose={() => setBronzePopupVisible(false)}
  badgeImage="/badges/bronze_badge.png"
  title="You're on Your Way! 🌟"
  message="You’ve just crushed your first habit milestone — keep that momentum going!"
/>
{showResetPopupButton && (
  <div style={{ textAlign: "center", marginTop: 20 }}>
    <Button
      type="dashed"
      onClick={() => {
        localStorage.removeItem("signedUpPopupShown");
        localStorage.removeItem("bronzePopupShown");
        message.success("Popup reset! Refresh the page to test.");
      }}
    >
      🔁 Reset Achievement Popup
    </Button>
    <Button
  onClick={() => {
    // 1. Show the popup
    setBronzePopupVisible(true);

    // 2. Mark the badge as unlocked in state
    setAchievements((prev) =>
      prev.map((a) =>
        a.id === "first_good" ? { ...a, unlocked: true } : a
      )
    );

    // 3. Optional: set localStorage for future backend simulation
    localStorage.setItem("bronzePopupShown", "true");
  }}
  type="dashed"
  style={{ marginTop: "12px" }}
>
  🧪 Show Bronze Achievement Popup
</Button>
  </div>
)}
      </div>
    </>
    
  );
};

export default ProfilePage;
