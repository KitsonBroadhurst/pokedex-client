import React from 'react';
import { Layout } from '../components';
import { gql, useQuery } from '@apollo/client';
import PokeCard from '../containers/poke-card';
import { QueryResult } from '../components';

export const POKEDEX = gql`
  query getPokemon($email: String) {
    favourite(email: $email) {
      favourites
    }
    pokemonForHome {
      name
      data {
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
          pp
          name
          description {
            flavor_text
          }
        }
      }
    }
  }
`

/**
 * Pokedex is the home page of the app where we display all pokemon
 */

const Pokedex = ({ store }) => {
  const { loading, error, data } = useQuery(POKEDEX, {
    variables: { email: store?.user?.email || "" }
  })
  console.log('data is ', data)

  const favourites = data?.favourite?.favourites || []

  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
      { data?.pokemonForHome?.map((pokemon) => (
        <PokeCard key={pokemon.data.id} pokemon={pokemon.data} isFavourite={favourites.includes(pokemon.data.id)} />
      ))}
      </QueryResult>
    </Layout>
  )
}

export default Pokedex