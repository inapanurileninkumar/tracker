<template>
  <div class="nav row pl-20 align-center justify-between">
    <a class="text-white">Fin Man</a>
    <datepicker v-model="selectedMonth" calendar-class="date-picker-calendar" input-class="date-picker"
      name="uniquename" format="MMM yyyy"></datepicker>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'AppNav',
  components: {
    Datepicker
  },
  computed: {
    ...mapGetters('configuration', ['currentMonth']),
    formattedCurrentMonth () {
      return new Date(this.currentMonth).toDateString()
    },
    selectedMonth: {
      get () {
        return this.currentMonth
      },
      set (value) {
        this.setCurrentMonth(value)
      }
    }
  },
  methods: {
    ...mapMutations('configuration', ['SET_ACCOUNT_BALANCE']),
    ...mapActions('configuration', ['setCurrentMonth']),
    toggleDatePicker () {
      this.showDatePicker = !this.showDatePicker
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
.nav {
    background-color: $primary;
    height: 60px;
    position: fixed;
    top:0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    z-index: 99999;
}
</style>
