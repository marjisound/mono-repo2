import { AdSlot } from "@guardian/bridget/AdSlot";
import { VideoSlot } from "@guardian/bridget/VideoSlot";
import { Image } from "@guardian/bridget/Image";
import { Rect } from "@guardian/bridget/Rect";
import { commercialClient, galleryClient, userClient, acquisitionsClient, videoClient } from "../native/nativeApi";
import { logger } from "../logger";
import { memoise } from "../lib";

function getRect(slotPosition: DOMRect): Rect {
    const scrollLeft = document.scrollingElement
        ? document.scrollingElement.scrollLeft : document.body.scrollLeft;
    const scrollTop = document.scrollingElement
        ? document.scrollingElement.scrollTop : document.body.scrollTop;

    return new Rect({
        x: slotPosition.left + scrollLeft,
        y: slotPosition.top + scrollTop,
        width: slotPosition.width,
        height: slotPosition.height
    })
}

const getTargetingParams: () => Map<string, string> = memoise(() => {
    const content = document.getElementById('targeting-params')?.innerHTML ?? '{}';
    const parsed = JSON.parse(content);
    const map: Map<string, string> = new Map();
    for (const key in parsed) {
        if (Object.prototype.hasOwnProperty.call(parsed.hasOwnProperty, key) &&
            typeof parsed[key] === 'string') {
            map.set(key, parsed[key]);
        }
    }
    return map;
});

function getAdSlots(): AdSlot[] {
    const advertSlots = document.getElementsByClassName('ad-slot');
    const targetingParams = getTargetingParams();

    if (!advertSlots) {
        return [];
    }

    return Array.from(advertSlots).map(adSlot => {
        const slotPosition = adSlot.getBoundingClientRect();
        return new AdSlot({
            rect: getRect(slotPosition),
            targetingParams
        })
    });
}

function insertAds(): void {
    const adSlots = getAdSlots();
    if (adSlots.length) {
        commercialClient.insertAdverts(adSlots);
    }
}

function ads(): void {
    userClient.isPremium().then(premiumUser => {
        if (!premiumUser) {
            Array.from(document.querySelectorAll('.ad-placeholder'))
                .forEach(placeholder => placeholder.classList.remove('hidden'))
            insertAds();
            Array.from(document.querySelectorAll('.ad-labels'))
                .forEach(adLabel => {
                    adLabel.addEventListener('click', () => {
                        acquisitionsClient.launchFrictionScreen();
                    })
                })
        }
    })
}

function updateUrl(src: string): string {
    const url = new URL(src);
    const width = parseInt(url.searchParams.get('width') ?? '0');
    const dpr = window.devicePixelRatio >= 1.25 ? 2 : 1;
    const newWidth = Math.max(screen.height * dpr, screen.width * dpr, width);

    url.searchParams.set('width', newWidth.toString());
    return url.href;
}

function launchSlideshow(src: string | null): void {
    const images = Array.from(document.querySelectorAll('.js-launch-slideshow'));
    const title = document.title;
    const imagesWithCaptions: Image[] = images.flatMap((image: Element) => {
        if (image instanceof HTMLImageElement) {
            const url = updateUrl(image?.currentSrc ?? image.src);
            const caption =  image.getAttribute('data-caption') ?? undefined;
            const credit = image.getAttribute('data-credit') ?? undefined;
            return new Image({ url, caption, credit });
        } else {
            return [];
        }
    });
    const clickedImageIndex = images.findIndex((image: Element) => image.getAttribute('src') === src);
    if (imagesWithCaptions.length && clickedImageIndex >= 0) {
        galleryClient.launchSlideshow(imagesWithCaptions, clickedImageIndex, title);
    }
}

function slideshow(): void {
    const images = document.querySelectorAll('.js-launch-slideshow');
    Array.from(images)
        .forEach((image: Element) => image.addEventListener('click', (e: Event) => {
            launchSlideshow(image.getAttribute('src'));
        }));
}

function getVideoSlots(): VideoSlot[] {
    const videoSlots = document.querySelectorAll('.native-video');

    if (!videoSlots) {
        return [];
    }

    return Array.from(videoSlots).reduce((slots: VideoSlot[], elem) => {
        const slotPosition = elem.getBoundingClientRect();
        const videoId =  elem.getAttribute('data-videoId') ?? '';
        const posterUrl = elem.getAttribute('data-posterUrl') ?? '';
        const duration = parseInt(elem.getAttribute('data-duration') ?? '0');
        const rect = getRect(slotPosition);
        if (videoId) {
            slots.push(new VideoSlot({ rect, videoId, posterUrl, duration }))
        }
        return slots;
    }, []);
}

function videos(): void {
    const videoSlots = getVideoSlots();
    if (videoSlots.length) {
        videoClient.insertVideos(videoSlots);
    }
}

function reportNativeElementPositionChanges(): void {
    let adSlots = getAdSlots();
    let videoSlots = getVideoSlots();

    const targetNode = document.querySelector('html') as Node;
    const config: MutationObserverInit = {
        childList: true,
        subtree: true,
        attributeFilter: ["style"]
    };
    const callback = function(): void {
        const currentAdSlots = getAdSlots();
        const currentVideoSlots = getVideoSlots();

        if (JSON.stringify(adSlots) !== JSON.stringify(currentAdSlots)) {
            adSlots = currentAdSlots;
            commercialClient.updateAdverts(currentAdSlots);
        }

        if (JSON.stringify(videoSlots) !== JSON.stringify(currentVideoSlots)) {
            videoSlots = currentVideoSlots;
            videoClient.updateVideos(currentVideoSlots);
        }
    };

    window.addEventListener('resize', callback);
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    try {
        document.fonts.ready.then(() => {
            commercialClient.updateAdverts(getAdSlots());
            videoClient.updateVideos(getVideoSlots());
        });
    } catch (e) {
        logger.error(`font loading API not supported: ${e}`)
    }
}

export {
    ads,
    slideshow,
    videos,
    reportNativeElementPositionChanges
};
