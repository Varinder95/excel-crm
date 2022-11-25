<template>
    <div class="d-flex flex-nowrap overflow-hidden">
        <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 280px;">
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
              <li class="nav-item">
                <a id="dash" class="nav-link link-dark active" @click="TabToggle(1)">
                  <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
                  Dashboard
                </a>
              </li>
              <li>
                <a id="uploadTab" class="nav-link link-dark" @click="TabToggle(2)">
                  <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"></use></svg>
                  Upload Excel
                </a>
              </li>
              <li>
                <a id="dataTab" class="nav-link link-dark" @click="TabToggle(3)">
                  <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#grid"></use></svg>
                  Show Data
                </a>
              </li>
              <li>
                <a id="usersTab" class="nav-link link-dark" @click="TabToggle(4)">
                  <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle"></use></svg>
                  Show Users
                </a>
              </li>
            </ul>
            <hr>
            <div class="dropdown">
              <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <strong>{{username}}</strong>
              </a>
              <ul class="dropdown-menu text-small shadow" style="">
                <li><a class="dropdown-item" href="#">Sign out</a></li>
              </ul>
            </div>
        </div>
        <div class="d-flex flex-column p-3">
          <div v-if="dashboard">
            <h2 class="text-wrap"> Welcome {{username}}</h2>
            <p>Select what you need</p>
          </div>
          <div v-if="uploads">
            <uploads></uploads>
          </div>
          <div v-if="dbData">
            <dbData></dbData>
          </div>
          <div v-if="dbUsers">
            <dbUsers></dbUsers>
          </div>
        </div>
    </div>
</template>
<script>
import dbData from '~/components/dbData'
import uploads from '~/components/uploads'
import dbUsers from '~/components/dbUsers'

export default {
  components:{dbData, uploads, dbUsers},
  data() {
    return {
      username: '',
      dashboard: true,
      uploads: false,
      dbUsers: false,
      dbData: false,
    }
  },
  mounted() {
    this.username = this.storage();
  },
  methods:{
    storage(){
      return localStorage.getItem("UserName");
    },
    TabToggle (tab) {
      var tabID = tab
      if (tabID == 1) {
        this.dashboard = true
        this.uploads = false
        this.dbUsers = false
        this.dbData = false
        document.getElementById('uploadTab').classList.remove("active")
        document.getElementById('dataTab').classList.remove("active")
        document.getElementById('usersTab').classList.remove("active")
        document.getElementById('dash').classList.add("active")
      }
      else  if (tabID == 2) {
        this.dashboard = false
        this.uploads = true
        this.dbUsers = false
        this.dbData = false
        document.getElementById('dash').classList.remove("active")
        document.getElementById('dataTab').classList.remove("active")
        document.getElementById('usersTab').classList.remove("active")
        document.getElementById('uploadTab').classList.add("active")
      }
      else  if (tabID == 3) {
        this.dashboard = false
        this.uploads = false
        this.dbUsers = false
        this.dbData = true
        document.getElementById('dash').classList.remove("active")
        document.getElementById('usersTab').classList.remove("active")
        document.getElementById('uploadTab').classList.remove("active")
        document.getElementById('dataTab').classList.add("active")
      }
      else  if (tabID == 4) {
        this.dashboard = false
        this.uploads = false
        this.dbUsers = true
        this.dbData = false
        document.getElementById('dash').classList.remove("active")
        document.getElementById('dataTab').classList.remove("active")
        document.getElementById('uploadTab').classList.remove("active")
        document.getElementById('usersTab').classList.add("active")
      }
    }
  }
}
</script>
<style scoped>
.nav-link {
  cursor: pointer;
}
</style>
