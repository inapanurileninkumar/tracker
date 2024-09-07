<template>
  <div class="pl-10 pr-10">
    <expenses />
    <div class="row justify-between pb-20 mt-20">
      <div class="col-md-6 col-sm-12 col-xs-12 pr-10 card">
        <div class="header">
          <div class="title">SETTLEMENTS</div>
        </div>
        <div class="body">
          <settlements />
        </div>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12 card">
        <div class="header">
          <div class="title">EMIs</div>
        </div>
        <div class="body">
          <EMIs />
        </div>
      </div>
    </div>
    <div class="row jusity-between mb-20">
      <div class="col-md-6 col-sm-12 col-xs-12 card">
        <div class="header">
          <div class="title">MONTHLY EXPENSES</div>
        </div>
        <div class="body">
          <monthly-expenses />
        </div>
      </div>
    </div>
    <div class="row jusity-between mb-20">
      <div class="col-md-12 col-sm-12 col-xs-12 card">
        <div class="header">
          <div class="title">INCOME & TAX CALCULATOR</div>
        </div>
        <div class="body">
          <tax-calculator />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Expenses from '@/views/Expenses.vue'
import Settlements from '@/views/Settlements.vue'
import EMIs from '@/views/EMIs.vue'
import MonthlyExpenses from '@/views/MonthlyExpenses.vue'
import TaxCalculator from '@/components/TaxCalculator.vue'

export default {
  name: 'HomeView',
  components: {
    EMIs,
    Expenses,
    Settlements,
    MonthlyExpenses,
    TaxCalculator
  },
  data () {
    return {
      showModal: false,
      modalType: 'add-settlement',
      modalTitle: ''
    }
  }
}
</script>
