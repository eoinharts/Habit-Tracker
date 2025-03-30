// cleanup.js
import { debugFriendships, deleteFriend } from './dataconnect-generated/js/default-connector/esm/index.esm.js';

async function cleanupDuplicates() {
  try {
    // Fetch all friendship records
    const debugRes = await debugFriendships({}, { cache: 'no-store' });
    const friendships = debugRes?.data?.friendships || [];
    console.log(`Fetched ${friendships.length} friendship records.`);

    // Create a map of accepted friendship pairs, sorted so that duplicates group together.
    const friendshipMap = {};
    for (const f of friendships) {
      if (f.status !== 'accepted') continue; // Only consider accepted friendships.
      // Create a unique key by sorting the two IDs.
      const pairKey = [f.user1Id, f.user2Id].sort().join('_');
      if (friendshipMap[pairKey]) {
        friendshipMap[pairKey].push(f);
      } else {
        friendshipMap[pairKey] = [f];
      }
    }

    // Iterate over each friendship pair and delete duplicates.
    for (const pairKey in friendshipMap) {
      const rows = friendshipMap[pairKey];
      if (rows.length > 1) {
        console.log(`Duplicate detected for pair ${pairKey}: ${rows.length} records found.`);
        // Keep the first record, delete the rest.
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          try {
            // Try deleting using the key order in the row.
            await deleteFriend({ currentUserId: row.user1Id, friendId: row.user2Id });
            console.log(`Deleted duplicate row: ${row.user1Id} - ${row.user2Id}`);
          } catch (e) {
            console.error(`Failed to delete duplicate row: ${row.user1Id} - ${row.user2Id}`, e);
          }
        }
      }
    }
    console.log('Duplicate cleanup completed.');
  } catch (err) {
    console.error('Error during cleanup:', err);
  }
}

cleanupDuplicates();
