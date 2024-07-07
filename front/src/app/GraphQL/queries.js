import { gql } from "graphql-tag";

const mainQuery = gql`query {
  categories {name id }
  products { id name inStock brand gallery { image_url }
    category_id prices { symbol amount currency } } } `;

const productById = gql` query getProductById($id: String!) {
  product(id: $id) {id name description inStock gallery { image_url }
    brand attributes { attribute_name attribute_value attribute_display }
    category_id prices { symbol amount currency } }
}`;

export const CREATE_ORDER = gql`
  mutation createOrders($options: [OptionsInput]!) {
    createOrders(options: $options) { product_id options quantity } } `;

const queries = {
  productById,
  mainQuery
};

export default queries;
