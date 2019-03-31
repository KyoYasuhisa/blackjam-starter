<template>
  <section class="navigation">
    <nav id="l-nav">
      <DocGroup v-for="docGroup in docGroups"
                :key="docGroup.sys.id"
                :docGroup="docGroup"
                :docs="docs" />
    </nav>
    <nav id="s-nav">
      <div  v-if="isOpen"
           class="nav-btn"
           @click="toggleMenu">
        <fa-layers full-width class="fa-2x icon">
          <fa :icon="faTimes"/>
        </fa-layers>
      </div>
      <DocGroup v-for="docGroup in docGroups"
                :key="docGroup.sys.id"
                :docGroup="docGroup"
                :docs="docs" />
    </nav>
    <div v-if="!isOpen"
         class="nav-btn open-btn"
         @click="toggleMenu">
      <fa-layers full-width class="fa-2x icon">
        <fa :icon="faBars"/>
      </fa-layers>
    </div>
  </section>
</template>

<script>
import DocGroup from '~/components/DocGroup.vue'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      isOpen: false
    }
  },
  props: ['docGroups','docs'],
  components: {
    DocGroup
  },
  computed: {
    faBars () {
      return faBars
    },
    faTimes () {
      return faTimes
    }
  },
  methods: {
    toggleMenu () {
      const nav = document.getElementById('s-nav')
      if (this.isOpen) {
        nav.style.display = 'none'
        this.isOpen = false
      } else {
        nav.style.display = 'block'
        this.isOpen = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#l-nav
  position fixed
  top 75px
  left 0
  bottom 0
  width 280px
  padding 20px 0
  overflow-y scroll
  h1
    font-size 1.2rem
  h2
    font-size 1rem
#s-nav
  display none
  position fixed
  top 0
  left 0
  bottom 0
  width 100% 
  padding 20px 0
  overflow-y scroll
  background rgba(255,255,255,.95)
  z-index 100
.nav-btn
  position fixed
  top 20px
  right 20px
  z-index 1000
  cursor pointer
.open-btn
  display none
@media (max-width: 768px)
  .open-btn
    display block
  #l-nav
    display none
  #s-nav
    display none
</style>


