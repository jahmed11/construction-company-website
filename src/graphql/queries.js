/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBuilding = /* GraphQL */ `
  query GetBuilding($id: ID!) {
    getBuilding(id: $id) {
      id
      price
      description
      beds
      bath
      garage
      livingSpace
      totalSpace
      status
      floorPlanImage
      frontViewImage
      shortAddress
      city
      state
      zipCode
      lng
      lat
      images {
        items {
          id
          buildingID
          image
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
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
        floorPlanImage
        frontViewImage
        shortAddress
        city
        state
        zipCode
        lng
        lat
        images {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
      id
      buildingID
      image
      createdAt
      updatedAt
    }
  }
`;
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        buildingID
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWebsite = /* GraphQL */ `
  query GetWebsite($id: ID!) {
    getWebsite(id: $id) {
      id
      title
      email
      number
      footerTitle
      videoUrl
      createdAt
      updatedAt
    }
  }
`;
export const listWebsites = /* GraphQL */ `
  query ListWebsites(
    $filter: ModelWebsiteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWebsites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        email
        number
        footerTitle
        videoUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
