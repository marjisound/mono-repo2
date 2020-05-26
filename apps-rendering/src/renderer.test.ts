import { renderAll, renderStandfirstText, renderText, renderAllWithoutStyles } from 'renderer';
import { JSDOM } from 'jsdom';
import { Pillar } from 'format';
import { ReactNode } from 'react';
import { compose } from 'lib';
import { BodyElement, ElementKind } from 'bodyElement';
import { Role } from 'image';
import { configure, shallow } from 'enzyme';
import { None, Some } from 'types/option';
import Adapter from 'enzyme-adapter-react-16';
import { Format, Design, Display } from '@guardian/types/Format';

configure({ adapter: new Adapter() });
const mockFormat: Format = {
    pillar: Pillar.News,
    design: Design.Article,
    display: Display.Standard,
};

beforeEach(() => {
    console.error = jest.fn()
})

const textElement = (nodes: string[]): BodyElement =>
    ({
        kind: ElementKind.Text,
        doc: JSDOM.fragment(nodes.join('')),
    });

const imageElement = (): BodyElement =>
    ({
        kind: ElementKind.Image,
        src: 'https://gu.com/img.png',
        srcset: '',
        alt: new Some("alt tag"),
        caption: new Some(JSDOM.fragment('this caption contains <em>html</em>')),
        nativeCaption: new Some('caption'),
        credit: new Some('credit'),
        width: 500,
        height: 500,
        role: new None()
    });

const imageElementWithRole = () =>
    ({
        ...imageElement(),
        role: new Some(Role.Thumbnail)
    })

const pullquoteElement = (): BodyElement =>
    ({
        kind: ElementKind.Pullquote,
        quote: "quote",
        attribution: new None()
    })

const richLinkElement = (): BodyElement =>
    ({
        kind: ElementKind.RichLink,
        url: "https://gu.com/article",
        linkText: "this links to a related article"
    })

const interactiveElement = (): BodyElement =>
    ({
        kind: ElementKind.Interactive,
        url: "https://gu.com/interactive",
    })

const tweetElement = (): BodyElement =>
    ({
        kind: ElementKind.Tweet,
        content: JSDOM.fragment('<span>Tweet contents<span>').querySelectorAll('span'),
    })

const instagramElement = (): BodyElement =>
    ({
        kind: ElementKind.Instagram,
        html: '<blockquote>Instagram</blockquote>',
    })

const embedElement = (): BodyElement =>
    ({
        kind: ElementKind.Embed,
        html: '<section>Embed</section>',
        alt: new None
    })

const videoElement = (): BodyElement =>
    ({
        kind: ElementKind.Video,
        src: "https://www.youtube.com/",
        height: "300",
        width: "500"
    })

const audioElement = (): BodyElement =>
    ({
        kind: ElementKind.Audio,
        src: "https://www.spotify.com/",
        height: "300",
        width: "500"
    })

const atomElement = (): BodyElement =>
    ({
        kind: ElementKind.InteractiveAtom,
        css: "main { background: yellow; }",
        html: "<main>Some content</main>",
        js: new Some("console.log('init')"),
    })

const render = (element: BodyElement): ReactNode[] =>
    renderAll(mockFormat, [element]);

const renderWithoutStyles = (element: BodyElement): ReactNode[] =>
    renderAllWithoutStyles(mockFormat, [element]);

const renderCaption = (element: BodyElement): ReactNode[] =>
    renderAll(mockFormat, [element]);

const renderTextElement = compose(render, textElement);

const renderTextElementWithoutStyles = compose(renderWithoutStyles, textElement);

const renderCaptionElement = compose(renderCaption, imageElement)

describe('renderer returns expected content', () => {
    test('Renders supported node types for text elements', () => {
        const elements = [
            '<h2></h2>',
            '<blockquote></blockquote>',
            '<strong></strong>',
            '<em></em>',
            '<br>',
            '<ul><li></li></ul>',
            '<mark></mark>'
        ];

        expect(renderTextElement(elements).flat().length).toBe(7);
        expect(renderTextElementWithoutStyles(elements).flat().length).toBe(7);
    });

    test ('Renders caption node types', () => {
        const text = renderCaptionElement(JSDOM.fragment('this caption contains'));
        expect(shallow(text.flat()[0]).html()).toContain('<p');
    });

    test ('Removes unsupported caption node types', () => {
        const text = renderCaptionElement(JSDOM.fragment('this caption contains <blockquote>html</blockquote>'));
        text.flatMap(element => expect(element).not.toContain("blockquote"))
    });
});

describe('Transforms text nodes', () => {
    test('Transforms bullet points', () => {
        const nodes = renderTextElement([
            '• This is a bullet point we receive from capi'
        ]);
        const bullet = shallow(nodes.flat()[0]);
        expect(bullet.html()).not.toContain('• This is a bullet point we receive from capi')
    });

    test('Transforms horizontal rules', () => {
        const nodes = renderTextElement([
            '* * *'
        ]);
        const horizontalRule = shallow(nodes.flat()[0]);
        expect(horizontalRule.html()).not.toContain('* * *')
    });
});

describe('Renders different types of elements', () => {
    test('ElementKind.Image', () => {
        const nodes = render(imageElement())
        const bodyImage = shallow(nodes.flat()[0]);
        expect(bodyImage.html()).toContain('img');
        expect(bodyImage.html()).toContain('figcaption');
        expect(bodyImage.html()).toContain('caption="caption"');
        expect(bodyImage.html()).toContain('credit="credit"');
    })

    test('ElementKind.Image with thumbnail role', () => {
        const nodes = render(imageElementWithRole())
        const bodyImage = shallow(nodes.flat()[0]);
        expect(bodyImage.html()).toContain('img');
    })

    test('ElementKind.Pullquote', () => {
        const nodes = render(pullquoteElement())
        const pullquote = shallow(nodes.flat()[0]);
        expect(pullquote.html()).toContain('<blockquote><p>quote</p></blockquote>');
    })

    test('ElementKind.RichLink', () => {
        const nodes = render(richLinkElement())
        const richLink = shallow(nodes.flat()[0]);
        expect(richLink.html()).toContain('<h1>this links to a related article</h1>');
        expect(richLink.html()).toContain('href="https://gu.com/article"');
    })

    test('ElementKind.Interactive', () => {
        const nodes = render(interactiveElement())
        const interactive = shallow(nodes.flat()[0]);
        expect(interactive.html()).toContain('<iframe src="https://gu.com/interactive" height="500" title=""></iframe>');
    })

    test('ElementKind.Tweet', () => {
        const nodes = render(tweetElement())
        const tweet = shallow(nodes.flat()[0]);
        expect(tweet.html()).toContain('twitter-tweet');
    })

    test('ElementKind.Instagram', () => {
        const nodes = render(instagramElement())
        const instagram = shallow(nodes.flat()[0]);
        expect(instagram.html()).toBe('<div><blockquote>Instagram</blockquote></div>');
    })

    test('ElementKind.Embed', () => {
        const nodes = render(embedElement())
        const embed = shallow(nodes.flat()[0]);
        expect(embed.html()).toContain('<div><section>Embed</section></div>');
    })

    test('ElementKind.Audio', () => {
        const nodes = render(audioElement())
        const audio = shallow(nodes.flat()[0]);
        expect(audio.html()).toContain('src="https://www.spotify.com/" sandbox="allow-scripts" height="300" width="500" title="Audio element"');
    })

    test('ElementKind.Video', () => {
        const nodes = render(videoElement())
        const video = shallow(nodes.flat()[0]);
        expect(video.html()).toContain('src="https://www.youtube.com/" height="300" width="500" allowfullscreen="" title="Video element"');
    })

    test('ElementKind.InteractiveAtom', () => {
        const nodes = render(atomElement())
        const atom = shallow(nodes.flat()[0]);
        expect(atom.html()).toContain('main { background: yellow; }');
        expect(atom.html()).toContain("console.log(&#x27;init&#x27;)");
        expect(atom.html()).toContain('Some content');
    })
});

describe('Paragraph tags rendered correctly', () => {
    test('Contains no styles in standfirsts', () => {
        const fragment = JSDOM.fragment('<p>Parapraph tag</p><span>1</span>');
        const nodes = renderStandfirstText(fragment, mockFormat);
        const html = shallow(nodes.flat()[0]).html();
        expect(html).toBe('<p>Parapraph tag</p>')
    });

    test('Contains styles in article body', () => {
        const fragment = JSDOM.fragment('<p>Parapraph tag</p><span>1</span>');
        const nodes = renderText(fragment, mockFormat);
        const html = shallow(nodes.flat()[0]).html();
        expect(html).not.toBe('<p>Parapraph tag</p>')
    });
});
