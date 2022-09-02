const config = {
    // stripe public key
    STRIPE_KEY: "pk_test_51H5flFItMT7HUULIJU25K7QSB50g8qqrwLVmK6XST0IrYivMZnU9fL90LBPkmJl4ptLbtlrC0Ux6fFN9K4xmfu8200oZDQbTJl",
    // set max size for attachments
    MAX_ATTACHMENT_SIZE: 5000000,
    // Backend config
    s3: {
      REGION: process.env.REACT_APP_REGION,
      BUCKET: process.env.REACT_APP_BUCKET,
    },
    apiGateway: {
      REGION: process.env.REACT_APP_REGION,
      URL: process.env.REACT_APP_API_URL,
    },
    cognito: {
      REGION: process.env.REACT_APP_REGION,
      USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
      APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
      IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
    },
  };
  
  export default config;