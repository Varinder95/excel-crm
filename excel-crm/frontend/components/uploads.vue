<template>
  <div class="d-flex flex-column p-3">
    <div v-if="fileUploaded">
      <div class="d-flex mx-4 border-bottom border-primary">
        <h2 class="text-wrap">File Uploaded Succesfully</h2>
      </div>
      <div class="d-block mt-4">
          <h4>Data succesfully saved in mongo db database.</h4>
      </div>
    </div>
    <div v-else>
      <div class="d-flex mx-4 border-bottom border-primary">
        <h2 class="text-wrap">Upload Excel</h2>
      </div>
      <div class="d-flex mt-4">
        <div class="pt-4">
            <input type="file" name="uploadfile" class="mx-4" accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' @change="uploadFile" ref="file">
            <b-button block variant="outline-primary" size="lg" class="m-4" @click="submitFile">Upload</b-button>
        </div> 
      </div>
    </div>
    <div v-if="uploadData" class="overflow-auto">
      <h4 class="my-4">Data Preview : </h4>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
      <p class="mt-3">Current Page: {{ currentPage }}</p>
      <b-table striped hover :items="uploadData" :per-page="perPage" :current-page="currentPage"></b-table>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default{
  name: 'uploads',
  data() {
    return {
        perPage: 10,
        currentPage: 1,
        userEmail: '',
        uploadData: null,
        xlFile: null,
        fileUploaded: false
    }
  },
  computed: {
    rows() {
      return this.uploadData.length
    }
  },
  mounted() {
    this.userEmail = this.storage();
  },
  methods:{
    storage(){
      return localStorage.getItem("Email");
    },
    uploadFile() {
      this.xlFile = this.$refs.file.files[0];
    },
    submitFile() {
      const formData = new FormData();
      formData.append('uploadfile', this.xlFile);
      const headers = { 'Content-Type': 'multipart/form-data' };
      axios.post('http://127.0.0.1:8000/uploadfile', formData, { headers }).then((res) => {          
        this.uploadData = res.data;
        this.fileUploaded = true;
      });
    }  
  }
}
</script>
