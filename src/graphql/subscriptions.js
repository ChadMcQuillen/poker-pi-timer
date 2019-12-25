/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTournament = `subscription OnCreateTournament(
  $id: ID
  $title: String
  $description: String
  $buyIn: Int
  $rebuyAmount: Int
) {
  onCreateTournament(
    id: $id
    title: $title
    description: $description
    buyIn: $buyIn
    rebuyAmount: $rebuyAmount
  ) {
    id
    title
    description
    buyIn
    rebuyAmount
    rebuyThroughLevel
  }
}
`;
export const onUpdateTournament = `subscription OnUpdateTournament(
  $id: ID
  $title: String
  $description: String
  $buyIn: Int
  $rebuyAmount: Int
) {
  onUpdateTournament(
    id: $id
    title: $title
    description: $description
    buyIn: $buyIn
    rebuyAmount: $rebuyAmount
  ) {
    id
    title
    description
    buyIn
    rebuyAmount
    rebuyThroughLevel
  }
}
`;
export const onDeleteTournament = `subscription OnDeleteTournament(
  $id: ID
  $title: String
  $description: String
  $buyIn: Int
  $rebuyAmount: Int
) {
  onDeleteTournament(
    id: $id
    title: $title
    description: $description
    buyIn: $buyIn
    rebuyAmount: $rebuyAmount
  ) {
    id
    title
    description
    buyIn
    rebuyAmount
    rebuyThroughLevel
  }
}
`;
