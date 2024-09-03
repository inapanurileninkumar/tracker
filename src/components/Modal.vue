<template>
    <div class="modal row justify-center align-start">
        <!-- <div class="modal-background"></div> -->
        <div class="modal-card bg-white">
            <header class="modal-card-head row justify-between">
                <span class="modal-card-title">{{ title }}</span>
                <span class="delete pointer-cursor" @click="closeModal">X</span>
            </header>
            <section class="modal-card-body">
                <slot></slot>
            </section>
            <footer class="modal-card-foot">
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
  name: 'AppModal',
  props: ['title'],
  methods: {
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
.modal {
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left:0;
    z-index: 99999;

    .modal-card{
        padding: 40px;
        margin-top: 90px;
        width: 300px;
    }
}
</style>
