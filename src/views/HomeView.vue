<template>
  <div class="pl-10 pr-10">
    <expenses />
    <div class="row justify-between pb-20 mt-20">
      <div class="col-md-6 col-sm-12 col-xs-12 pr-10 card">
        <div class="header">
          <div class="title">SETTLEMENTS</div>
          <div class="actions">
            <button class="action" @click="handleAddSettlement">+ Add Settlement</button>
          </div>
        </div>
        <div class="body">
          <settlements />
        </div>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12 card">
        <div class="header">
          <div class="title">EMIs</div>
          <div class="actions">
            <button class="action" @click="handleAddEmi">+ Add EMI</button>
          </div>
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
    <app-modal :title="modalTitle" @close="closeModal" v-if="showModal">
      <add-settlement-form v-if="modalType === 'add-settlement'" @close="closeModal" />
      <add-emi-form v-if="modalType === 'add-emi'" @close="closeModal" />
    </app-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Expenses from '@/views/Expenses.vue'
import Settlements from '@/views/Settlements.vue'
import EMIs from '@/views/EMIs.vue'
import MonthlyExpenses from '@/views/MonthlyExpenses.vue'
import AppModal from '@/components/Modal.vue'
import AddSettlementForm from '@/components/AddSettlementForm.vue'
import AddEmiForm from '@/components/AddEmiForm.vue'

export default {
  name: 'HomeView',
  components: {
    EMIs,
    AppModal,
    Expenses,
    AddEmiForm,
    Settlements,
    MonthlyExpenses,
    AddSettlementForm
  },
  data () {
    return {
      showModal: false,
      modalType: 'add-settlement',
      modalTitle: ''
    }
  },
  computed: {
    ...mapGetters('emis', ['emis']),
    ...mapGetters('settlements', ['settlements'])
  },
  methods: {
    handleAddSettlement () {
      this.openModal('add-settlement', 'Add Settlement')
    },
    handleAddEmi () {
      this.openModal('add-emi', 'Add EMI')
    },
    // modal methods
    openModal (type, title) {
      this.showModal = true
      this.modalType = type
      this.modalTitle = title
    },
    closeModal () {
      this.showModal = false
    }
  }
}
</script>
