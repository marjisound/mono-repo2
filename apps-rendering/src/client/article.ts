// ----- Imports ----- //

import { notificationsClient, acquisitionsClient } from 'native/nativeApi';
import { Topic } from '@guardian/bridget/Topic';
import { IMaybeEpic as MaybeEpic } from '@guardian/bridget/MaybeEpic';
import { formatDate } from 'date';
import { logger } from "../logger";
import { createElement as h } from 'react';
import setup from 'client/setup';
import Epic from 'components/shared/epic';
import ReactDOM from 'react-dom';
import {ads, slideshow} from 'client/nativeCommunication';

// ----- Run ----- //

interface FontFaceSet {
    readonly ready: Promise<FontFaceSet>;
}

declare global {
    interface Document {
        fonts: FontFaceSet;
    }
}

function topicClick(e: Event): void {
    const follow = document.querySelector('.js-follow');
    const status = follow?.querySelector('.js-status');
    const statusText = status?.textContent;
    const id = follow?.getAttribute('data-id');

    if (!id) {
        logger.error('No id for topic');
        return;
    }

    const topic = new Topic({ id });

    if (statusText && statusText === 'Follow') {
        notificationsClient.follow(topic).then(response => {
            if (status?.textContent) {
                status.textContent = "Following";
            }
        })
    } else {
        notificationsClient.unfollow(topic).then(response => {
            if (status?.textContent) {
                status.textContent = "Follow";
            }
        })
    }
}

function topics(): void {
    const follow = document.querySelector('.js-follow');
    const status = follow?.querySelector('.js-status');
    const id = follow?.getAttribute('data-id');

    if (!id) {
        logger.error('No id for topic');
        return;
    }

    const topic = new Topic({ id });
    follow?.addEventListener('click', topicClick);
    notificationsClient.isFollowing(topic).then(following => {
        if (following && status?.textContent) {
            status.textContent = "Following";
        }
    })
}

function formatDates(): void {
    Array.from(document.querySelectorAll('time[data-date]'))
        .forEach(time => {
            try {
                const timestamp = time.getAttribute('data-date');
                if (timestamp) {
                    time.textContent = formatDate(new Date(timestamp))
                }
            } catch (e) {
                logger.error(`Unable to parse and format date ${time}`, e);
            }
        })
}

function insertEpic(): void {
    if (navigator.onLine && !document.getElementById('epic-container')) {
        acquisitionsClient.getEpics().then((maybeEpic: MaybeEpic) => {
            if (maybeEpic.epic) {
                const epicContainer = document.createElement('div');
                epicContainer.id = 'epic-container';
                document.querySelector('footer')?.prepend(epicContainer);
                const { title, body, firstButton, secondButton } = maybeEpic.epic;
                const epicProps =  { title, body, firstButton, secondButton };
                ReactDOM.render(h(Epic, epicProps), epicContainer)
            }
        })
    }
}

setup();
ads();
topics();
slideshow();
formatDates();
insertEpic();
