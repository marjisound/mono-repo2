// ----- Imports ----- //

import { Content } from '@guardian/content-api-models/v1/content';
import { ContentType } from '@guardian/content-api-models/v1/contentType';
import { Tag } from '@guardian/content-api-models/v1/tag';
import { TagType } from '@guardian/content-api-models/v1/tagType';
import { BlockElement} from '@guardian/content-api-models/v1/blockElement';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import { CapiDateTime } from '@guardian/content-api-models/v1/capiDateTime'
import { Option, fromNullable, andThen, none, some, map } from '@guardian/types/option';
import { fromString as dateFromString } from 'date';
import { Context } from 'types/parserContext';
import { parseImage } from 'image';
import { parseVideo } from 'video';
import { MainMediaKind, MainMedia } from 'headerMedia';
import { pipe2 } from 'lib';
import { isAdvertisementFeature } from 'item';
import { Block } from '@guardian/content-api-models/v1/block';


// ----- Lookups ----- //

interface Series {
    webTitle?: string;
    webUrl?: string;
}

interface Logo {
    src: string;
    url: string;
    alt: string;
}

const tagsOfType = (tagType: TagType) => (tags: Tag[]): Tag[] =>
    tags.filter((tag: Tag) => tag.type === tagType);

const isImmersive = (content: Content): boolean =>
    content?.fields?.displayHint === 'immersive';

const isInteractive = (content: Content): boolean =>
    content.type === ContentType.INTERACTIVE;

const isPhotoEssay = (content: Content): boolean =>
    content?.fields?.displayHint === 'photoEssay';

const isFeature = (content: Content): boolean =>
    content.tags.some(tag => tag.id === 'tone/features');

const isReview = (content: Content): boolean =>
    [0,1,2,3,4,5].includes(content?.fields?.starRating ?? -1)

const isAnalysis = (content: Content): boolean =>
    content.tags.some(tag => tag.id === 'tone/analysis');

const articleSeries = (content: Content): Option<Tag> => {
    const type = isAdvertisementFeature(content.tags) ? TagType.PAID_CONTENT : TagType.SERIES;
    return fromNullable(tagsOfType(type)(content.tags)[0]);
}

const articleContributors = (content: Content): Tag[] =>
    tagsOfType(TagType.CONTRIBUTOR)(content.tags);

const isImage = (elem: BlockElement): boolean =>
    elem.type === ElementType.IMAGE;

const isVideo = (elem: BlockElement): boolean =>
    elem.type === ElementType.CONTENTATOM &&
    elem.contentAtomTypeData?.atomType === "media";

const articleMainImage = (content: Content): Option<BlockElement> =>
    fromNullable((content?.blocks?.main?.elements.filter(isImage) ?? [])[0]);

const articleMainVideo = (content: Content): Option<BlockElement> =>
    fromNullable((content?.blocks?.main?.elements.filter(isVideo) ?? [])[0]);

const articleMainMedia = (content: Content, context: Context): Option<MainMedia> => {
    return (content?.blocks?.main?.elements.filter(isImage) ?? [])[0]
        ? pipe2(
            articleMainImage(content),
            andThen(parseImage(context)),
            map(image => ({
                kind: MainMediaKind.Image,
                image
            })))
        : pipe2(
            articleMainVideo(content),
            andThen(blockElement => parseVideo(blockElement, content.atoms)),
            map(video => ({
                kind: MainMediaKind.Video,
                video
            })))
}


  type ThirdPartyEmbeds = {
    twitter: boolean;
    youtube: boolean;
    instagram: boolean;
    spotify: boolean;
  };
  
  const noThirdPartyEmbeds: ThirdPartyEmbeds = {
    twitter: false,
    youtube: false,
    instagram: false,
    spotify: false,
  };
  
  
  const checkForThirdPartyEmbed = (thirdPartyEmbeds: ThirdPartyEmbeds, element: BlockElement): ThirdPartyEmbeds => {
    // console.log(element);
    
    switch (element.type) {
  
      case ElementType.INSTAGRAM:
          return { ...thirdPartyEmbeds, instagram: true };
  
      case ElementType.TWEET:
          return { ...thirdPartyEmbeds, twitter: true };
  
      case ElementType.VIDEO:
          return { ...thirdPartyEmbeds, youtube: true };
  
      case ElementType.AUDIO:
          return { ...thirdPartyEmbeds, spotify: true };
  
      default:
        return thirdPartyEmbeds;
  
  }
}

const checkForThirdPartyEmbedsInner = (thirdPartyEmbeds: ThirdPartyEmbeds, block: Block): ThirdPartyEmbeds => {
    // console.log('::>>::',block.elements[0]);
    console.log('::>>::',block.elements[1]);
    console.log('SEEEEEE!',thirdPartyEmbeds);
    
    return block.elements.reduce(checkForThirdPartyEmbed, thirdPartyEmbeds);
}

const getThirdPartyEmbeds = (content: Content): any => {
    const body = content?.blocks?.body;
    // console.log(body?.length);
    console.log(content.blocks?.body)
    
    if (!body) {
        return false
    }

    let mappedElems = body.map(el => el.elements)
    console.log('>>>----------->>>>',mappedElems);
    
    let allThirdPartyEmbeds = body.reduce(
        //(thirdPartyEmbeds, block) => block.elements.reduce(checkForThirdPartyEmbed, thirdPartyEmbeds),
        checkForThirdPartyEmbedsInner,
        noThirdPartyEmbeds,
    );

    // body.reduce(
    //     (thirdPartyEmbeds, block) => block.elements.reduce(checkForThirdPartyEmbed, thirdPartyEmbeds),
    //     noThirdPartyEmbeds,
    //   );
    return allThirdPartyEmbeds;
}

// To test this, you would need to provide at least the following inputs:
// 1. A body with no blocks
// 2. A body with a single block, no elements with special types
// 3. A body with multiple blocks, each block has an element with a different special type,
// e.g. block 1 has an element with a tweet, block 2 has an element with a youtube video
// 4. A body with one block, that has multiple elements with different types


const includesTweets = (content: Content): boolean => {
    const body = content?.blocks?.body;
    
    if (!body) {
        return false
    }

    return body
        .flatMap(block => block.elements.some(element => element.type === ElementType.TWEET))
        .some(Boolean)
        
}

const includesInstagram = (content: Content): boolean => {
    const body = content?.blocks?.body;

    if (!body) {
        return false
    }

    return body
        .flatMap(block => block.elements.some(element => element.type === ElementType.INSTAGRAM))
        .some(Boolean)
}

const includesYoutube = (content: Content): boolean => {
    const body = content?.blocks?.body;

    if (!body) {
        return false
    }

    return body
        .flatMap(block => block.elements.some(element => element.type === ElementType.VIDEO))
        .some(Boolean)
}

const includesSpotify = (content: Content): boolean => {
    const body = content?.blocks?.body;

    if (!body) {
        return false
    }

    return body
        .flatMap(block => block.elements.some(element => element.type === ElementType.AUDIO))
        .some(Boolean)
}

const paidContentLogo = (tags: Tag[]): Option<Logo> => {
    const sponsorship = tags
        .find(tag => tag.type === TagType.PAID_CONTENT)?.activeSponsorships?.pop();
    const src = sponsorship?.sponsorLogo;
    const url = sponsorship?.sponsorLink;
    const alt = sponsorship?.sponsorName ?? "";
    return (!src || !url)
        ? none
        : some({ src, url, alt })
}


// ----- Functions ----- //

const capiEndpoint = (articleId: string, key: string): string => {
    // If you need a new field here, MAPI probably also needs updating
    const fields = [
        'headline',
        'standfirst',
        'bylineHtml',
        'firstPublicationDate',
        'shouldHideAdverts',
        'shouldHideReaderRevenue',
        'displayHint',
        'starRating',
        'commentable',
        'liveBloggingNow',
        'lastModified'
    ];

    const params = new URLSearchParams({
      format: 'thrift',
      'api-key': key,
      'show-atoms': 'all',
      'show-fields': fields.join(','),
      'show-tags': 'all',
      'show-blocks': 'all',
      'show-elements': 'all',
      'show-related': 'true'
    })
  
    return `https://content.guardianapis.com/${articleId}?${params.toString()}`;
}

const capiDateTimeToDate = (date: CapiDateTime): Option<Date> =>
    // Thrift definitions define some dates as CapiDateTime but CAPI returns strings
    dateFromString(date.iso8601);

const maybeCapiDate = (date: CapiDateTime | undefined): Option<Date> =>
    pipe2(date, fromNullable, andThen(capiDateTimeToDate));


// ----- Exports ----- //

export {
    Series,
    Logo,
    isPhotoEssay,
    isImmersive,
    isInteractive,
    isFeature,
    isReview,
    isAnalysis,
    articleSeries,
    articleContributors,
    articleMainMedia,
    capiEndpoint,
    includesTweets,
    includesInstagram,
    includesYoutube,
    includesSpotify,
    getThirdPartyEmbeds,
    maybeCapiDate,
    paidContentLogo,
    articleMainImage
};
