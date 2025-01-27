import { gql } from "graphql-tag";

export const MAIN_QUERY = gql`
  query GetMainData {
    categories {
      id
      name
    }
    products {
      id
      name
      inStock
      brand
      category_id
      gallery {
        image_url
      }
      prices {
        symbol
        amount
        currency
      }
    }
  }
`;

export const PRODUCT_BY_ID = gql`
  query GetProductById($id: String!) {
    product(id: $id) {
      id
      name
      description
      inStock
      brand
      category_id
      gallery {
        image_url
      }
      attributes {
        attribute_name
        attribute_value
        attribute_display
      }
      prices {
        symbol
        amount
        currency
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrders($options: [OptionsInput]!) {
    createOrders(options: $options) {
      product_id
      options
      quantity
    }
  }
`;

export default {
  mainQuery: MAIN_QUERY,
  productById: PRODUCT_BY_ID,
  createOrder: CREATE_ORDER
};
