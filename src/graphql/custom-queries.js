export const listBuildings = /* GraphQL */ `
  query ListBuildings(
    $filter: ModelBuildingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBuildings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        price
        description
        beds
        bath
        garage
        livingSpace
        totalSpace
        status
        shortAddress
        city
        state
        zipCode
        lng
        lat
        floorPlanImage
        frontViewImage
        images {
          items {
            image
            id
            buildingID
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
