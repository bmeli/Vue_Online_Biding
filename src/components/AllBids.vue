<template>
  <div class="form-container">
    <div class="tabs-container">
      <md-tabs md-sync-route md-alignment="centered">
        <md-tab id="tab-1" md-label="lot1">
          <LotBidsTable :bids="sortedLot1Bids" :lotName="lots[0]" />
        </md-tab>

        <md-tab id="tab-2" md-label="lot2">
          <LotBidsTable :bids="sortedLot2Bids" :lotName="lots[1]" />
        </md-tab>

        <md-tab id="tab-3" md-label="lots3">
          <LotBidsTable :bids="sortedLot3Bids" :lotName="lots[2]" />
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>
import LotBidsTable from "./LotBidsTable"
const fb = require('../firebaseConfig.js')

export default {
  name: 'AllBids',
  components: {
    LotBidsTable,
  },
  data() {
    return {
      lots: [
        "Lot1",
        "Lot2",
        "Lot3"
      ],
      lot1Bids: [],
      lot2Bids: [],
      lot3Bids: [],
    }
  },
  created() {
    this.getBidsByLotName("Lot1")
    this.getBidsByLotName("Lot2")
    this.getBidsByLotName("Lot3")
  },
  computed: {
    sortedLot1Bids () {
      return this.lot1Bids.sort(this.sortBidsAsc)
    },
    sortedLot2Bids () {
      return this.lot2Bids.sort(this.sortBidsAsc)
    },
    sortedLot3Bids () {
      return this.lot3Bids.sort(this.sortBidsAsc)
    }
  },
  methods: {
    getBidsByLotName: function(lot) {
      fb.db.collection(lot).get()
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          const bid = {
            id: doc.id,
            name: doc.data().name,
            amount: doc.data().amount,
          }
          switch(lot) {
            case "Lot1":
              this.lot1Bids.push(bid)
              break;
            case "Lot2":
              this.lot2Bids.push(bid)
              break;
            case "Lot3":
              this.lot3Bids.push(bid)
              break;
          }
        });
      })
    },
    sortBidsAsc: function (a, b) {
      if (parseInt(a.amount) < parseInt(b.amount))
        return 1;
      if (parseInt(a.amount) > parseInt(b.amount))
        return -1
      return 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .tabs-container {
    width: 800px;
    margin-top: 80px
  }
</style>
