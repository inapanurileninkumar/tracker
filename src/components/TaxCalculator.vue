<template>
  <div class="home pt-10">
    <div class="row align-center justify-center">
      <input type="text" v-model.number="grossIncome" class="p-10">
    </div>
    <div class="row justify-center mt-20 align-center" style="gap:10px;">
      <button @click="grossIncome = grossIncome - 50000">- 50K</button>
      <button @click="grossIncome = grossIncome - 100000">- 1 Lakh</button>
      <button @click="grossIncome = grossIncome + 50000">+ 50K</button>
      <button @click="grossIncome = grossIncome + 100000">+ 1 Lakh</button>
      &nbsp;|&nbsp;
      <button :class="is12PercentBasicEPF?'active':'inactive'" @click="is12PercentBasicEPF=true">12% basic EPF</button>
      <button :class="is12PercentBasicEPF?'inactive':'active'" @click="is12PercentBasicEPF=false">1800 EPF</button>
      &nbsp;|&nbsp;
      <button :class="isTDSDeducted?'active':'inactive'" @click="isTDSDeducted=true">TDS</button>
      <button :class="isTDSDeducted?'inactive':'active'" @click="isTDSDeducted=false">No TDS</button>
    </div>
    <div class="row align-start justify-center mt-10">
      <table class="table col-md-6 col-sm-12">
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Tax</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(slabTax, index) in slabTaxes" :key="slabTax.name">
            <td>{{ index + 1 }}</td>
            <td>{{ slabTax.slabName }}</td>
            <td>{{ slabTax.tax | formatNumber }}</td>
          </tr>
        </tbody>
      </table>
      <table class="table col-md-6 col-sm-12">
        <thead>
          <tr>
            <th>Title</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gross Salary</td>
            <td>{{ (this.grossIncome) | formatNumber }}</td>
          </tr>
          <tr>
            <td>Taxable Salary</td>
            <td>{{ (this.taxableIncome) | formatNumber }}</td>
          </tr>
          <tr>
            <td>Income Tax</td>
            <td>{{ (IncomeTax) | formatNumber }}</td>
          </tr>
          <tr>
            <td>EPF</td>
            <td>{{ (EPFContribution) | formatNumber }}</td>
          </tr>
          <tr>
            <td>NPS</td>
            <td>{{ (NPSContribution) | formatNumber }}</td>
          </tr>
          <tr>
            <td>Profession Tax</td>
            <td>{{ (ProfessionTax) | formatNumber }}</td>
          </tr>
          <tr>
            <td>In Hand Salary</td>
            <td>{{ (InHandSalary) | formatNumber }}</td>
          </tr>
          <tr>
            <td>Monthly Salary</td>
            <td>{{ (InHandSalary/12) | formatNumber }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  },
  data () {
    return {
      grossIncome: 2150000,
      slabTaxes: [],
      is12PercentBasicEPF: true,
      isTDSDeducted: true,
      taxSlabs: [
        {
          maxSalary: Infinity,
          minSalary: 1500000,
          taxPercent: 30,
          name: 'Above 15 Lakh'
        },
        {
          maxSalary: 1500000,
          minSalary: 1200000,
          taxPercent: 20,
          name: '12 - 15 Lakh'
        },
        {
          maxSalary: 1200000,
          minSalary: 1000000,
          taxPercent: 15,
          name: '10 - 12 Lakh'
        },
        {
          maxSalary: 1000000,
          minSalary: 700000,
          taxPercent: 10,
          name: '7 - 10 Lakh'
        },
        {
          maxSalary: 700000,
          minSalary: 300000,
          taxPercent: 5,
          name: '3 - 7 Lakh'
        },
        {
          maxSalary: 300000,
          minSalary: -1,
          taxPercent: 0,
          name: '0 - 3 Lakh'
        }
      ]
    }
  },
  computed: {
    taxableIncome () {
      if (!this.grossIncome) return 0
      return this.grossIncome > 75000 ? this.grossIncome - 75000 : this.grossIncome
    },
    EPFContribution () {
      return this.is12PercentBasicEPF ? (((this.grossIncome / 100) * 36 / 100) * 12) : (3600 * 12)
    },
    NPSContribution () {
      return 12 * 1500
    },
    ProfessionTax () {
      return 12 * 200
    },
    IncomeTax () {
      return this.isTDSDeducted ? (this.slabTaxes.length ? this.slabTaxes[this.slabTaxes.length - 1].tax : 0) : 0
    },
    InHandSalary () {
      return this.grossIncome - this.IncomeTax - this.EPFContribution - this.NPSContribution - this.ProfessionTax
    }
  },
  watch: {
    taxableIncome: {
      immediate: true,
      handler () {
        this.calculateTaxSlabs()
      }
    }
  },
  methods: {
    calculateTaxSlabs () {
      const maxSlabIndex = this.taxSlabs.findIndex(slab => (this.taxableIncome > slab.minSalary) && (this.taxableIncome <= slab.maxSalary))
      let salary = this.taxableIncome
      const slabTaxes = [
        /*
        {
          tax : 0,
          taxPercent : 0,
          slabName : 0-3,
          salary: 0,
        }
        */
      ]
      for (let slabIndex = maxSlabIndex; slabIndex < this.taxSlabs.length; slabIndex++) {
        const currentSlab = this.taxSlabs[slabIndex]
        const slabSalary = salary - currentSlab.minSalary
        salary -= slabSalary
        slabTaxes.push({
          slabName: currentSlab.name,
          taxPercent: currentSlab.taxPercent,
          salary: slabSalary,
          tax: slabSalary * currentSlab.taxPercent / 100
        })
      }
      slabTaxes.reverse()
      slabTaxes.push({
        slabName: 'Total Tax',
        salary: this.taxableIncome,
        tax: slabTaxes.reduce((totalTax, slab) => totalTax + slab.tax, 0)
      })
      this.slabTaxes = slabTaxes
    }
  }
}
</script>
<style lang="scss" scoped>
input{
  border:1px solid lightgray;
  font-size: 20px;
  border-radius: 4px;
  letter-spacing: 1px;

  &:focus{
    outline: none;
  }
}
table{

  &, & tr, & tr td, & tr th{
    border-collapse: collapse;
      border: 1px solid rgb(0, 201, 228);
  }

  thead{
    background-color: rgb(0, 201, 228);
    color: white;
  }

  td, th{
    padding: 10px;
  }

  tbody tr:nth-child(even){
    background-color: whitesmoke;
  }
}
button{
  background-color:rgb(12, 124, 124);
  border:none;
  color:white;
  padding:10px 20px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;

  &.inactive{
    background-color: white;
    color:rgb(12, 124, 124);
    border:2px solid rgb(12, 124, 124);
    font-weight: bold;
  }
}
</style>
