const corsOptions = {
    origin: 'http://localhost', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204 
};

export default corsOptions;
