import { Layout } from 'antd';
import FooterNav from './FooterNav';

const PhoneContainer = ({ children, isSignedIn }) => {
  return (
    <Layout
      style={{
        // minWidth: "320px",
        // maxWidth: "400px",
        width: "100%",
        minHeight: "100vh",
        margin: "0 auto",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F6F9FF",
        // backgroundImage: "url('/purple_background.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    > 
    <div style={{marginBottom: "100px"}}>
    {children}
    </div>
      {isSignedIn && <FooterNav />}
    </Layout>
  );
};

export default PhoneContainer;
