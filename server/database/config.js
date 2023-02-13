
const dbConfig = {
    dev: {
        dbName: "wesafe_test",
        dbUser: 'wesafe_user',
        dbHost: "localhost",
        dbDialect: 'mysql',
        dbPassword: 'wesafe@2020',
        dbRewrite:true,
        dbForceRewrite:false,
    },
    live: {
        dbName: "wesafe_test",
        dbUser: 'wesafe_user',
        dbHost: "localhost",
        dbDialect: 'mysql',
        dbPassword: 'wesafe@2020',
        dbRewrite:true,
        dbForceRewrite:false,
    }
    
}

module.exports = dbConfig;