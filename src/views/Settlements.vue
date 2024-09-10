<template>
  <table class="settlements">
    <thead>
      <tr>
        <th>Sn</th>
        <th>Name</th>
        <th>Amount</th>
        <th>Month</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(settlement, index) in sortedSettlements">
        <tr :key="settlement.id" :class="{ 'active': isActiveSettlement(settlement) }">
          <td>{{ index + 1 }}</td>
          <td>{{ settlement.name }}</td>
          <td>{{ settlement.amount | formatNumber }}</td>
          <td>{{ settlement.month | formatDate }}</td>
          <td>
            <span class="fas fa-pen fs-sm ml-5 pointer-cursor" @click="handleEditSettlement(settlement.id)"></span>
            <app-popper
              trigger="clickToOpen"
              :options="{
                placement: 'top',
              }">
              <div class="popper">
                <div class="p-10">Delete ?</div>
                <button @click="handleDeleteSettlement(settlement.id)">Yes</button>
              </div>
              <span class="far fa-trash-alt fs-sm ml-10 pointer-cursor" slot="reference"></span>
            </app-popper>
          </td>
        </tr>
      </template>
      <tr v-if="showAddSettlement">
        <td>
          {{ settlements.length + 1 }}
        </td>
        <td>
          <input type="text" style="text-transform: uppercase;" v-model.trim="newSettlement.name" />
        </td>
        <td>
          <input type="number" style="width:80px" v-model.number="newSettlement.amount" />
        </td>
        <td>
          <datepicker input-class="new-settlement-date-picker" calendar-class="new-settlement-date-picker"
            format="MMM yyyy" v-model="newSettlement.month" />
        </td>
        <td>
          <div class="row">
            <i class="fas fa-check pointer-cursor text-secondary hover-text-success"
              @click="handleAddSettlement(newSettlement)"></i>
            <i class="fas fa-times pointer-cursor text-secondary hover-text-black"
              @click="showAddSettlement = false"></i>
          </div>
        </td>
      </tr>
      <tr v-else>
        <td colspan="5" class="pl-0 pr-0 pb-0 pt-20">
          <div class="row justify-center bg-primary text-white pt-5 pb-5 pointer-cursor"
            @click="showAddSettlement = true">
            <a>NEW</a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'AppSettlements',
  components: {
    Datepicker
  },
  data () {
    return {
      showAddSettlement: false,
      newSettlement: {
        name: '',
        month: new Date(),
        amount: 0
      }
    }
  },
  computed: {
    ...mapGetters('settlements', ['settlements']),
    ...mapGetters('configuration', ['currentMonth']),
    sortedSettlements () {
      return [...this.settlements].sort((a, b) => a.month - b.month)
    }
  },
  methods: {
    ...mapActions('settlements', ['addSettlement']),
    ...mapMutations('settlements', ['REMOVE_SETTLEMENT']),
    handleEditSettlement (settlement) {
      console.log(settlement)
    },
    handleDeleteSettlement (settlement) {
      this.REMOVE_SETTLEMENT(settlement)
      // console.log(settlement)
    },
    isActiveSettlement (settlement) {
      return settlement.month === this.currentMonth
    },
    handleAddSettlement () {
      if (!(
        this.newSettlement.name &&
        this.newSettlement.amount &&
        this.newSettlement.month
      )) return
      this.addSettlement(this.newSettlement)
    }
  }
}
</script>
<style lang="scss" >
.new-settlement-date-picker{
  width: 80px;
}
</style>
