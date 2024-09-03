<template>
    <div class="row">
        <div class="col-12 mt-20">
            <div class="form-group">
                <div>
                    <label for="name">Name</label>
                </div>
                <input v-model="newEmi.name" type="text" class="form-control" id="name" placeholder="Name">
            </div>
        </div>
        <div class="col-12 mt-20">
            <div class="form-group">
                <div>
                    <label for="date">Start Month</label>
                </div>
                <datepicker v-model="newEmi.startDate" class="row" input-class="date-picker date-picker-form" @selected="handleSelectedMonth"/>
            </div>
        </div>
        <div class="col-12 mt-20">
            <div class="form-group">
                <div>
                    <label for="date">End Month</label>
                </div>
                <datepicker v-model="newEmi.endDate" class="row" input-class="date-picker date-picker-form" @selected="handleSelectedMonth"/>
            </div>
        </div>
        <div class="col-12 mt-20">
            <div class="form-group">
                <div>
                    <label for="amount">Amount</label>
                </div>
                <input v-model="newEmi.amount" type="number" class="form-control" id="amount"
                    placeholder="Amount">
            </div>
        </div>
        <!-- submit -->
        <div class="col-12 mt-20">
            <button class="submit-btn bg-primary text-white width-100 pt-10 pb-10 pointer-cursor" @click="handleAddEmi">Submit</button>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { mapActions } from 'vuex'

export default {
  name: 'AddSettlementForm',
  components: {
    Datepicker
  },
  data () {
    return {
      newEmi: {
        name: '',
        startDate: new Date(),
        endDate: new Date(),
        amount: 0
      }
    }
  },
  methods: {
    ...mapActions('emis', ['addEmi']),
    handleAddEmi () {
      this.addEmi(this.newEmi)
      this.$emit('close')
    },
    handleSelectedMonth (date) {
      date.setDate(1)
    }
  }
}
</script>
<style lang="scss" scoped>
.form-group {
    width: 100%;

    label {
        font-weight: bold;
        font-size: 12px;
        margin-bottom: 5px;
    }

    input {
        border: none;
        width: 100%; border-bottom: 1px solid lightgray;
        font-size: 15px;
        font-weight: bold;
        text-transform: uppercase;

        &:focus {
            outline: none;
        }
    }
}

.submit-btn {
    border: none;

    &:hover {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
}
</style>
<style lang="scss">
.date-picker-form {
    color: black !important;
    width: 100%;
    border-bottom: 1px dashed black !important;
}
</style>
