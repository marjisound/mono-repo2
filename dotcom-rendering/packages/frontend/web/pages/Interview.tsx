import React from 'react';
import { palette } from '@guardian/src-foundations';
import { MostViewed } from '@frontend/web/components/MostViewed/MostViewed';
import { Header } from '@frontend/web/components/Header/Header';
import { Footer } from '@frontend/web/components/Footer';
import { Content } from '@frontend/web/components/Content';
import { SubNav } from '@frontend/web/components/Header/Nav/SubNav/SubNav';
import { CookieBanner } from '@frontend/web/components/CookieBanner';
import { MobileStickyContainer } from '@frontend/web/components/AdSlot';
import { OutbrainContainer } from '@frontend/web/components/Outbrain';
import { Section } from '@frontend/web/components/Section';

export const Interview: React.FC<{
    data: ArticleProps;
}> = ({ data }) => (
    <div>
        <Header
            nav={data.NAV}
            pillar={data.CAPI.pillar}
            edition={data.CAPI.editionId}
            config={data.config}
            isAdFreeUser={data.CAPI.isAdFreeUser}
            shouldHideAds={data.CAPI.shouldHideAds}
        />

        <Section showTopBorder={false}>
            <Content CAPI={data.CAPI} config={data.config} />
        </Section>

        <Section showTopBorder={false}>
            <OutbrainContainer config={data.config} />
        </Section>

        <Section>
            <MostViewed
                sectionName={data.CAPI.sectionName}
                config={data.config}
                pillar={data.CAPI.pillar}
            />
        </Section>

        <Section padded={false}>
            <SubNav
                subnav={data.NAV.subNavSections}
                pillar={data.CAPI.pillar}
                currentNavLink={data.NAV.currentNavLink}
            />
        </Section>

        <Section
            padded={false}
            backgroundColour={palette.brand.main}
            borderColour={palette.brand.pastel}
        >
            <Footer
                nav={data.NAV}
                edition={data.CAPI.editionId}
                pageFooter={data.CAPI.pageFooter}
                pillar={data.CAPI.pillar}
                pillars={data.NAV.pillars}
            />
        </Section>

        <CookieBanner />
        <MobileStickyContainer />
    </div>
);