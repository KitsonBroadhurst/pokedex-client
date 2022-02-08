import React from 'react'
import styled from '@emotion/styled'
import { colors, mq } from '../styles'
import { Link } from "@reach/router"

const MoveRow = ({ move }) => (
  <StyledMoveRow>
    <DescriptionGroup>
      <MoveTitle>{ capitalize(move.name, "Missing move") }</MoveTitle>
      <MoveDescription>{ capitalize(move?.description[0]?.flavor_text, "Missing move description") }</MoveDescription>
    </DescriptionGroup>
    <PP>{ move.pp }</PP>
  </StyledMoveRow>
)

const capitalize = (str, alt) => (str && str[0].toUpperCase() + str.slice(1)) || alt || ""

const PokeCard = ({ pokemon }) => {
  const { id, name, sprites, types, height, weight, moveData } = pokemon.data
  return (
    <CardContainer to="/">
      <CardBody>
        <CardTitle>{ `# ${id} - ${capitalize(name, "Unknown pokemon")}` }</CardTitle>
        <CardImage src={ sprites?.front_default || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" } />
        <PokeType>{ capitalize(types[0]?.type?.name, "Normal") }</PokeType>
        { moveData.map((move, index) => (
          <MoveRow
            key={`move${index}`}
            move={move}
          />
        )) }
        
        <PokeInfo>Weight: { weight }, Height: { height }</PokeInfo>
      </CardBody>
    </CardContainer>
  )
}

export default PokeCard

/** PokeCard styled components */
const CardContainer = styled(Link)({
  borderRadius: 20,
  color: colors.text,
  backgroundSize: 'cover',
  backgroundColor: 'white',
  boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.15)',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [mq[0]]: {
    width: '90%',
  },
  [mq[1]]: {
    width: '47%',
  },
  [mq[2]]: {
    width: '31%',
  },
  margin: 10,
  overflow: 'hidden',
  position: 'relative',
  ':hover': {
    backgroundColor: colors.pokePink,
  },
  cursor: 'pointer',
  textDecoration: 'none'
});

const CardTitle = styled.h3({
  textAlign: 'center',
  fontSize: '1.6em',
  lineHeight: '1em',
  fontWeight: 700,
  color: colors.text,
  marginBottom: 24
});

const CardBody = styled.div({
  padding: 32,
  display: 'flex',
  color: colors.textSecondary,
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center'
});

const CardImage = styled.img({
  objectFit: 'cover',
  width: '120px',
  height: '120px',
  filter: 'grayscale(60%)',
  border: '1px solid black',
  marginBottom: 24
});

const StyledMoveRow = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 16
})

const DescriptionGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  flexGrow: 1
})

const PP = styled.span({
  textAlign: 'center',
  fontSize: '1.6em',
  lineHeight: '1em',
  fontWeight: 700,
  color: colors.text
})

const MoveTitle = styled.span({
  textAlign: 'left',
  fontSize: '1.2em',
  lineHeight: '1em',
  fontWeight: 700,
  color: colors.text
})

const MoveDescription = styled.span({
  textAlign: 'left',
  fontSize: '0.8em',
  lineHeight: '1em',
  fontWeight: 400,
  color: colors.text,
  overflowWrap: 'break-word'
})

const PokeType = styled.span({
  textAlign: 'center',
  fontSize: '1em',
  lineHeight: '1em',
  fontWeight: 700,
  color: colors.text,
  marginBottom: 24
})

const PokeInfo = styled.span({
  textAlign: 'left',
  fontSize: '1em',
  lineHeight: '1em',
  fontWeight: 400,
  color: colors.text,
  marginTop: 8
})