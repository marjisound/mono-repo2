import { Design, Display, Pillar } from '@guardian/types';

import { RichLink } from '@root/src/web/components/RichLink';

type DefaultProps = {
	index: number;
	headlineText: string;
	url: string;
	isPlaceholder?: boolean;
};

export const DefaultRichLink: React.FC<DefaultProps> = ({
	index,
	headlineText,
	url,
	isPlaceholder,
}) => {
	return (
		<RichLink
			richLinkIndex={index}
			cardStyle="news"
			thumbnailUrl=""
			headlineText={headlineText}
			contentType="article"
			url={url}
			format={{
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.News,
			}}
			tags={[]}
			sponsorName=""
			isPlaceholder={isPlaceholder}
		/>
	);
};
