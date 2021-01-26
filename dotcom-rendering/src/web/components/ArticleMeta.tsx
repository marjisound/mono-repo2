import React from 'react';
import { css, cx } from 'emotion';
import { border } from '@guardian/src-foundations/palette';
import { between, from, until } from '@guardian/src-foundations/mq';
import { Contributor } from '@root/src/web/components/Contributor';
import { Avatar } from '@root/src/web/components/Avatar';
import { Counts } from '@root/src/web/components/Counts';

import { getSharingUrls } from '@root/src/lib/sharing-urls';
import { Branding } from '@root/src/web/components/Branding';
import { Display, Design, Format } from '@guardian/types';
import { SharingIcons } from './ShareIcons';
import { Dateline } from './Dateline';

type Props = {
	format: Format;
	pageId: string;
	webTitle: string;
	author: AuthorType;
	tags: TagType[];
	primaryDateline: string;
	secondaryDateline: string;
	branding?: Branding;
};

const meta = css`
	${between.tablet.and.leftCol} {
		order: 3;
	}

	${until.mobileLandscape} {
		padding-left: 10px;
		padding-right: 10px;
	}

	${from.mobileLandscape} {
		padding-left: 20px;
		padding-right: 20px;
	}

	${from.phablet} {
		padding-left: 0px;
		padding-right: 0px;
	}

	padding-top: 2px;
`;

const metaFlex = css`
	margin-bottom: 6px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const metaExtras = css`
	border-top: 1px solid ${border.secondary};
	flex-grow: 1;
	padding-top: 6px;

	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
		padding-left: 20px;
		padding-right: 20px;
	}

	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
		padding-left: 10px;
		padding-right: 10px;
	}
`;

const metaNumbers = css`
	border-top: 1px solid ${border.secondary};
	display: flex;
	flex-grow: 1;

	justify-content: flex-end;
	${between.leftCol.and.wide} {
		justify-content: flex-start;
	}

	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
		padding-left: 20px;
		padding-right: 20px;
	}

	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
		padding-left: 10px;
		padding-right: 10px;
	}
`;

const metaContainer = (format: Format) => {
	switch (format.display) {
		case Display.Immersive:
		case Display.Showcase:
		case Display.Standard: {
			switch (format.design) {
				case Design.PhotoEssay:
					return css`
						${until.phablet} {
							margin-left: -20px;
							margin-right: -20px;
						}
						${until.mobileLandscape} {
							margin-left: -10px;
							margin-right: -10px;
						}
						${from.leftCol} {
							margin-left: 20px;
						}
						${from.wide} {
							margin-left: 40px;
						}
					`;
				default:
					return css`
						${until.phablet} {
							margin-left: -20px;
							margin-right: -20px;
						}
						${until.mobileLandscape} {
							margin-left: -10px;
							margin-right: -10px;
						}
					`;
			}
		}
	}
};

const getBylineImageUrl = (tags: TagType[]) => {
	const contributorTag = tags.find((tag) => tag.type === 'Contributor');
	return contributorTag && contributorTag.bylineImageUrl;
};

const getAuthorName = (tags: TagType[]) => {
	const contributorTag = tags.find((tag) => tag.type === 'Contributor');
	return contributorTag && contributorTag.title;
};

const shouldShowAvatar = (format: Format) => {
	switch (format.display) {
		case Display.Immersive:
			return false;
		case Display.Showcase:
		case Display.Standard: {
			switch (format.design) {
				case Design.Feature:
				case Design.Review:
				case Design.Recipe:
				case Design.Interview:
					return true;
				default:
					return false;
			}
		}
	}
};

const shouldShowContributor = (format: Format) => {
	switch (format.display) {
		case Display.Immersive:
			return false;
		case Display.Showcase:
		case Display.Standard: {
			switch (format.design) {
				case Design.Comment:
				case Design.GuardianView:
					return false;
				default:
					return true;
			}
		}
	}
};

const AvatarContainer = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
			width: 140px;
			height: 140px;
			margin-top: 6px;
			margin-right: 10px;
			margin-bottom: 12px;
			margin-left: 0px;

			${until.leftCol} {
				width: 60px;
				height: 60px;
				margin-top: 3px;
				margin-right: 10px;
				margin-bottom: 12px;
				margin-left: 0px;
			}
		`}
	>
		{children}
	</div>
);

const RowBelowLeftCol = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
			display: flex;
			flex-direction: column;

			${until.leftCol} {
				flex-direction: row;
			}
		`}
	>
		{children}
	</div>
);

export const ArticleMeta = ({
	branding,
	format,
	pageId,
	webTitle,
	author,
	tags,
	primaryDateline,
	secondaryDateline,
}: Props) => {
	const sharingUrls = getSharingUrls(pageId, webTitle);
	const bylineImageUrl = getBylineImageUrl(tags);
	const authorName = getAuthorName(tags);

	const onlyOneContributor: boolean =
		tags.filter((tag) => tag.type === 'Contributor').length === 1;

	const showAvatar = onlyOneContributor && shouldShowAvatar(format);
	return (
		<div className={metaContainer(format)}>
			<div className={cx(meta)}>
				{branding && (
					<Branding branding={branding} pillar={format.theme} />
				)}
				<RowBelowLeftCol>
					<>
						{showAvatar && bylineImageUrl && (
							<AvatarContainer>
								<Avatar
									imageSrc={bylineImageUrl}
									imageAlt={authorName || 'Author image'}
									format={format}
								/>
							</AvatarContainer>
						)}
						<div>
							{shouldShowContributor(format) && (
								<Contributor
									design={format.design}
									author={author}
									tags={tags}
									pillar={format.theme}
								/>
							)}
							<Dateline
								primaryDateline={primaryDateline}
								secondaryDateline={secondaryDateline}
							/>
						</div>
					</>
				</RowBelowLeftCol>
				<div data-print-layout="hide" className={metaFlex}>
					<div className={metaExtras}>
						<SharingIcons
							sharingUrls={sharingUrls}
							pillar={format.theme}
							displayIcons={['facebook', 'twitter', 'email']}
						/>
					</div>
					<div className={metaNumbers}>
						<Counts>
							{/* The meta-number classname is needed by Counts.tsx */}
							<div
								className="meta-number"
								id="share-count-root"
							/>
							<div
								className="meta-number"
								id="comment-count-root"
							/>
						</Counts>
					</div>
				</div>
			</div>
		</div>
	);
};
