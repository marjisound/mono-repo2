import { Design } from '@guardian/types';

export const decideDesignType = (
	designType: CAPIDesign,
	tags: TagType[],
): Design => {
	if (
		tags.find((tag) => tag.id === 'artanddesign/series/guardian-print-shop')
	) {
		return Design.PrintShop;
	}
	switch (designType) {
		case 'Article':
			return Design.Article;
		case 'Media':
			return Design.Media;
		case 'Review':
			return Design.Review;
		case 'Analysis':
			return Design.Analysis;
		case 'Comment':
			return Design.Comment;
		case 'Feature':
			return Design.Feature;
		case 'Live':
			return Design.Live;
		case 'Recipe':
			return Design.Recipe;
		case 'MatchReport':
			return Design.MatchReport;
		case 'Interview':
			return Design.Interview;
		case 'GuardianView':
			return Design.GuardianView;
		case 'Quiz':
			return Design.Quiz;
		case 'PhotoEssay':
			return Design.PhotoEssay;
		case 'GuardianLabs':
			return Design.Article;
		case 'AdvertisementFeature':
		case 'Immersive':
		case 'SpecialReport':
		default:
			return Design.Article;
	}
};
