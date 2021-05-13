module.exports = {
    apps: [{
        name: 'app-name',
        script: 'npm',
        args: 'start',
        ignore_watch: ["node_modules", "logs", "*.log"],
        watch: false,
        env_development: {
            BASE_URL: '',
            NODE_ENV: 'development',
            MONGODB_URI: 'mongodb+srv://adm:pass_word@cluster0.g3gyh.mongodb.net/casper?retryWrites=true&w=majority',
            DATABASE: 'casper',
            VALIDATION_TOKEN: 'bot',
            APP_SECRET_KEY: '718f47c1c0be78005b387e26cb77b8d9',
            PAGE_ACCESS_TOKEN: JSON.stringify([{
                pageId: '242830789813847',
                token: 'EAAH7ZCzwnuywBANouZBIDNAgZAagoL5O4vSUEbUCuDIBgLhFUozDgM6AyYpc2gnh6RgsVcUZBVZBStJT6ptAU6aDnBk0cEKRpJa7iwkoMqeH5ZBLcvoDDrH2Buua0nRJkEcCS8I6KzMwTlHRyF8lAtCULRYAGFHj4qhzz6tM3LcgZDZD'
            }]),
            PORT: 8445,
            PROJECT_ID: 'casper-gwle',
            CLIENT_EMAIL: 'dialogflow-integrations@casper-gwle.iam.gserviceaccount.com',
            PRIVATE_KEY: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDZaWf2HS6kin1M\nyuNFue5/J6S6FebMOLZNChvsz/UDK7LbBd9cMDagqxKzwz/cOJKGgabeSkGIfFBC\n51vswTywNWTdboqjnCY05awQt1CO3z3RDKRwrMK68OhB1FdhAp63xsBXas7uKA9j\noP0o7CetmeaLHlylal8dvtYvWuNrvGh7/Vjuk0rb9lSPrI0O3fbSNBl+c1mQo5kv\n7E9v+QMc9UNyXR/WnTlkyHF6Mx8CxNAwPk+ujdrfFhbbU1G/MOBIOaNgDLVYV1dM\nFrkFTkOh2p/ZjyoR6VpezYs+wQ9wj+oSiXHPxo8RLLcMbiL5UT3Gz+LlObB/c9eS\noMlGy7BpAgMBAAECggEAWKYgpFto0eHATqgpvJwgUcu14MSea6YyOz6EfW6cHnNa\nhfEijsH//EpVIWRbLS4KHPtPsbMAfqkFxwn0UxjF6KmU268/q4+3inkdzGEa4W7I\nk21+vYzMCBLD+VeeW2mIkzHg6qQcBULjZ4HUyDNmyGQI+6/hIfe6GfRe/EcolRwo\n7wUtDnmyJ6xiY7qcRyTpvbU30eKQ+OgW/EGUnshdOb/BX6XQNrCG+be5+2/XuS2f\n13enRA17p1GwGkD8WP3VmZ9+JVmIxc4deEYsncIti5Wbsok4iTiMEL71bCLSAVun\nLeLXNzKygDSH+UvHtIYDgxCR0aI68kSdTEXCsV5uywKBgQDtUFKSZE0MPovArsQm\nDxE7dnT7xRwoIIYj2NrD9aWyi94PLGpVRdbTppx1GgYqZpM/X4dgtCSvRzzn6m00\ni9VFmYTVWP/pLlL89rzX7PSNGYYTiMA2R2NHJE7gWo4qE3qbsSPTNsTTuwYosIxC\nLFHUlNTCR4uYkGcMcumvYHLNewKBgQDqh+gROVJLfxOGLGDsOGG/vDn+M0BRTRSk\nHGGU5qkOHA/vxw9ujNcR2o9e/DmXBMi6NtFRuLCmJ/JToMHM4fIb6Vbj2ibgs0UY\npRG28asp314LPmRJ3hDmbNKiVepJyJyc6Chl3qOwOYe8897XXc0ccKNGkdktsw4U\n0ZSm64sKawKBgGT7+ScyZ1b+hpnHxNAtOTgEgGNizUiGDo7SiMU6kvgXbLcoP1dq\nELCgBZQPLvB8Fcyx6fnMro+n0NMffrkNiAPGADCJXtzrSYU7ucBopOgmJFfLqX9v\ngV+Uo7v0zOo6v8Hg703B0KAIxeYquoSuN2QusRq7NzwEttUlUSu/7xphAoGAYZIT\nAP9o9lGyzLIvzHaUbBEhy1iFHI3F1ZSdIDZqBJ22H5ogGGztmNblqK2kQ+jQnW/q\n22XL0AR0c0hA+DzT3brQ1FBQtlC+oUcjPIoEHJJ57JGTZYvGWibR5ol5xCJ6zWhk\nTiU20jzM9NY8UjsK9xcBRn2s7a89X3nlrx/1I2sCgYBEow6CyNRBWZqct3tn2z6Y\nw9JOH5/uDxnXWdASrQ4x3UnpTgc6sRlFE2U4IEW85w6vI0VQStnxdDp/mTCBLOMk\nvJEE64tsTYnX18UqPmQIEflxHJb/7GRSH87rJd1By9EVAutbb0yxIMHliaWJYaDF\nv6jJNmtV2wiT92xXIQH7Bw==\n-----END PRIVATE KEY-----\n',
            BOT_NAME: 'Casper Staging',
            TRANSPORTER_EMAIL: 'nao-responder@elife.com.br',
            TRANSPORTER_PASS: 'elifebots123',
            GIT_PASS: 'ZeqI7_5H6nF',
            GIT_USER: 'Elifebots'
        },
        env_production: {
            BASE_URL: '',
            NODE_ENV: 'production',
            MONGODB_URI: '',
            DATABASE: '',
            PAGE_ACCESS_TOKEN: JSON.stringify([{
                pageId: '',
                token: ''
            }]),
            VALIDATION_TOKEN: '',
            APP_SECRET_KEY: '',
            PORT: 8445,
            PROJECT_ID: '',
            CLIENT_EMAIL: '',
            PRIVATE_KEY: '',
            BOT_NAME: '',
            TRANSPORTER_EMAIL: 'nao-responder@elife.com.br',
            TRANSPORTER_PASS: 'elifebots123',
            GIT_PASS: 'ZeqI7_5H6nF',
            GIT_USER: 'Elifebots'
        },
    }]
}