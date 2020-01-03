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
export const onCreateActiveTournament = `subscription OnCreateActiveTournament(
  $id: ID
  $tournamentId: ID
  $state: TournamentState
  $numberOfEntrants: Int
  $numberOfPlayersRemaining: Int
) {
  onCreateActiveTournament(
    id: $id
    tournamentId: $tournamentId
    state: $state
    numberOfEntrants: $numberOfEntrants
    numberOfPlayersRemaining: $numberOfPlayersRemaining
  ) {
    id
    tournamentId
    state
    numberOfEntrants
    numberOfPlayersRemaining
    numberOfRebuys
    currentLevelIndex
    payout1
    payout2
    payout3
    payout4
    payout5
    payout6
    payout7
    payout8
    payout9
  }
}
`;
export const onUpdateActiveTournament = `subscription OnUpdateActiveTournament($id: ID) {
  onUpdateActiveTournament(id: $id) {
    id
    tournamentId
    state
    numberOfEntrants
    numberOfPlayersRemaining
    numberOfRebuys
    currentLevelIndex
    payout1
    payout2
    payout3
    payout4
    payout5
    payout6
    payout7
    payout8
    payout9
  }
}
`;
export const onDeleteActiveTournament = `subscription OnDeleteActiveTournament(
  $id: ID
  $tournamentId: ID
  $state: TournamentState
  $numberOfEntrants: Int
  $numberOfPlayersRemaining: Int
) {
  onDeleteActiveTournament(
    id: $id
    tournamentId: $tournamentId
    state: $state
    numberOfEntrants: $numberOfEntrants
    numberOfPlayersRemaining: $numberOfPlayersRemaining
  ) {
    id
    tournamentId
    state
    numberOfEntrants
    numberOfPlayersRemaining
    numberOfRebuys
    currentLevelIndex
    payout1
    payout2
    payout3
    payout4
    payout5
    payout6
    payout7
    payout8
    payout9
  }
}
`;
