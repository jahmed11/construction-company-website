/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBuilding = /* GraphQL */ `
  mutation CreateBuilding(
    $input: CreateBuildingInput!
    $condition: ModelBuildingConditionInput
  ) {
    createBuilding(input: $input, condition: $condition) {
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
export const updateBuilding = /* GraphQL */ `
  mutation UpdateBuilding(
    $input: UpdateBuildingInput!
    $condition: ModelBuildingConditionInput
  ) {
    updateBuilding(input: $input, condition: $condition) {
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
export const deleteBuilding = /* GraphQL */ `
  mutation DeleteBuilding(
    $input: DeleteBuildingInput!
    $condition: ModelBuildingConditionInput
  ) {
    deleteBuilding(input: $input, condition: $condition) {
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
export const createImage = /* GraphQL */ `
  mutation CreateImage(
    $input: CreateImageInput!
    $condition: ModelImageConditionInput
  ) {
    createImage(input: $input, condition: $condition) {
      id
      buildingID
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateImage = /* GraphQL */ `
  mutation UpdateImage(
    $input: UpdateImageInput!
    $condition: ModelImageConditionInput
  ) {
    updateImage(input: $input, condition: $condition) {
      id
      buildingID
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteImage = /* GraphQL */ `
  mutation DeleteImage(
    $input: DeleteImageInput!
    $condition: ModelImageConditionInput
  ) {
    deleteImage(input: $input, condition: $condition) {
      id
      buildingID
      image
      createdAt
      updatedAt
    }
  }
`;
export const createWebsite = /* GraphQL */ `
  mutation CreateWebsite(
    $input: CreateWebsiteInput!
    $condition: ModelWebsiteConditionInput
  ) {
    createWebsite(input: $input, condition: $condition) {
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
export const updateWebsite = /* GraphQL */ `
  mutation UpdateWebsite(
    $input: UpdateWebsiteInput!
    $condition: ModelWebsiteConditionInput
  ) {
    updateWebsite(input: $input, condition: $condition) {
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
export const deleteWebsite = /* GraphQL */ `
  mutation DeleteWebsite(
    $input: DeleteWebsiteInput!
    $condition: ModelWebsiteConditionInput
  ) {
    deleteWebsite(input: $input, condition: $condition) {
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
