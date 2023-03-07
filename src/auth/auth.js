import { PublicClientApplication } from '@azure/msal-browser';

const MSALInstance = {
    userId: null,
    msalConfig: new PublicClientApplication({
        auth: {
            clientId: import.meta.env.VITE_APP_CLIENT_ID,
            authority: import.meta.env.VITE_APP_AUTHORITY,
            knownAuthorities: [import.meta.env.VITE_APP_AUTHORITY_DOMAIN],
            redirectUri: window.location.origin,
        },
        cache: {
            cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
            storeAuthStateInCookie: false, // If you wish to store cache items in cookies as well as browser cache, set this to "true".
        },
    }),
    loginRequest: {
        scopes: ['openid'],
    },
    login: function () {
        this.msalConfig.loginRedirect(this.loginRequest);
    },
    logout: function () {
        this.msalConfig.logoutRedirect({
            account: this.msalConfig.getAccountByUsername(this.userId),
            postLogoutRedirectUri: window.location.origin,
        });
    },
    checkAuth: function () {
        return new Promise((resolve, reject) => {
            this.msalConfig
                .handleRedirectPromise()
                .then(res => {
                    if (res) {
                        if (res.idTokenClaims['tfp'].toUpperCase() === import.meta.env.VITE_APP_USER_SIGNIN_SIGNUP_POLICY.toUpperCase()) {
                            this.userId = res.account.homeAccountId;
                            resolve();
                        }
                    } else {
                        const currentAccounts = this.msalConfig.getAllAccounts();
                        if (currentAccounts.length > 0) {
                            this.userId = currentAccounts[0].homeAccountId;
                            resolve();
                        } else {
                            reject();
                        }
                    }
                })
                .catch(e => {
                    reject(e);
                });
        });
    },
};

export default MSALInstance;
