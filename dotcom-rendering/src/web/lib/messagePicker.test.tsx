import React from 'react';
import { record } from '@root/src/web/browser/ophan/ophan';
import { pickMessage, CanShowResult } from './messagePicker';

jest.mock('@root/src/web/browser/ophan/ophan', () => ({
	record: jest.fn(),
}));

jest.useFakeTimers();

// Wait for all unsettled promises to complete before finishing the test. Not
// doing this results in a warning from Jest. Note that it's actually expected
// that there may be outstanding promises when a test completes becuase the the
// message picker returns when the canShow of a message resolves, even if there
// are lower priority messages still pending.
const flushPromises = () => new Promise(setImmediate);
afterEach(async () => {
	await flushPromises();
});

describe('pickMessage', () => {
	it('resolves with the highest priority message which can show', async () => {
		const MockComponent = () => <div />;
		const ChosenMockComponent = () => <div />;
		const config = {
			name: 'banner',
			candidates: [
				{
					candidate: {
						id: 'banner-1',
						canShow: () => Promise.resolve({ result: false }),
						show: () => MockComponent,
					},
					timeoutMillis: null,
				},
				{
					candidate: {
						id: 'banner-2',
						canShow: () => Promise.resolve({ result: true }),
						show: () => ChosenMockComponent,
					},
					timeoutMillis: null,
				},
				{
					candidate: {
						id: 'banner-3',
						canShow: () => Promise.resolve({ result: true }),
						show: () => MockComponent,
					},
					timeoutMillis: null,
				},
			],
		};

		const got = await pickMessage(config);

		expect(got()).toEqual(ChosenMockComponent);
	});

	it('resolves with null if no messages can show', async () => {
		const MockComponent = () => <div />;

		const config = {
			name: 'banner',
			candidates: [
				{
					candidate: {
						id: 'banner-1',
						canShow: () => Promise.resolve({ result: false }),
						show: () => MockComponent,
					},
					timeoutMillis: null,
				},
				{
					candidate: {
						id: 'banner-2',
						canShow: () => Promise.resolve({ result: false }),
						show: () => MockComponent,
					},
					timeoutMillis: null,
				},
			],
		};

		const got = await pickMessage(config);

		expect(got()).toEqual(null);
	});

	it('falls through to a lower priority message when a higher one times out', async () => {
		const MockComponent = () => <div />;
		const ChosenMockComponent = () => <div />;
		const config = {
			name: 'banner',
			candidates: [
				{
					candidate: {
						id: 'banner-1',
						canShow: (): Promise<CanShowResult> =>
							new Promise((resolve) =>
								setTimeout(
									() => resolve({ result: true }),
									500,
								),
							),
						show: () => MockComponent,
					},
					timeoutMillis: 250,
				},
				{
					candidate: {
						id: 'banner-2',
						canShow: () => Promise.resolve({ result: true }),
						show: () => ChosenMockComponent,
					},
					timeoutMillis: null,
				},
			],
		};

		const messagePromise = pickMessage(config);
		jest.advanceTimersByTime(260);
		const got = await messagePromise;

		expect(got()).toEqual(ChosenMockComponent);
	});

	it('resolves with null if all messages time out', async () => {
		const MockComponent = () => <div />;
		let timer1;
		let timer2;
		const config = {
			name: 'banner',
			candidates: [
				{
					candidate: {
						id: 'banner-1',
						canShow: (): Promise<CanShowResult> =>
							new Promise((resolve) => {
								timer1 = setTimeout(
									() => resolve({ result: true }),
									500,
								);
							}),
						show: () => MockComponent,
					},
					timeoutMillis: 250,
				},
				{
					candidate: {
						id: 'banner-2',
						canShow: (): Promise<CanShowResult> =>
							new Promise((resolve) => {
								timer2 = setTimeout(
									() => resolve({ result: true }),
									500,
								);
							}),
						show: () => MockComponent,
					},
					timeoutMillis: 250,
				},
			],
		};

		const messagePromise = pickMessage(config);
		jest.advanceTimersByTime(260);
		const got = await messagePromise;

		expect(got()).toEqual(null);

		clearTimeout(timer1);
		clearTimeout(timer2);
	});

	it('passes metadata returned by canShow to show', async () => {
		const renderComponent = jest.fn(() => () => <div />);
		const meta = { extra: 'info' };
		const config = {
			name: 'banner',
			candidates: [
				{
					candidate: {
						id: 'banner-1',
						canShow: () =>
							Promise.resolve({
								result: true,
								meta,
							}),
						show: renderComponent,
					},
					timeoutMillis: null,
				},
			],
		};

		const show = await pickMessage(config);
		show();

		expect(renderComponent).toHaveBeenCalledWith(meta);
	});

	it('sends a message to ophan when a message canShow times out', async () => {
		const MockComponent = () => <div />;
		let timer;
		const config = {
			name: 'banner',
			candidates: [
				{
					candidate: {
						id: 'example-banner',
						canShow: (): Promise<CanShowResult> =>
							new Promise((resolve) => {
								timer = setTimeout(
									() => resolve({ result: true }),
									300,
								);
							}),
						show: () => MockComponent,
					},
					timeoutMillis: 200,
				},
			],
		};

		const messagePromise = pickMessage(config);
		jest.advanceTimersByTime(250);
		const got = await messagePromise;

		expect(got()).toEqual(null);
		expect(record).toHaveBeenCalledWith({
			component: 'banner-picker-timeout-dcr',
			value: config.candidates[0].candidate.id,
		});

		clearTimeout(timer);
	});
});
