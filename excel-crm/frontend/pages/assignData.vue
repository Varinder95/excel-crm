<template>
    <div class="wrapper">
        <!-- Page Content  -->
        <div id="content">

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">

                    <nuxt-link to="/Dashboard" id="sidebarCollapse" class="btn btn-primary">
                        <i class="fas fa-arrow-left"></i>
                        <span>Go Back</span>
                    </nuxt-link>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link" @click="logOut">Log Out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="d-flex flex-column p-3">
                <div>
                    <div class="d-flex mx-4 border-bottom border-primary">
                      <h2 class="text-wrap">File Data Listing</h2>
                    </div>
                    <div class="d-flex m-4">
                        <div class="d-block w-100">
                            <b-card title-tag="title" header-tag="header" footer-tag="footer">
                              <template #header>
                                <h6 class="mb-0"><span class="font-weight-bold">File Name :</span> {{fileDetails.FileName}}</h6>
                              </template>
                              <b-card-text><h2>{{fileDetails.UploadName}}</h2></b-card-text>
                              <p><span class="font-weight-bold">Uploaded by :</span> {{fileDetails.UploadedBy}}</p>
                              <p><span class="font-weight-bold">Uploaded on :</span> {{new Date(fileDetails.UploadedOn * 1000)}}</p>
                              <template #footer>
                                <em><span class="font-weight-bold">Number of Entries :</span> {{fileDetails.NoOfEntries}}</em>
                              </template>
                            </b-card>
                        </div>
                    </div>
                    <button type="button" id="sidebarCollapse" class="m-4 btn btn-primary" @click="fetchFileData">
                        <i class="fas fa-arrow-down"></i>
                        <span>Fetch File Data</span>
                    </button>
                    <div v-if="fetchedData">
                        <b-pagination responsive
                            v-model="currentPage"
                            :total-rows="rows"
                            :per-page="perPage"
                            aria-controls="my-table"
                        ></b-pagination>
                        <div class="d-flex w-100 justify-content-between p-4">
                        <div class="d-inline-flex w-50 justify-content-center">
                            <p class="mt-3">Current Page: {{ currentPage }}</p>
                        </div>
                        <div class="d-inline-flex w-50 justify-content-center">
                            <div class="d-flex w-75 justify-content-end">
                            <p class="mt-3 mr-4">Select No. Of Rows : </p>
                            </div>
                            <div class="d-block w-25">
                            <select placeholder="No. of Rows" v-model="NoOfRows" class="mt-3" id="RowCount" @change="ChangeNoRows">
                                <option value="10" selected>10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            </div>
                        </div>
                        </div>
                        <b-table responsive striped hover :fields="fields" :items="fileData.DataByFilename" :per-page="perPage" :current-page="currentPage">
                        <template #cell(index)="data">
                            {{ data.index + 1 }}
                        </template>
                        </b-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import dbData from '~/components/dbData'
import uploads from '~/components/uploads'
import dbUsers from '~/components/dbUsers'
import recentUploads from '~/components/recentUploads'
import gql from 'graphql-tag'

export default {
  components:{dbData, uploads, dbUsers, recentUploads},
  data() {
    return {
      fileDetails: '',
      fetchedData: false,
      fields: [
          // A virtual column that doesn't exist in items
          'index', 
	        'Business',
          { key: 'Address_1', label: 'Address 1' },
          { key: 'Address_2', label: 'Address 2' },
          { key: 'Address_3', label: 'Address 3' },
          'County',
          'Region',
          'Postcode',
          'Supplier',
          { key: 'Decision_Maker', label: 'Decision Maker' },
          { key: 'Telephone_1', label: 'Telephone 1' },
          { key: 'Telephone_2', label: 'Telephone 2' },
          'PC',
          'MTC',
          'LLF',
          'MPRN',
          'MPAN',
          'EAC',
          'CED',
          { key: 'UploadName', label: 'Upload Name' },
          { key: 'CreatedBy', label: 'Created By' }, 
          { key: 'FileName', label: 'File Name' }, 
          { key: 'createdAt', label: 'Created On' }, 
  
        ],
        fileData: '',
        NoOfRows: '',
        perPage: 10,
        currentPage: 1
    }
  },
  beforeMount() {
    this.fileDetails = this.getFileName();
  },
  methods:{
    getFileName(){
      return {
        FileName : localStorage.getItem("assignFileName"),
        UploadName : localStorage.getItem("assignUploadName"),
        NoOfEntries : localStorage.getItem("assignNoOfEntries"), 
        UploadedBy : localStorage.getItem("assignUploadedBy"), 
        UploadedOn : localStorage.getItem("assignUploadedOn")
      }
    },
    logOut(){
        localStorage.removeItem("assignFileName"); 
        localStorage.removeItem("assignUploadName"); 
        localStorage.removeItem("assignNoOfEntries"); 
        localStorage.removeItem("assignUploadedBy"); 
        localStorage.removeItem("assignUploadedOn");
        localStorage.removeItem("UserName"); 
        localStorage.removeItem("Email"); 
        localStorage.removeItem("token"); 
        this.$router.replace('/')
    },
    ChangeNoRows() {
      this.perPage = this.NoOfRows
    },
    async fetchFileData () {
        try {
            await this.$apollo.query({
                query: gql`
                    query DataByFilename ($FileName : String!) {
                        DataByFilename (FileName : $FileName) {
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
                        UploadName
                        CreatedBy
                        FileName
                        createdAt
                        }
                    }
                `,
                variables: { FileName : this.fileDetails.FileName }
            })
            .then((response) => {
            // save user token to localstorage
                this.fileData = response.data
                this.fetchedData = true
                console.log(response.data)
                
            })
            } catch (e) {
            this.signInError = e
            console.error(e)
            }
        },
  },
  computed: {
    rows() {
      return this.fileData.length
    }
  }
}
</script>
<style scoped>
.log-out {
    cursor: pointer;
}
.nav-link {
    color: white;
    cursor: pointer;
}
.nav-link.active {
    color: #067eff;
    background: #fff;
}
.wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
}

#sidebar {
    min-width: 250px;
    max-width: 250px;
    background: #067eff;
    color: #fff;
    transition: all 0.3s;
}

#sidebar.active {
    margin-left: -250px;
}

#sidebar .sidebar-header {
    padding: 20px;
    background: #067eff;
}

#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}

#sidebar ul li a:hover {
    color: #067eff;
    background: #fff;
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
    color: #fff;
    background: #067eff;
}

a[data-toggle="collapse"] {
    position: relative;
}

.dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}

ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #067eff;
}

ul.CTAs {
    padding: 20px;
}

ul.CTAs a {
    text-align: center;
    font-size: 0.9em !important;
    display: block;
    border-radius: 5px;
    margin-bottom: 5px;
}

a.download {
    background: #fff;
    color: #067eff;
}

a.article,
a.article:hover {
    background: #067eff !important;
    color: #fff !important;
}

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */

#content {
    width: 100%;
    padding: 20px;
    min-height: 100vh;
    transition: all 0.3s;
}

/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

@media (max-width: 768px) {
    #sidebar {
        margin-left: -250px;
    }
    #sidebar.active {
        margin-left: 0;
    }
    #sidebarCollapse span {
        display: none;
    }
}
</style>
