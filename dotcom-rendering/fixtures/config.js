const { switches } = require('./switches.js');

module.exports = {
	config: {
		ajaxUrl: 'https://api.nextgen.guardianapps.co.uk',
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		idApiUrl: 'https://idapi.theguardian.com',
		sentryPublicApiKey: '344003a8d11c41d8800fbad8383fdc50',
		sentryHost: 'app.getsentry.com/35463',
		dcrSentryDsn:
			'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
		// Add test switches (see: https://github.com/guardian/dotcom-rendering/pull/1876)
		switches,
		shortUrlId: '/p/4k83z',
		abTests: {},
		dfpAccountId: '',
		commercialBundleUrl:
			'https://assets.guim.co.uk/javascripts/3d3cbc5f29df7c0cdd65/graun.dotcom-rendering-commercial.js',
		revisionNumber: '62cf0d6e4609276d37e09fd596430fbf8b629418',
		isDev: false,
		googletagUrl: '//www.googletagservices.com/tag/js/gpt.js',
		stage: 'DEV',
		frontendAssetsFullURL: 'https://assets.guim.co.uk/',
		hbImpl: {
			prebid: false,
			a9: false,
		},
		adUnit: '/59666047/theguardian.com/film/article/ng',
		isSensitive: false,
		videoDuration: 0,
		edition: '',
		section: '',
		sharedAdTargeting: {},
		keywordIds: '',
		showRelatedContent: false,
		pageId: '',
		webPublicationDate: 1579185778186,
		headline: '',
		author: '',
		keywords: '',
		series: '',
		contentType: '',
		isPaidContent: false,
		discussionD2Uid: 'testD2Header',
		discussionApiClientHeader: 'testClientHeader',
		ampIframeUrl:
			'https://assets.guim.co.uk/data/vendor/a994b749adae30cd58f0e84c8fa28013/amp-iframe.html',
		isPhotoEssay: false,
	},
};
