import React from 'react';
import { colors, widths } from '../styles';
import styled from '@emotion/styled';
import { Link } from '@reach/router';
import logo from '../assets/pokemon.png';
import { useGlobalStore } from '../utils/GlobalState';

/**
 * Header renders the top navigation
 * which holds the login and favourites links
 */
const Header = ({ children }) => {
  const { store } = useGlobalStore()
  const isLoggedIn = !!store?.user && !!store?.user?.email
  return (
    <HeaderBar>
      <Container>
        <HomeButtonContainer>
          <HomeLink to="/">
            <HomeButton>
              <LogoContainer>
                <Logo src={logo} />
              </LogoContainer>
            </HomeButton>
          </HomeLink>
          { isLoggedIn ? (
            <FlexRow>
              <HomeLink to="/favourites">
                <MenuItem bold>
                  Favourites
                </MenuItem>
              </HomeLink>
              <MenuItem>({store.user.email})</MenuItem>
            </FlexRow>
          ) : (
            <HomeLink to="/login">
              <MenuItem bold>
                Login
              </MenuItem>
            </HomeLink>
          ) }
        </HomeButtonContainer>
        {children}
      </Container>
    </HeaderBar>
  );
};

export default Header;

export const SimpleHeader = ({ children }) => (
  <HeaderBar>
    <Container>
      <SimpleHomeButtonContainer>
        <HomeLink to="/">
          <HomeButton>
            <LogoContainer>
              <Logo src={logo} />
            </LogoContainer>
          </HomeButton>
        </HomeLink>
      </SimpleHomeButtonContainer>
      {children}
    </Container>
  </HeaderBar>
)

/** Header styled components */
const HeaderBar = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: `solid 1px ${colors.pink.light}`,
  boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.15)',
  padding: '5px 30px',
  minHeight: 80,
  backgroundColor: colors.pokeRed,
});

const Container = styled.div({
  width: `${widths.regularPageWidth}px`,
});

const HomeLink = styled(Link)({
  textDecoration: 'none',
});

const HomeButtonContainer = styled.div({
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center'
});

const SimpleHomeButtonContainer = styled.div({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'center'
});

const HomeButton = styled.div({
  display: 'flex',
  flexDirection: 'row',
  color: colors.accent,
  alignItems: 'center',
  ':hover': {
    color: colors.pink.dark,
  },
});

const LogoContainer = styled.div({ display: 'flex', alignSelf: 'center' });

const Logo = styled.img({
  height: 60,
  width: 145.2,
  marginRight: 8,
});

const MenuItem = styled.div(
  {
    color: colors.white,
    fontWeight: 700,
    padding: '0 20px',
  },
  props => ({
    fontWeight: props.bold ? '700' : '400'
  })
)

const FlexRow = styled.div({ display: 'flex', flexDirection: 'row' });