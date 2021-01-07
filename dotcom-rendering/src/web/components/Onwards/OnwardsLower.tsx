import React from 'react';

import { joinUrl } from '@root/src/web/lib/joinUrl';
import { OnwardsData } from './OnwardsData';
import { OnwardsLayout } from './OnwardsLayout';

type Props = {
	ajaxUrl: string;
	hasStoryPackage: boolean;
	tags: TagType[];
	pillar: CAPIPillar;
	design: Design;
};

export const OnwardsLower = ({
	ajaxUrl,
	hasStoryPackage,
	tags,
	pillar,
	design,
}: Props) => {
	// In this context, Blog tags are treated the same as Series tags
	const seriesTag = tags.find(
		(tag) => tag.type === 'Series' || tag.type === 'Blog',
	);

	let url;
	let ophanComponentName: OphanComponentName = 'default-onwards';

	if (hasStoryPackage && seriesTag) {
		// Use the series tag to get other data in the same series
		// Example: {
		//              id: "cities/series/the-illustrated-city",
		//              title: "The illustrated city",
		//              type: "Series",
		//          }
		//
		url = joinUrl([ajaxUrl, 'series', `${seriesTag.id}.json?dcr`]);
		ophanComponentName = 'series';
	}

	if (!url) return null;

	return (
		<OnwardsData
			url={url}
			limit={4}
			ophanComponentName={ophanComponentName}
			Container={OnwardsLayout}
			pillar={pillar}
		/>
	);
};
