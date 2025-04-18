import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { listMyAchievementsRef } from "../../dataconnect-generated/js/default-connector/esm/index.esm.js";
import { executeQuery } from "@firebase/data-connect";
import { auth } from '../utils/firebaseConfig';

const TestAchievements = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userAchievements'],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      const token = await user.getIdToken();
      const dc = {
        auth: { token },
        connector: 'default',
        service: 'momentum-data-connect',
        location: 'europe-west2'
      };

      console.log("📦 Using UID:", user.uid);
      console.log("🔐 Token:", token);

      const ref = listMyAchievementsRef(dc);
      const result = await executeQuery(ref);

      console.log("🎯 Raw achievement result:", result);
      return result?.data?.userAchievements ?? [];
    },
  });

  if (isLoading) return <p>Loading achievements...</p>;
  if (isError) return <p>Error fetching achievements: {error.message}</p>;

  return (
    <div>
      <h2>User Achievements 🏆</h2>
      {data.length === 0 ? (
        <p>No achievements unlocked yet.</p>
      ) : (
        <ul>
          {data.map(({ achievement, unlockedAt }) => (
            <li key={achievement.id}>
              <img src={achievement.icon} alt={achievement.title} width={40} />
              <strong>{achievement.title}</strong>: {achievement.description}
              <br />
              <em>Unlocked at: {new Date(unlockedAt).toLocaleString()}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestAchievements;
