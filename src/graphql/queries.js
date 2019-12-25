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
