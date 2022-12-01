<template>
  <div class="overflow-auto">
    <div class="d-flex mx-4">
      <h2 class="text-wrap"> Business Listing</h2>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
    <p class="mt-3">Current Page: {{ currentPage }}</p>
    <b-table striped hover :items="getData" :per-page="perPage" :current-page="currentPage"></b-table>
  </div>
</template>
  
<script>
import gql from 'graphql-tag'

const getData = gql`
  
query GetData {
  getData {
    _id
    Business
    Address_1
    Address_2
    Address_3
    County
    Region
    Postcode
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
  name: 'dbData',
    data() {
      return {
        getData:'',
        perPage: 10,
        currentPage: 1,
      }
    },
    apollo: {
        getData: {
            query: getData,
            prefetch: true,
        },
    },
    methods:{
      saveTableData() {
        return this.getData
      }
    },
    mounted() {
      this.tableData = this.saveTableData()
    },
    computed: {
      rows() {
        return this.getData.length
      }
    }
}
</script>