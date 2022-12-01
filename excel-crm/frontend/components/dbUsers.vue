<template>
    <div class="overflow-auto">
      <div class="d-flex mx-4">
        <h2 class="text-wrap"> User Listing</h2>
      </div>
      <b-table striped hover :items="getUsers"></b-table>
    </div>
</template>
  
<script>
import gql from 'graphql-tag'

const getUser = gql`
  
query GetUsers {
  getUsers {
    _id
    name
    email
  }
}
`;
export default {
  name: 'dbUsers',
    data() {
        return {
        }
    },
    apollo: {
        getUsers: {
            query: getUser,
            prefetch: true,
        },
    }
}
</script>