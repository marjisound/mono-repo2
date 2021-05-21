import { css } from 'emotion';
import { unescapeData } from '@root/src/lib/escapeData';
import { textSans } from '@guardian/src-foundations/typography';
import { palette, space } from '@guardian/src-foundations';

type Props = {
	body: string;
	avatarURL: string;
	profileURL: string;
	profileName: string;
	dateTime: string;
	permalink: string;
};

const commentWrapperStyles = css`
	${textSans.medium()};
	border-left: 1px ${palette.neutral[86]} solid;
	border-top: 1px ${palette.neutral[86]} solid;
	padding-top: ${space[1]}px;
	padding-left: ${space[2]}px;
	margin-top: ${space[3]}px;
`;

const bodyContentStyles = css`
	p {
		word-break: break-word;
		margin-bottom: ${space[2]}px;
	}
`;

const profileWrapperStyles = css`
	display: flex;
	margin-top: ${space[4]}px;
	margin-bottom: ${space[12]}px;
	/* in order to overwrite the a tag style we had to add a second class to give higher order specificity */
	& > a.avatarLink {
		border-bottom: none;
	}

	& > a.avatarLink:hover {
		border-bottom: none;
	}
`;

const usernameWrapperStyles = css`
	display: flex;
	flex-direction: column;
	height: ${space[12]}px;
	/* in order to overwrite the a tag style we had to add a second class to give higher order specificity */
	& > a.permalink {
		color: ${palette.neutral[46]};
		border-bottom: none;
	}
	& > a.permalink:hover {
		color: ${palette.neutral[46]};
		border-bottom: 1px solid ${palette.neutral[46]};
	}
`;

const avatarStyles = css`
	width: ${space[12]}px;
	height: ${space[12]}px;
	margin-right: ${space[2]}px;
`;

const imageStyles = css`
	border-radius: 50%;
	width: 100%;
	height: 100%;
`;

export const CommentBlockComponent = ({
	body,
	avatarURL,
	profileURL,
	profileName,
	dateTime,
	permalink,
}: Props) => {
	return (
		<div className={commentWrapperStyles}>
			<div
				className={bodyContentStyles}
				dangerouslySetInnerHTML={{ __html: unescapeData(body) }}
			/>
			<div className={profileWrapperStyles}>
				<a
					// TODO: remove avatarLink
					className={`${avatarStyles} avatarLink`}
					href={profileURL}
					aria-hidden="true"
				>
					<img className={imageStyles} src={avatarURL} alt="avatar" />
				</a>
				<div className={usernameWrapperStyles}>
					<a
						className={css`
							${textSans.medium({ fontWeight: 'bold' })};
							width: max-content;
						`}
						href={profileURL}
					>
						{profileName}
					</a>
					{/* TODO: remove permalink */}
					<a href={permalink} className="permalink">
						<time
							className={css`
								${textSans.small()};
							`}
						>
							{dateTime}
						</time>
					</a>
				</div>
			</div>
		</div>
	);
};
