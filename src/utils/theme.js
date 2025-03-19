
// This is the ant design theme configuration of our projects design / colour scheme

import { Button, Progress } from "antd";

// Learnt from: https://ant.design/docs/react/customize-theme
export const theme = {
	components: {
		Menu: {
			itemColor: "#848D9F",
			itemSelectedColor: "#06235c",
			activeBarHeight: 0,
		},
		Table: {
			headerBg: "#FFFFFF",
			borderColor: "#E0E3EA",
			headerSplitColor: "transparent",
			headerColor: "#848D9F",
			borderRadius: 0,
		},
		Segmented: {
			trackBg: "#f5f5f5",
			colorText: "#3843FF",
			borderRadius: 16,
			borderRadiusSM: 16,
		},
		Progress: {
			defaultColor: "#3843FF",
		},
		Typography: {
			colorTextSecondary: "#848D9F",
		},
		Button :{
			
		}
	},
	token: {
		// Seed Token
		colorPrimary: "#54A0FF",
		colorBgLayout: "transparent",
		colorText: "#292D32",
		colorTextDescription: "#7F879E",
		borderRadiusLG: 16,

		// Alias Token
		// colorBgContainer: "#FFFFFF",
		fontFamily:
			"-apple-system, BlinkMacSystemFont, 'Montserrat', 'Inter', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
	},
};