import { useEffect } from "react";
import { acceptFriendRequest } from "../dataconnect-generated/js/default-connector/esm/index.esm";

const TestFriendMutation = () => {
  useEffect(() => {
    const test = async () => {
      const res = await acceptFriendRequest(undefined, {
        user1Id: "aIkn68rRQSXaemwr3v12e5KmuJ",
        user2Id: "edzexwtTAUTrxELdefOEOlwYXz"
      });
      console.log("✅ SUCCESS:", res);
    };

    test().catch((err) => {
      console.error("🔥 DIRECT CALL FAILED:", err);
    });
  }, []);

  return <div>Running friend mutation test...</div>;
};

export default TestFriendMutation;
