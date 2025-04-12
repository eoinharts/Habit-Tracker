import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Segmented } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  createHabit,
  updateHabit,
  updateHabitStreak,
  getUserHabit,
  unlockAchievement
  // OPTIONAL: Import a function to get existing user achievements if you implement that check
  // getUserAchievements
} from "@firebasegen/default-connector"; 
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router";
import AchievementPopup from "../../components/AchievementPopup/AchievementPopup.jsx"; 

// Helper Submit Button (Unchanged from original)
const SubmitButton = ({ form, children, isLoading }) => {
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
    <Button
      type="primary"
      htmlType="submit"
      loading={isLoading}
      disabled={!submittable}
      className="w-100 py-4" 
    >
      {children}
    </Button>
  );
};

// Main Habit Form Component
const HabitForm = ({ initialValues, habitId, isEditing }) => {
  const [form] = Form.useForm();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Achievement Popup State
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupBadgeNumber, setPopupBadgeNumber] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [wasPopupTriggered, setWasPopupTriggered] = useState(false); // Track if popup logic ran

  // --- Achievement Configuration ---
 
  const GOOD_HABIT_ACHIEVEMENTS = {
    1: "d617ec69b4434be1b73acd7866172dff",  // ID for 2 Good Habits
    5: "f51ef17a74614193ba6d45d89b67b7b5",  // ID for 5 Good Habits
    10: "4489c9eba9a7489ca5b2e8631d08f054", // ID for 10 Good Habits
  };

  
  const BAD_HABIT_ACHIEVEMENTS = {
    1: "6808cc372cee4b7e99009615e44103bd", // ID for 1st Bad Habit Logged
    5: "d51da255e6f94da4a42f333ac97b5d9e", // ID for 5 Bad Habits Logged
    10: "4bc71f655a3e4eb4bb0c4e88450e6ede", // ID for 10 Bad Habits Logged
  };
  // --- End Achievement Configuration ---


  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
        form.resetFields(); // Reset form when creating a new habit
    }
  }, [initialValues, form, isEditing]); // Added isEditing dependency

  /**
   * Checks current habit counts against thresholds and attempts to unlock achievements.
   * Sets state to display the popup if an achievement is unlocked or attempted.
   * @param {string} newHabitCategory - The category ("Good Habit" or "Bad Habit") of the newly created habit.
   * @returns {Promise<boolean>} - True if a popup was triggered, false otherwise.
   */
  const checkAndUnlockAchievement = async (newHabitCategory) => {
    let popupWasSet = false;
    try {
      // Fetch the latest habits list AFTER the new one should be saved
      // A small delay might occasionally be needed if backend propagation is slow, but try without first.
      // await new Promise(resolve => setTimeout(resolve, 200));

      const habitsRes = await getUserHabit({ uid: userData.id });
      const allHabits = habitsRes?.data?.habits || [];

      let habitMap, currentCount;
      if (newHabitCategory === "Good Habit") {
        habitMap = GOOD_HABIT_ACHIEVEMENTS;
        currentCount = allHabits.filter(h => h.category === "Good Habit").length;
        console.log("Good Habits Count:", currentCount);
      } else if (newHabitCategory === "Bad Habit") {
        habitMap = BAD_HABIT_ACHIEVEMENTS;
        currentCount = allHabits.filter(h => h.category === "Bad Habit").length;
        console.log("Bad Habits Count:", currentCount);
      } else {
        return false; // Should not happen with current form setup
      }

      const achievementId = habitMap[currentCount];

      if (achievementId) {
        console.log(`Threshold count ${currentCount} reached for ${newHabitCategory}. Attempting unlock...`);
        // --- Optional but Recommended: Check if already unlocked ---
        // This requires another fetch (e.g., getUserAchievements) and might complicate the flow slightly.
        // If implemented, wrap the unlockAchievement call in an 'if (!isAlreadyUnlocked)' block.
        // const userAchievements = await getUserAchievements({ userId: userData.id });
        // const isAlreadyUnlocked = userAchievements?.data?.some(ua => ua.achievementId === achievementId.replaceAll("-",""));
        // if (isAlreadyUnlocked) {
        //    console.log(`Achievement ${achievementId} already unlocked.`);
        //    // Decide if you STILL want to show a popup maybe?
        // } else { ... unlock logic ... }
        // --- End Optional Check ---

        try {
          await unlockAchievement({ userId: userData.id, achievementId });
          const successMsg = newHabitCategory === "Good Habit"
            ? `Unlocked achievement for ${currentCount} good habit(s)!`
            : `Unlocked achievement for ${currentCount} bad habit(s)!`;
          message.success(successMsg);

          // Set state for popup
          setPopupBadgeNumber(currentCount);
          setPopupMessage(newHabitCategory === "Good Habit"
             ? `You have reached ${currentCount} Good Habit(s)!`
             : `You have logged ${currentCount} Bad Habit(s)!`
          );
          setPopupVisible(true);
          popupWasSet = true; // Mark that popup state was set

        } catch (unlockError) {
          // Handle specific duplicate key error gracefully
          if (unlockError.message?.includes("duplicate key value violates unique constraint")) {
             console.warn(`Attempted to unlock achievement ${achievementId} which was already unlocked.`);
             // Decide if you want to show a popup anyway
             // message.info(`You previously unlocked the achievement for ${currentCount} ${newHabitCategory.toLowerCase()}(s)!`);
             // setPopupBadgeNumber(currentCount);
             // setPopupMessage(...);
             // setPopupVisible(true);
             // popupWasSet = true;
          } else {
             console.error("Error unlocking achievement:", unlockError);
             message.error("Failed to unlock achievement. " + (unlockError.message || ""));
          }
        }
      } else {
        console.log(`Count ${currentCount} for ${newHabitCategory} does not match any achievement threshold.`);
      }

    } catch (err) {
      console.error("Error during achievement check process:", err);
      message.error("Failed to check achievement status.");
    }
    return popupWasSet; // Return whether the popup state was modified
  };

  /**
   * Creates the habit and initializes its streak in the database.
   * @returns {Promise<boolean>} - True if habit creation and streak update succeeded, false otherwise.
   */
  const createHabitFunction = async (name, description, category, streakGoal, emoji) => {
    try {
      const res = await createHabit({
        uid: userData.id,
        title: name,
        description: description || "", // Ensure description is not undefined/null
        category,
        streakGoal: Number(streakGoal),
        emoji,
      });
      const newHabitId = res?.data?.habit_insert?.id;
      if (!newHabitId) {
          throw new Error("Failed to get new habit ID after creation.");
      }
      console.log("Created habit id:", newHabitId);

      // Initialize streak
      await updateHabitStreak({
          habitId: newHabitId,
          currentStreak: 0,
          longestStreak: 0,
          // Set last tracked date to yesterday to allow tracking today
          lastTrackedDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      });
      console.log("Streak initialized for habit:", newHabitId);
      message.success("Habit created successfully!");
      return true; // Success

    } catch (error) {
      console.error("Error creating habit or initializing streak:", error);
      if (error.message?.includes("$description (String) is missing")) {
          message.error("Habit creation failed: Description is missing.");
      } else {
         message.error(`Failed to create habit: ${error.message || "Unknown error"}`);
      }
      return false; // Failure
    }
  };

  /**
   * Handles form submission for both creating and editing habits.
   */
  const onFinish = async (values) => {
    const { name, category, description, streakGoal, emoji } = values;
    setIsLoading(true);
    setWasPopupTriggered(false); // Reset popup flag for this submission
    let shouldNavigateImmediately = true; // Assume navigation unless popup occurs

    try {
      if (isEditing) {
        // --- Editing Logic ---
        await updateHabit({
          habitId,
          title: name,
          description: description || "", // Ensure description is not undefined/null
          category,
          streakGoal: Number(streakGoal),
          emoji,
        });
        message.success("Habit updated successfully!");
        // NOTE: Achievement checks are currently only on CREATION.
        // Add call to checkAndUnlockAchievement here if needed for edits.

      } else {
        // --- Creation Logic ---
        const createdSuccessfully = await createHabitFunction(name, description, category, streakGoal, emoji);

        if (createdSuccessfully) {
            // Check for achievements immediately after successful creation
            const popupTriggered = await checkAndUnlockAchievement(category);
            if (popupTriggered) {
                setWasPopupTriggered(true); // Mark that popup logic ran
                shouldNavigateImmediately = false; // Don't navigate yet, wait for popup close
            }
        } else {
            // If creation failed, don't navigate
            shouldNavigateImmediately = false;
        }
      }

      // Navigate only if successful AND no popup was triggered
      if (shouldNavigateImmediately) {
         console.log("Operation successful, no popup triggered. Navigating home.");
         // Use a very short timeout to allow AntD messages to be seen briefly
         setTimeout(() => {
           navigate("/");
         }, 300);
      }

    } catch (error) {
      // Catch errors from updateHabit if isEditing
      console.error("Error during form submission:", error);
      message.error(`Operation failed: ${error.message || "Unknown error"}`);
      shouldNavigateImmediately = false; // Don't navigate on error
    } finally {
        // Ensure loading state is always reset
        setIsLoading(false);
    }
  };

  /**
   * Handles closing the achievement popup and then navigates home.
   */
  const handlePopupClose = () => {
      setPopupVisible(false);
      console.log("Achievement popup closed. Navigating home.");
      // Navigate AFTER closing the popup
      navigate("/");
  }

  // --- Render ---
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        name="habitForm"
        layout="vertical"
        autoComplete="off"
        initialValues={initialValues || { category: "Bad Habit", streakGoal: 7 }} // Sensible defaults
      >
        {/* Habit Name */}
        <Form.Item
          name="name"
          label="Habit Name"
          rules={[{ required: true, message: "Please name your habit!" }]}
        >
          <Input placeholder="e.g., Drink Water, Avoid Snacks" />
        </Form.Item>

        {/* Habit Type */}
        <Form.Item name="category" label="Habit Type">
          <Segmented
            options={["Bad Habit", "Good Habit"]}
            block // Make Segmented full width
          />
        </Form.Item>

        {/* Description (Optional) */}
        <Form.Item
          name="description"
          label="Description (Optional)"
        >
          <TextArea rows={3} placeholder="Add details or motivation (optional)" />
        </Form.Item>

        {/* Streak Goal */}
        <Form.Item
          name="streakGoal"
          label="Streak Goal (Days)"
          rules={[
            { required: true, message: "Set a goal duration!" },
            { type: 'number', min: 1, transform: value => Number(value), message: 'Goal must be at least 1 day'}
          ]}
        >
          <Input type="number" placeholder="e.g., 7, 30, 90" min={1}/>
        </Form.Item>

        {/* Emoji */}
        <Form.Item
          name="emoji"
          label="Emoji Icon"
          rules={[
            { required: true, message: "Choose an emoji!" },
            { max: 2, message: "Emoji should be 1 or 2 characters." }, // Allows for flags etc.
          ]}
        >
          <Input maxLength={2} placeholder="💧, 👍, 🎉" style={{ width: '80px' }}/>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <SubmitButton form={form} isLoading={isLoading}>
            {isEditing ? "Update Habit" : "Add Habit"}
          </SubmitButton>
        </Form.Item>
      </Form>

      {/* Achievement Popup */}
      {/* It only renders when popupVisible is true */}
      <AchievementPopup
        visible={popupVisible}
        onClose={handlePopupClose} // Use the handler that navigates after close
        badgeNumber={popupBadgeNumber}
        customMessage={popupMessage}
      />
    </>
  );
};

export default HabitForm;