import React from 'react';

import { Display, Design, Pillar } from '@guardian/types';
import { Section } from './Section';

import { Standfirst } from './Standfirst';
import { decidePalette } from '../lib/decidePalette';

export default {
	component: Standfirst,
	title: 'Components/Standfirst',
};

export const Article = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.Article}
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				standfirst="This is how Article standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Article.story = { name: 'Article' };

export const Comment = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.Comment}
				format={{
					display: Display.Standard,
					design: Design.Comment,
					theme: Pillar.Opinion,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Comment,
					theme: Pillar.Opinion,
				})}
				standfirst="This is how Comment standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Comment.story = { name: 'Comment' };

export const Feature = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.Feature}
				format={{
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.Culture,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.Culture,
				})}
				standfirst="This is how Feature standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Feature.story = { name: 'Feature' };

export const Immersive = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Immersive}
				design={Design.Article}
				format={{
					display: Display.Immersive,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Immersive,
					design: Design.Article,
					theme: Pillar.News,
				})}
				standfirst="This is how Immersive standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Immersive.story = { name: 'Immersive' };

export const Review = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.Review}
				format={{
					display: Display.Standard,
					design: Design.Review,
					theme: Pillar.Culture,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Review,
					theme: Pillar.Culture,
				})}
				standfirst="This is how Review standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Review.story = { name: 'Review' };

export const Live = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.Live}
				format={{
					display: Display.Standard,
					design: Design.Live,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Live,
					theme: Pillar.News,
				})}
				standfirst="This is how Live standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Live.story = { name: 'Live' };

export const Interview = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.Interview}
				format={{
					display: Display.Standard,
					design: Design.Interview,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Interview,
					theme: Pillar.News,
				})}
				standfirst="This is how Interview standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Interview.story = { name: 'Interview' };

export const Analysis = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.Analysis}
				format={{
					display: Display.Standard,
					design: Design.Analysis,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Analysis,
					theme: Pillar.News,
				})}
				standfirst="This is how Analysis standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Analysis.story = { name: 'Analysis' };

export const Media = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.Media}
				format={{
					display: Display.Standard,
					design: Design.Media,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Media,
					theme: Pillar.News,
				})}
				standfirst="This is how Media standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Media.story = { name: 'Media' };

export const Recipe = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.Recipe}
				format={{
					display: Display.Standard,
					design: Design.Recipe,
					theme: Pillar.Lifestyle,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Recipe,
					theme: Pillar.Lifestyle,
				})}
				standfirst="This is how Recipe standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Recipe.story = { name: 'Recipe' };

export const MatchReport = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.MatchReport}
				format={{
					display: Display.Standard,
					design: Design.MatchReport,
					theme: Pillar.Sport,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.MatchReport,
					theme: Pillar.Sport,
				})}
				standfirst="This is how MatchReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
MatchReport.story = { name: 'MatchReport' };

export const Quiz = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.Quiz}
				format={{
					display: Display.Standard,
					design: Design.Quiz,
					theme: Pillar.Lifestyle,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Quiz,
					theme: Pillar.Lifestyle,
				})}
				standfirst="This is how Quiz standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Quiz.story = { name: 'Quiz' };

export const SpecialReport = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.Article}
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				standfirst="This is how SpecialReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
SpecialReport.story = { name: 'SpecialReport' };

export const GuardianView = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.GuardianView}
				format={{
					display: Display.Standard,
					design: Design.GuardianView,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.GuardianView,
					theme: Pillar.News,
				})}
				standfirst="This is how GuardianView standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
GuardianView.story = { name: 'GuardianView' };

export const PhotoEssay = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.PhotoEssay}
				format={{
					display: Display.Standard,
					design: Design.PhotoEssay,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.PhotoEssay,
					theme: Pillar.News,
				})}
				standfirst="This is how PhotoEssay standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
PhotoEssay.story = { name: 'PhotoEssay' };
