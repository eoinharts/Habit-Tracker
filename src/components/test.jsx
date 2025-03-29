import React, { useEffect } from 'react';
import { debugFriendships, addReverseFriend } from '../../dataconnect-generated/js/default-connector/esm/index.esm.js';
import { auth } from '../utils/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const FixFriendships = () => {
  useEffect(() => {
    const fix = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) return;

        const res = await debugFriendships();
        const all = res?.data?.friendships || [];

        const accepted = all.filter(f => f.status === 'accepted');

        for (const f of accepted) {
          // Skip if reverse already exists
          const reverseExists = all.some(
            r => r.user1Id === f.user2Id && r.user2Id === f.user1Id && r.status === 'accepted'
          );
          if (reverseExists) continue;

          console.log(`🔁 Inserting reverse for ${f.user2Id} -> ${f.user1Id}`);
          try {
            await addReverseFriend({ friendId: f.user1Id });
            console.log(`✅ Inserted reverse for ${f.user2Id} -> ${f.user1Id}`);
          } catch (e) {
            console.error(`❌ Failed reverse insert for ${f.user2Id} -> ${f.user1Id}:`, e);
          }
        }
      });
    };

    fix();
  }, []);

  return <div>Fixing friendships… Check the console for results.</div>;
};

export default FixFriendships;
