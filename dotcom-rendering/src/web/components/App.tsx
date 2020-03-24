import React, { useState, useEffect } from 'react';

import { Nav } from '@frontend/web/components/Nav/Nav';
import { EditionDropdown } from '@frontend/web/components/EditionDropdown';
import { MostViewedFooter } from '@frontend/web/components/MostViewed/MostViewedFooter/MostViewedFooter';
import { MostViewedRightWrapper } from '@frontend/web/components/MostViewed/MostViewedRight/MostViewedRightWrapper';
import { Counts } from '@frontend/web/components/Counts';
import { RichLinkComponent } from '@frontend/web/components/elements/RichLinkComponent';
import { ReaderRevenueLinks } from '@frontend/web/components/ReaderRevenueLinks';
import { CMP } from '@frontend/web/components/CMP';
import { OnwardsUpper } from '@frontend/web/components/Onwards/OnwardsUpper';
import { OnwardsLower } from '@frontend/web/components/Onwards/OnwardsLower';
import { SlotBodyEnd } from '@frontend/web/components/SlotBodyEnd';
import { Links } from '@frontend/web/components/Links';
import { SubNav } from '@frontend/web/components/SubNav/SubNav';
import { CommentsLayout } from '@frontend/web/components/CommentsLayout';
import { incrementWeeklyArticleCount } from '@guardian/slot-machine-client';

import { Portal } from '@frontend/web/components/Portal';
import { Hydrate } from '@frontend/web/components/Hydrate';
import { Lazy } from '@frontend/web/components/Lazy';

import { getCookie } from '@root/src/web/browser/cookie';
import { getCountryCode } from '@frontend/web/lib/getCountryCode';
import { getDiscussion } from '@root/src/web/lib/getDiscussion';

type Props = { CAPI: CAPIBrowserType; NAV: NavType };

export const App = ({ CAPI, NAV }: Props) => {
    const [isSignedIn, setIsSignedIn] = useState<boolean>();
    const [countryCode, setCountryCode] = useState<string>();
    const [commentCount, setCommentCount] = useState<number>(0);
    const [isClosedForComments, setIsClosedForComments] = useState<boolean>(
        true,
    );

    useEffect(() => {
        setIsSignedIn(!!getCookie('GU_U'));
    }, []);

    useEffect(() => {
        const callFetch = async () =>
            setCountryCode((await getCountryCode()) || '');
        callFetch();
    }, []);

    useEffect(() => {
        const callFetch = async () => {
            const response = await getDiscussion(
                CAPI.config.discussionApiUrl,
                CAPI.config.shortUrlId,
            );
            setCommentCount(
                (response && response.discussion.commentCount) || 0,
            );
            setIsClosedForComments(
                response && response.discussion.isClosedForComments,
            );
        };

        if (CAPI.isCommentable) {
            callFetch();
        }
    }, [
        CAPI.config.discussionApiUrl,
        CAPI.config.shortUrlId,
        CAPI.isCommentable,
    ]);

    // Log an article view using the Slot Machine client lib
    // This function must be called once per article serving.
    // We should monitor this function call to ensure it only happens within an
    // article pages when other pages are supported by DCR.
    useEffect(() => {
        incrementWeeklyArticleCount();
    }, []);

    return (
        // Do you need to Hydrate or do you want a Portal?
        //
        // Hydrate: If your component is server rendered and you're hydrating it with
        // more data or making it interactive on the client and you do not need to access
        // global application state.
        //
        // Portal: If your component is not server rendered but a pure client-side component
        // and/or you want to access global application state, you want to use a Portal.
        //
        // Note: Both require a 'root' element that needs to be server rendered.
        <>
            <Portal root="reader-revenue-links-header">
                <ReaderRevenueLinks
                    urls={CAPI.nav.readerRevenueLinks.footer}
                    edition={CAPI.editionId}
                    dataLinkNamePrefix="footer : "
                    noResponsive={true}
                    inHeader={true}
                />
            </Portal>
            <Hydrate root="links-root">
                <Links isSignedIn={isSignedIn} />
            </Hydrate>
            <Hydrate root="edition-root">
                <EditionDropdown
                    edition={CAPI.editionId}
                    dataLinkName="nav2 : topbar : edition-picker: toggle"
                />
            </Hydrate>
            <Hydrate root="nav-root">
                <Nav pillar={CAPI.pillar} nav={NAV} />
            </Hydrate>
            {NAV.subNavSections && (
                <Hydrate root="sub-nav-root">
                    <>
                        <SubNav
                            subNavSections={NAV.subNavSections}
                            currentNavLink={NAV.currentNavLink}
                            pillar={CAPI.pillar}
                        />
                    </>
                </Hydrate>
            )}
            {CAPI.richLinks.map((link, index) => (
                <Portal
                    key={index}
                    root="rich-link"
                    richLinkIndex={link.richLinkIndex}
                >
                    <RichLinkComponent
                        element={link}
                        pillar={CAPI.pillar}
                        ajaxEndpoint={CAPI.config.ajaxUrl}
                        richLinkIndex={index}
                    />
                </Portal>
            ))}
            <Portal root="share-comment-counts">
                <Counts
                    ajaxUrl={CAPI.config.ajaxUrl}
                    pageId={CAPI.config.pageId}
                    commentCount={commentCount}
                    pillar={CAPI.pillar}
                />
            </Portal>
            <Portal root="most-viewed-right">
                <Lazy margin={100}>
                    <MostViewedRightWrapper pillar={CAPI.pillar} />
                </Lazy>
            </Portal>
            <Portal root="slot-body-end">
                <SlotBodyEnd
                    isSignedIn={isSignedIn}
                    countryCode={countryCode}
                    contentType={CAPI.contentType}
                    sectionName={CAPI.sectionName}
                    shouldHideReaderRevenue={CAPI.shouldHideReaderRevenue}
                    isMinuteArticle={CAPI.pageType.isMinuteArticle}
                    isPaidContent={CAPI.pageType.isPaidContent}
                    tags={CAPI.tags}
                    isProd={window.guardian.config.stage === 'PROD'}
                />
            </Portal>
            <Portal root="onwards-upper">
                <Lazy margin={300}>
                    <OnwardsUpper
                        ajaxUrl={CAPI.config.ajaxUrl}
                        hasRelated={CAPI.hasRelated}
                        hasStoryPackage={CAPI.hasStoryPackage}
                        isAdFreeUser={CAPI.isAdFreeUser}
                        pageId={CAPI.pageId}
                        isPaidContent={CAPI.config.isPaidContent || false}
                        showRelatedContent={CAPI.config.showRelatedContent}
                        keywordIds={CAPI.config.keywordIds}
                        contentType={CAPI.contentType}
                        tags={CAPI.tags}
                    />
                </Lazy>
            </Portal>
            <Portal root="onwards-lower">
                <Lazy margin={300}>
                    <OnwardsLower
                        ajaxUrl={CAPI.config.ajaxUrl}
                        hasStoryPackage={CAPI.hasStoryPackage}
                        tags={CAPI.tags}
                    />
                </Lazy>
            </Portal>
            <Portal root="comments-root">
                <Lazy margin={300}>
                    <CommentsLayout
                        shortUrl={CAPI.config.shortUrlId}
                        commentCount={commentCount}
                        isClosedForComments={isClosedForComments}
                        discussionD2Uid={CAPI.config.discussionD2Uid}
                        discussionApiClientHeader={
                            CAPI.config.discussionApiClientHeader
                        }
                    />
                </Lazy>
            </Portal>
            <Portal root="most-viewed-footer">
                <MostViewedFooter
                    pillar={CAPI.pillar}
                    sectionName={CAPI.sectionName}
                    ajaxUrl={CAPI.config.ajaxUrl}
                />
            </Portal>
            <Portal root="reader-revenue-links-footer">
                <Lazy margin={300}>
                    <ReaderRevenueLinks
                        urls={CAPI.nav.readerRevenueLinks.header}
                        edition={CAPI.editionId}
                        dataLinkNamePrefix="nav2 : "
                        noResponsive={false}
                        inHeader={false}
                    />
                </Lazy>
            </Portal>
            <Portal root="cmp">
                <CMP cmpUi={CAPI.config.cmpUi} />
            </Portal>
        </>
    );
};
