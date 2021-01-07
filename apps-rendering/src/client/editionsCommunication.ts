// https://github.com/react-native-webview/react-native-webview/blob/master/src/WebViewTypes.ts#L963
declare global {
	interface Window {
		ReactNativeWebView?: {
			postMessage: (data: string) => void;
		};

		pingEditionsRendering?: (message: Message) => void;
		pingEditionsRenderingJsString?: (message: Message) => string;
	}
}

type ShareMessage = {
	kind: 'share';
};

export type PlatformMessage = {
	kind: 'platform';
	value: Platform;
};

type PlatformQueryMessage = {
	kind: 'platform-query';
};

type Message = ShareMessage | PlatformMessage | PlatformQueryMessage;

export enum Platform {
	IOS = 'IOS',
	Android = 'Android',
}

export const isPlatformMessageEvent = (
	customEvent: CustomEventInit,
): customEvent is CustomEvent<PlatformMessage> => {
	if (
		customEvent.detail?.kind === 'platform' &&
		customEvent.detail?.value in Platform
	) {
		return true;
	}
	return false;
};

const prettyLog = (logMessage: string, data: string | Message): void => {
	const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
	console.log(
		`%c${logMessage}
${JSON.stringify(parsedData, null, 2)}`,
		'color: #45969b;',
	);
};

export const pingEditionsNative = (message: Message): void => {
	const serializedMessage = JSON.stringify(message);

	if (process.env.NODE_ENV === 'development') {
		prettyLog(
			'🎨 => 📲  Pinging Editions native from Editions Rendering with message:',
			serializedMessage,
		);
	}

	window.ReactNativeWebView?.postMessage(serializedMessage);
};

const pingEditionsRendering = (message: Message): void => {
	if (process.env.NODE_ENV === 'development') {
		prettyLog(
			'📱 => 🎨  Pinging Editions Rendering from Editions native with message: ',
			message,
		);
	}

	const customEvent = new CustomEvent('editionsPing', { detail: message });
	document.dispatchEvent(customEvent);
};

export const pingEditionsRenderingJsString = (message: Message): string => {
	return `
        try {
            window.pingEditionsRendering(${JSON.stringify(message)})
        } catch {
            console.error("Editions -> Editions Rendering not initiated")
        }
    `;
};

export const initPingEditionsRendering = (): void => {
	window.pingEditionsRendering = pingEditionsRendering;
	window.pingEditionsRenderingJsString = pingEditionsRenderingJsString;
};
