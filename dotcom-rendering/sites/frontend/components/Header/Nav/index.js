// @flow

import { styled, Component } from '@guardian/guui';
import { connect } from 'unistore/react';
import { Row, Cols } from '@guardian/guui/grid';
import { clearFix } from '@guardian/pasteup/mixins';
import { tablet, desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';

import Logo from './Logo';
import Links from './Links';
import Pillars from './Pillars';
import MainMenuToggle from './MainMenuToggle';
import MainMenu from './MainMenu';
import SubNav from './SubNav';

import type { NavType } from './__config__';

const NavStyled = styled('nav')(
    {
        [tablet]: {
            maxWidth: '740px',
        },
        [desktop]: {
            maxWidth: '980px',
        },
        [leftCol]: {
            maxWidth: '1140px',
        },
        [wide]: {
            maxWidth: '1300px',
        },
        position: 'relative',
        margin: '0 auto',
    },
    clearFix,
);

export default class Nav extends Component<{}, { showMainMenu: boolean }> {
    constructor(props: {}) {
        super(props);

        this.state = {
            showMainMenu: false,
        };
    }

    toggleMainMenu() {
        this.setState({
            showMainMenu: !this.state.showMainMenu,
        });
    }

    render() {
        const toggleMainMenu = () => {
            this.toggleMainMenu();
        };
        const { showMainMenu } = this.state;
        const mainMenuId = 'main-menu';

        const NavComponent = connect('NAV')(({ NAV = {} }) => {
            const nav = ((NAV: any): NavType); // have to cast here for now

            // TODO push subnav into nav for now as really part of it
            // also separate PR to do centering stuff!
            return (
                <div>
                    <NavStyled role="navigation" aria-label="Guardian sections">
                        <Logo />
                        <Links />
                        <Pillars
                            showMainMenu={showMainMenu}
                            pillars={nav.pillars || []}
                        />
                        <MainMenuToggle
                            showMainMenu={showMainMenu}
                            toggleMainMenu={toggleMainMenu}
                            ariaControls={mainMenuId}
                        />
                        <MainMenu
                            showMainMenu={showMainMenu}
                            id={mainMenuId}
                            nav={nav}
                        />
                    </NavStyled>
                    <Row>
                        <Cols wide={16} leftCol={16}>
                            <SubNav
                                parent={nav.subNavSections.parent}
                                links={nav.subNavSections.links}
                            />
                        </Cols>
                    </Row>
                </div>
            );
        });

        return <NavComponent />;
    }
}
