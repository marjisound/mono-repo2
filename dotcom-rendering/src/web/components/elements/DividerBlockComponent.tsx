import { css, cx } from 'emotion';

import { from } from '@guardian/src-foundations/mq';
import { border } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';

type Props = {
	size?: 'full' | 'partial';
	spaceAbove?: 'tight' | 'loose';
};

const baseStyles = css`
	height: 1px;
	border: 0;
	margin-bottom: 3px;
	background-color: ${border.secondary};
`;
const sizeFullStyle = css`
	width: 100%;
	${from.tablet} {
		margin-left: -20px;
		width: calc(100% + 20px);
	}
	${from.leftCol} {
		margin-left: -10px;
		width: calc(100% + 10px);
	}
`;
const sizePartialStyle = css`
	width: 150px;
	margin-left: 0px;
	${from.tablet} {
		margin-left: -20px;
	}
	${from.leftCol} {
		margin-left: -10px;
	}
`;

const tightSpaceAboveStyle = css`
	margin-top: ${space[6]}px;
`;
const looseSpaceAboveStyle = css`
	margin-top: ${space[12]}px;
`;

export const DividerBlockComponent = ({
	size = 'partial',
	spaceAbove = 'loose',
}: Props) => (
	<hr
		className={cx(
			baseStyles,
			size === 'partial' ? sizePartialStyle : sizeFullStyle,
			spaceAbove === 'loose'
				? looseSpaceAboveStyle
				: tightSpaceAboveStyle,
		)}
	/>
);
