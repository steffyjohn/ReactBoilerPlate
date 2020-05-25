const dev = {
    API_BASE: '',
    s3: {
        BUCKET: '',
    },
    SOCIAL_MEDIA: {},
};

const prod = {
    API_BASE: '',
    s3: {
        BUCKET: '',
    },

    SOCIAL_MEDIA: {},
};

const config = process.env.REACT_APP_STAGE === 'production' ? prod : dev;

export default config;
