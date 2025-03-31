import { Layout } from 'antd';

const PhoneContainer = ({ children }) => {
  return (
    <Layout
      style={{
        minWidth: "320px",
        maxWidth: "400px",
        width: "100%",
        minHeight: "100vh",
        margin: "0 auto",
        paddingBottom: "70px",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(0,0,0,0.2)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        // backgroundImage: "url('/purple_background.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </Layout>
  );
};

export default PhoneContainer;
