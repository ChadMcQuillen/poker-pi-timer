/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTournament = `mutation CreateTournament($input: CreateTournamentInput!) {
  createTournament(input: $input) {
    id
    title
    description
    buyIn
    rebuyAmount
    rebuyThroughLevel
    levelsAndBreaks {
      id
      index
      levelType
      levelIndex
      levelTime
      smallBlind
      bigBlind
      ante
      tournamentId
    }
  }
}
`;
export const updateTournament = `mutation UpdateTournament($input: UpdateTournamentInput!) {
  updateTournament(input: $input) {
    id
    title
    description
    buyIn
    rebuyAmount
    rebuyThroughLevel
    levelsAndBreaks {
      id
      index
      levelType
      levelIndex
      levelTime
      smallBlind
      bigBlind
      ante
      tournamentId
    }
  }
}
`;
export const deleteTournament = `mutation DeleteTournament($input: DeleteTournamentInput!) {
  deleteTournament(input: $input) {
    id
    title
    description
    buyIn
    rebuyAmount
    rebuyThroughLevel
    levelsAndBreaks {
      id
      index
      levelType
      levelIndex
      levelTime
      smallBlind
      bigBlind
      ante
      tournamentId
    }
  }
}
`;
export const createLevel = `mutation CreateLevel($input: CreateLevelInput!) {
  createLevel(input: $input) {
    id
    index
    levelType
    levelIndex
    levelTime
    smallBlind
    bigBlind
    ante
    tournamentId
  }
}
`;
export const updateLevel = `mutation UpdateLevel($input: UpdateLevelInput!) {
  updateLevel(input: $input) {
    id
    index
    levelType
    levelIndex
    levelTime
    smallBlind
    bigBlind
    ante
    tournamentId
  }
}
`;
export const deleteLevel = `mutation DeleteLevel($input: DeleteLevelInput!) {
  deleteLevel(input: $input) {
    id
    index
    levelType
    levelIndex
    levelTime
    smallBlind
    bigBlind
    ante
    tournamentId
  }
}
`;
export const createActiveTournament = `mutation CreateActiveTournament($input: CreateActiveTournamentInput!) {
  createActiveTournament(input: $input) {
    id
    tournamentId
    state
    numberOfEntrants
    numberOfPlayersRemaining
    numberOfRebuys
    currentLevelIndex
  }
}
`;
export const updateActiveTournament = `mutation UpdateActiveTournament($input: UpdateActiveTournamentInput!) {
  updateActiveTournament(input: $input) {
    id
    tournamentId
    state
    numberOfEntrants
    numberOfPlayersRemaining
    numberOfRebuys
    currentLevelIndex
  }
}
`;
export const deleteActiveTournament = `mutation DeleteActiveTournament($input: DeleteActiveTournamentInput!) {
  deleteActiveTournament(input: $input) {
    id
    tournamentId
    state
    numberOfEntrants
    numberOfPlayersRemaining
    numberOfRebuys
    currentLevelIndex
  }
}
`;
