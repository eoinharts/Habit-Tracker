import { theme } from 'antd';

export const antdConfig = {
  // Disable compatibility warning
  warning: false,
  // Use CSS variables for better performance
  cssVar: true,
  // Disable motion effects
  motion: false,
  // Use the default theme algorithm
  algorithm: theme.defaultAlgorithm,
  token: {
    // Customize theme tokens if needed
    colorPrimary: '#1890ff',
    borderRadius: 6,
  },
  components: {
    // Disable CSS-in-JS hashing for better performance
    Table: {
      algorithm: true,
    },
    Card: {
      algorithm: true,
    },
    Layout: {
      algorithm: true,
    },
  },
};
