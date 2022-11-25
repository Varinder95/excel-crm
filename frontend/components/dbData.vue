<template>
    <div class="overflow-auto">
      <b-table striped hover :items="getData"></b-table>
    </div>
</template>
  
<script>
import gql from 'graphql-tag'

const getData = gql`
  
query GetData {
  getData {
    _id
    Business
    Address
    Supplier
    Decision_Maker
    Telephone_1
    Telephone_2
    PC
    MTC
    LLF
    MPRN
    MPAN
    EAC
    CED
  }
}
`;
export default {
    data() {
      return {}
    },
    apollo: {
        getData: {
            query: getData,
            prefetch: true,
        },
    },
}
</script>