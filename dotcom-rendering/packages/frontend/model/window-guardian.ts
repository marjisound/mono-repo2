// This interface is currently a work in progress.
// Not all attributes will remain and better types will be given as we go along
export interface WindowGuardianConfig {
    googleAnalytics: any;
    images: any;
    libs: any;
    modules: any;
    nav: any;
    ophan: any;
    page: {
        sentryHost: string;
        sentryPublicApiKey: string;
    };
    stylesheets: any;
    switches: any;
    tests: any;
}

// Temporary
// Currently exported, but will be replaced by a function call.
export const windowGuardianConfig = {
    googleAnalytics: null,
    images: null,
    libs: null,
    modules: null,
    nav: null,
    ophan: null,
    page: {
        sentryPublicApiKey: '344003a8d11c41d8800fbad8383fdc50',
        sentryHost: 'app.getsentry.com/35463',
    },
    stylesheets: null,
    switches: null,
    tests: null,
} as WindowGuardianConfig;

export interface WindowGuardian {
    app: {
        data: any;
        cssIDs: string[];
    };
    config: WindowGuardianConfig;
    polyfilled: boolean;
    onPolyfilled: () => void;
}

export const makeWindowGuardian = (
    config: WindowGuardianConfig,
    data: any,
    cssIDs: string[],
): WindowGuardian => {
    return {
        config,
        app: {
            data,
            cssIDs,
        },
        polyfilled: false,
        onPolyfilled: () => null,
    };
};
