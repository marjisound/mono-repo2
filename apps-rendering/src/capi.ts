// ----- Imports ----- //

import { Result, Ok, Err } from 'types/result';
import { Content, Tag, BlockElement } from 'capiThriftModels';
import { Option, fromNullable } from 'types/option';
import { isImage } from 'components/blocks/image';


// ----- Types ----- //

interface Capi {
    response: {
        content: Content;
    };
}

interface CapiError {
    response?: {
        message: string,
    }
    message?: string,
};

interface Series {
    webTitle?: string;
    webUrl?: string;
}

interface Contributor {
    webTitle?: string;
    webUrl?: string;
    apiUrl?: string;
    bylineLargeImageUrl?: string;
}


// ----- Functions ----- //

const tagsOfType = (type_: string) => (tags: Tag[]): Tag[] =>
    tags.filter((tag: Tag) => tag.type === type_);

const isFeature = (content: Content): boolean =>
    content.tags.some(tag => tag.id === 'tone/features');

function parseCapi(capiResponse: string): Result<string, Capi> {
    try {
        return new Ok(JSON.parse(capiResponse));
    } catch (_) {
        return new Err('Could not parse the CAPI response');
    }
}

function parseCapiError(capiResponse: string): Result<string, string> {
    try {
        const capiError: CapiError = JSON.parse(capiResponse);
        const message = capiError.response?.message ?? capiError.message;

        return new Ok(message ? `It came with this message: ${message}` : 'There was no message to explain why.');
    } catch (_) {
        return new Err('Could not parse the CAPI error');
    }
}

const isSingleContributor = (contributors: Contributor[]): boolean =>
    contributors.length === 1;

// TODO: request less data from capi
const capiEndpoint = (articleId: string, key: string): string => {

    const params = new URLSearchParams({
      format: 'json',
      'api-key': key,
      'show-atoms': 'all',
      'show-fields': 'all',
      'show-tags': 'all',
      'show-blocks': 'all',
    })
  
    return `https://content.guardianapis.com/${articleId}?${params.toString()}`;
  
}

const articleSeries = (content: Content): Tag =>
    tagsOfType('series')(content.tags)[0];

const articleContributors = (content: Content): Tag[] =>
    tagsOfType('contributor')(content.tags);

const articleMainImage = (content: Content): Option<BlockElement> =>
    fromNullable(content.blocks.main.elements.filter(isImage)[0]);


// ----- Exports ----- //

export {
    Capi,
    Series,
    Contributor,
    isFeature,
    parseCapi,
    parseCapiError,
    isSingleContributor,
    capiEndpoint,
    articleSeries,
    articleContributors,
    articleMainImage,
};
