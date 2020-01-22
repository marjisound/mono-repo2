import React from 'react';
import Tags from './tags';
import { Keyline } from './keyline';
import { withKnobs } from "@storybook/addon-knobs";
import { Layout } from 'article';
export default { title: 'Shared', decorators: [withKnobs] };

export const OpinionKeyline = (): JSX.Element =>
    <Keyline layout={ Layout.Opinion } />

export const DefaultKeyline = (): JSX.Element =>
    <Keyline layout={ Layout.Standard } />

export const LiveblogKeyline = (): JSX.Element =>
    <Keyline layout={ Layout.Liveblog } />

const tagsProps = [{
    webTitle: "Tag title",
    webUrl: "https://mapi.co.uk/tag"
}];

export const tags = (): JSX.Element => 
    <Tags tags={[...tagsProps, ...tagsProps, ...tagsProps]} />

 
