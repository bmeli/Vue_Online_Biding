<template>
  <div>
    <md-table>
      <md-table-toolbar>
        <h1 class="lot-title">{{ lotName }}</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head class="label">Name</md-table-head>
        <md-table-head class="label">Amount</md-table-head>
      </md-table-row>
      <md-table-row v-for="(bid,index) in bids" :key="bid.id">
        <md-table-cell :class="index == 0 ? 'top-bidder' : ''">
          <md-icon v-if="index == 0" class="top-bidder-icon">star</md-icon>
          {{ bid.name }}
        </md-table-cell>
        <md-table-cell :class="index == 0 ? 'top-bidder' : ''">{{ bid.amount }}$</md-table-cell>
        <md-table-cell >
          <md-button class="md-icon-button" @click="deleteClicked(bid)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-snackbar :md-position="position" :md-active.sync="showSnackbar" md-persistent>
      <span>{{ snackbarMsg }}</span>
      <md-button class="md-primary" @click="showSnackbar = false">Dismiss</md-button>
    </md-snackbar>
  </div>
</template>

<script>
  const fb = require('../firebaseConfig.js')

  export default {
    name: "LotBidsTable",
    props: {
      bids: {
        type: Array,
        required: true,
        default: function () {
          return []
        }
      },
      lotName: {
        type: String,
        required: true,
        default: ''
      }
    },
    data () {
      return {
        position: 'left',
        showSnackbar: false,
        snackbarMsg: '',
      }
    },
    methods: {
      deleteClicked: function (bid) {
        fb.db.collection(this.lotName).doc(bid.id).delete().then(() => {
          this.snackbarMsg = bid.name + "'s bid successfully deleted!"
        }).catch((error) => {
            this.snackbarMsg = "Error deleting bid!"
        });
        this.bids.splice(this.bids.indexOf(bid), 1);
        this.showSnackbar = true
      }
    }
  }
</script>

<style scoped>
  .lot-title {
    margin-left: 88%;
    padding-right: 30px;
  }
  .label {
    text-align: center;
  }
  .delete-icon:hover {
    cursor: pointer;
  }
  .top-bidder-icon {
    position: relative;
    bottom: 3px;
    right: 20px;
    color: gold !important
  }
  .top-bidder {
    color: #2c86f4;
  }
</style>
