import { render, screen } from "@testing-library/react";
import PokeCard from "../poke-card";

describe("PokeCard", () => {
  it("should display a pokemon card", () => {
    const mockPokemon = {
      id: 1,
      name: "Bulby",
      sprites: {

      },
      types: [{
        type: {
          name: "Leaf"
        }
      }],
      height: 10,
      weight: 20,
      moveData: [{
        name: "Bash",
        pp: 22,
        description: [{
          flavor_text: "Hits em hard!"
        }]
      }]
    }

    render(<PokeCard pokemon={mockPokemon} />)

    expect(screen.getByText(/bulby/i)).toBeTruthy()

  })
})