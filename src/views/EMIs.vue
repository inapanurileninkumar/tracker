<template>
  <table class="emis">
    <thead>
      <tr>
        <th>Sn</th>
        <th>Name</th>
        <th>Amount</th>
        <th>Start Month</th>
        <th>End Month</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(emi, index) in emis">
        <tr :key="emi.id" :class="{ 'active': isActiveEMI(emi) }">
          <td>{{ index + 1 }}</td>
          <td>{{ emi.name }}</td>
          <td>{{ emi.amount | formatNumber }}</td>
          <td>{{ emi.startDate | formatDate }}</td>
          <td>{{ emi.endDate | formatDate }}</td>
          <td>
            <span class="fas fa-pen fs-sm ml-5 pointer-cursor"></span>
            <app-popper
              trigger="clickToOpen"
              :options="{
                placement: 'top',
              }">
              <div class="popper">
                <div class="p-10">Delete ?</div>
                <button  @click="handleDeleteEMI(emi.id)">Yes</button>
              </div>
              <span class="far fa-trash-alt fs-sm ml-10 pointer-cursor"></span>
            <span class="far fa-trash-alt fs-sm ml-10 pointer-cursor" slot="reference"></span>
            </app-popper>
          </td>
        </tr>
      </template>
      <tr v-if="showAddEmi">
        <td>
          {{ emis.length + 1 }}
        </td>
        <td>
          <input type="text" style="width:110px;text-transform: uppercase;" v-model.trim="newEmi.name" />
        </td>
        <td>
          <input type="number" style="width:80px" v-model.number="newEmi.amount" />
        </td>
        <td>
          <datepicker input-class="new-settlement-date-picker" calendar-class="new-settlement-date-picker"
            format="MMM yyyy" v-model="newEmi.startDate" />
        </td>
        <td>
          <datepicker input-class="new-settlement-date-picker" calendar-class="new-settlement-date-picker"
            format="MMM yyyy" v-model="newEmi.endDate" />
        </td>
        <td>
          <div class="row">
            <i class="fas fa-check pointer-cursor text-secondary hover-text-success" @click="handleAddEmi(newEmi)"></i>
            <i class="fas fa-times pointer-cursor text-secondary hover-text-black" @click="showAddEmi = false"></i>
          </div>
        </td>
      </tr>
      <tr v-else>
        <td colspan="6" class="pl-0 pr-0 pb-0 pt-20">
          <div class="row justify-center bg-primary text-white pt-5 pb-5 pointer-cursor" @click="showAddEmi = true">
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
      showAddEmi: false,
      newEmi: {
        name: '',
        statDate: new Date(),
        endDate: new Date(),
        amount: 0
      }
    }
  },
  computed: {
    ...mapGetters('emis', ['emis']),
    ...mapGetters('configuration', ['currentMonth'])
  },
  methods: {
    ...mapActions('emis', ['addEmi']),
    ...mapMutations('emis', ['REMOVE_EMI']),
    isActiveEMI (emi) {
      return emi.startDate <= this.currentMonth && emi.endDate >= this.currentMonth
    },
    handleDeleteEMI (emi) {
      this.REMOVE_EMI(emi)
    },
    handleAddEmi () {
      if (!(
        this.newEmi.name &&
        this.newEmi.amount &&
        this.newEmi.startDate &&
        this.newEmi.endDate
      )) return
      this.addEmi(this.newEmi)
    }
  }
}
</script>
