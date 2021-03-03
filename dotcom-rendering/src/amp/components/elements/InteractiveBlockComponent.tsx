import React from 'react';
import { css } from 'emotion';
import { ShowMoreButton } from '@root/src/amp/components/ShowMoreButton';

const styles = css`
	height: 100px;
	width: 100%;
	margin-top: 16px;
	margin-bottom: 12px;
`;

const showMore = css`
	&[overflow] {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
`;

export const InteractiveBlockComponent: React.SFC<{
	url?: string;
	isMandatory?: boolean;
}> = ({ url, isMandatory }) => {
	// If this element is mandatory, we don't know if we can render it properly, so we have to
	// throw an error and chuck the whole page out of AMP. You're barred son.
	if (isMandatory) {
		throw new Error(
			'This page cannot be rendered due to incompatible content that is marked as mandatory.',
		);
	}

	if (!url) {
		return null;
	}

	return (
		<amp-iframe
			class={styles}
			src={url}
			layout="responsive"
			sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups"
			height="1"
			width="1"
			resizable=""
			data-cy="atom-embed-url"
		>
			<div overflow="" className={showMore}>
				<ShowMoreButton />
			</div>
		</amp-iframe>
	);
};
