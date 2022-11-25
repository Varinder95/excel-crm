<template>
    <div class="overflow-auto">
      <b-table striped hover :items="users"></b-table>
    </div>
</template>
  
<script>
import gql from 'graphql-tag'

const getUser = gql`
  
query Users {
  users {
    _id
    name
    email
  }
}
`;
export default {
    data() {
        return {
        }
    },
    apollo: {
        users: {
            query: getUser,
            prefetch: true,
        },
    }
}
</script>