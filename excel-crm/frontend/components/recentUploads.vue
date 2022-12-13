<template>
    <div>
      <b-card-group columns>
        <b-card title="Title" header-tag="header" footer-tag="footer"  v-for="data in getUploads" :key="data">
          <template #header>
            <h6 class="mb-0">File Name : {{data.FileName}}</h6>
          </template>
          <b-card-text>{{data.UploadName}}.</b-card-text>
          <p>Uploaded by : {{data.UploadedBy}}</p>
          <b-button href="#" variant="primary">Assign</b-button>
          <template #footer>
            <em>Number of Entries : {{data.NoOfEntries}}</em>
          </template>
        </b-card>
      </b-card-group>
    </div>
</template>
<script>
import gql from 'graphql-tag'

const getUploads = gql`
  
query GetUploads {
  getUploads {
    UploadName
    FileName
    NoOfEntries
    UploadedBy

  }
}
`;
export default {
  name: 'recentUploads',
  data() {
    return {
    }
  },
  apollo: {
    getUploads: {
      query: getUploads,
      prefetch: true,
    },
  },
}
</script>
