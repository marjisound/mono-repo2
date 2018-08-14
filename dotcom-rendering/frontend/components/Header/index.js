// @flow
import { css } from 'react-emotion';

import { tablet } from '@guardian/pasteup/breakpoints';

import Nav from './Nav';

const header = css`
    margin-bottom: 0;
    background-color: #e9eff1;
    position: relative;
    ${tablet} {
        display: block;
    }
`;

const Header = () => (
    <header className={header}>
        <Nav />
    </header>
);

export default Header;
