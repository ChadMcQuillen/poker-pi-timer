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
export const onCreateLevel = `subscription OnCreateLevel(
  $id: ID
  $index: Int
  $levelType: String
  $levelIndex: Int
  $levelTime: Int
) {
  onCreateLevel(
    id: $id
    index: $index
    levelType: $levelType
    levelIndex: $levelIndex
    levelTime: $levelTime
  ) {
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
export const onUpdateLevel = `subscription OnUpdateLevel(
  $id: ID
  $index: Int
  $levelType: String
  $levelIndex: Int
  $levelTime: Int
) {
  onUpdateLevel(
    id: $id
    index: $index
    levelType: $levelType
    levelIndex: $levelIndex
    levelTime: $levelTime
  ) {
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
export const onDeleteLevel = `subscription OnDeleteLevel(
  $id: ID
  $index: Int
  $levelType: String
  $levelIndex: Int
  $levelTime: Int
) {
  onDeleteLevel(
    id: $id
    index: $index
    levelType: $levelType
    levelIndex: $levelIndex
    levelTime: $levelTime
  ) {
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
