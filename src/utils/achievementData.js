/**
 * 🚧 Temporary Achievements Data (Front-End Only)
 *
 * This file defines a static list of default achievements for the habit tracker app.
 * It's currently used to build and test the front-end achievements UI (e.g. badges),
 * while backend habit tracking is still in progress by another team member.
 *
 * Once backend data is available (e.g. habit counts per user), this will be replaced
 * with dynamic logic that determines which achievements are unlocked.
 *
 * TL;DR: This is safe to use for now, and won’t interfere with backend or other teammates' work.
 */

export const defaultAchievements = [
    {
      id: "signed_up",
      title: "Signed up!",
      iconUrl: "/badges/blue_badge.png",
      unlocked: true,
    },
    {
      id: "first_good",
      title: "1st good habit",
      iconUrl: "/badges/bronze_badge.png",
      unlocked: false,
    },
    {
      id: "five_good",
      title: "5 good habits achieved",
      iconUrl: "/badges/silver_badge.png",
      unlocked: false,
    },
    {
      id: "ten_good",
      title: "10 good habits achieved",
      iconUrl: "/badges/gold_badge.png",
      unlocked: false,
    },
    {
      id: "first_bad",
      title: "1st bad habit broken",
      iconUrl: "/badges/bronze_badge.png",
      unlocked: false,
    },
    {
      id: "five_bad",
      title: "5 bad habits broken",
      iconUrl: "/badges/silver_badge.png",
      unlocked: false,
    },
    {
      id: "ten_bad",
      title: "10 bad habits broken",
      iconUrl: "/badges/gold_badge.png",
      unlocked: false,
    },
  ];