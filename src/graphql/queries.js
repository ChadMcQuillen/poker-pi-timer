/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTournament = `query GetTournament($id: ID!) {
  getTournament(id: $id) {
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
export const listTournaments = `query ListTournaments(
  $filter: TableTournamentFilterInput
  $limit: Int
  $nextToken: String
) {
  listTournaments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      buyIn
      rebuyAmount
      rebuyThroughLevel
    }
    nextToken
  }
}
`;
export const getLevel = `query GetLevel($id: ID!) {
  getLevel(id: $id) {
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
export const listLevels = `query ListLevels(
  $filter: TableLevelFilterInput
  $limit: Int
  $nextToken: String
) {
  listLevels(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const queryLevelsByTournamentIdIndex = `query QueryLevelsByTournamentIdIndex(
  $tournamentId: ID!
  $first: Int
  $after: String
) {
  queryLevelsByTournamentIdIndex(
    tournamentId: $tournamentId
    first: $first
    after: $after
  ) {
    items {
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
    nextToken
  }
}
`;
export const getActiveTournament = `query GetActiveTournament($id: ID!) {
  getActiveTournament(id: $id) {
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
export const listActiveTournaments = `query ListActiveTournaments(
  $filter: TableActiveTournamentFilterInput
  $limit: Int
  $nextToken: String
) {
  listActiveTournaments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      tournamentId
      state
      numberOfEntrants
      numberOfPlayersRemaining
      numberOfRebuys
      currentLevelIndex
    }
    nextToken
  }
}
`;
