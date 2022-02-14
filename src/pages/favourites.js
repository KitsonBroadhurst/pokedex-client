import React from 'react'
import { gql, useQuery } from '@apollo/client'
import withAuth from '../components/withAuth'
import {
  Layout,
  QueryResult,
} from '../components'
import PokeCard from '../containers/poke-card'

export const FAVOURITES = gql`
  query getFavourite($email: String) {
    favourite(email: $email) {
      pokemon {
        id
        name
        height
        weight
        sprites {
          front_default
        }
        types {
          type {
            name
          }
        }
        moveData {
          id
          name
          pp
          description {
            flavor_text
          }
        }
      }
    }
  }
`

const Favourties = ({ store }) => {
  const { loading, error, data } = useQuery(FAVOURITES, {
    variables: { email: store?.user?.email || "" }
  })
  
  if (!store?.user?.email) return <div>Looks like there was an error!</div>
  return (
    <Layout grid>
      <QueryResult loading={loading} error={error} data={data}>
        { data?.favourite?.pokemon && data.favourite.pokemon.length
          ? data.favourite.pokemon.map(pokemon => (
              <PokeCard key={pokemon.id} pokemon={pokemon} />
            ))
          : <div>Looks like you have no favourites yet!</div>
        }
      </QueryResult>
    </Layout>
  )
}

export default withAuth()(Favourties)