import { useState } from 'react';
import ReactDOM from 'react-dom';

import { initPerf } from '@root/src/web/browser/initPerf';

type Props = {
	rootId: string;
	children: JSX.Element;
	name?: string;
	waitFor?: unknown[];
};

const isReady = (dependencies: unknown[]): boolean => {
	return dependencies.every((dep) => dep !== undefined);
};

/**
 * Finds the element with the same id as `root` and calls `ReactDOM.hydrate(children, element)`. Only
 * executes once and only after all variables in `waitFor` are defined.
 * @param {String} root - The id of the element to hydrate
 * @param children - The react elements passed to ReactDOM.hydrate()
 * @param {number} index - Used when there are multiple elements the same (eg. RichLinks)
 * @param {Array} waitFor - An array of variables that must be defined before the task is executed
 * */
export const HydrateOnce = ({
	rootId,
	name,
	children,
	waitFor = [],
}: Props) => {
	const [alreadyHydrated, setAlreadyHydrated] = useState(false);
	if (alreadyHydrated) return null;
	if (!isReady(waitFor)) return null;
	const { start, end } = initPerf(`hydrate-${name || rootId}`);
	const element = document.getElementById(rootId);
	if (!element) return null;
	start();
	ReactDOM.hydrate(children, element, () => {
		end();
	});
	setAlreadyHydrated(true);
	return null;
};
