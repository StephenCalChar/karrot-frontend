<template>
  <div class="wrapper row">
    <img
      v-for="(photoSrc, idx) in photosArray"
      :src="photoSrc"
      :key="idx"
    >
  </div>
</template>

<script>
import appleImg from 'assets/feedback/apple.png'
import appleGuyImg from 'assets/feedback/appleGuy.png'
import bagImg from 'assets/feedback/bag.png'
import flourImg from 'assets/feedback/flour.png'
import flourGuyImg from 'assets/feedback/flourGuy.png'
import milkImg from 'assets/feedback/milk.png'
import cartImg from 'assets/people/cart.png'

export default {
  data () {
    return {
      selectedValue: 3.0,
      appleImg,
    }
  },
  props: {
    amount: {
      default: null,
      type: Number,
    },
  },
  computed: {
    photosArray () {
      let amount = this.amount || 0
      let amountImages = []
      while (amount >= 0.15 && amountImages.length < 7) {
        if (amount >= 50.0) {
          amountImages.push(cartImg)
          amount -= 50.0
          continue
        }
        if (amount >= 6.0) {
          amountImages.push(bagImg)
          amount -= 6.0
          continue
        }
        if (amount >= 1.0 && Math.random() < 0.7) {
          amountImages.push(milkImg)
          amount -= 1.0
          continue
        }
        if (amount >= 0.5 && Math.random() < 0.9) {
          if (Math.random() > 0.9) {
            amountImages.push(flourGuyImg)
          }
          else {
            amountImages.push(flourImg)
          }
          amount -= 0.5
          continue
        }
        if (Math.random() > 0.9) {
          amountImages.push(appleGuyImg)
        }
        else {
          amountImages.push(appleImg)
        }
        amount -= 0.15
      }
      return amountImages
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~variables'
.wrapper
  .amount
    margin-right .6em
  img
    height 60px
</style>
