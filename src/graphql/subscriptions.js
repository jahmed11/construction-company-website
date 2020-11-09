/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBuilding = /* GraphQL */ `
  subscription OnCreateBuilding {
    onCreateBuilding {
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
export const onUpdateBuilding = /* GraphQL */ `
  subscription OnUpdateBuilding {
    onUpdateBuilding {
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
export const onDeleteBuilding = /* GraphQL */ `
  subscription OnDeleteBuilding {
    onDeleteBuilding {
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
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage {
    onCreateImage {
      id
      buildingID
      image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage {
    onUpdateImage {
      id
      buildingID
      image
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage {
    onDeleteImage {
      id
      buildingID
      image
      createdAt
      updatedAt
    }
  }
`;
export const onCreateWebsite = /* GraphQL */ `
  subscription OnCreateWebsite {
    onCreateWebsite {
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
export const onUpdateWebsite = /* GraphQL */ `
  subscription OnUpdateWebsite {
    onUpdateWebsite {
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
export const onDeleteWebsite = /* GraphQL */ `
  subscription OnDeleteWebsite {
    onDeleteWebsite {
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
