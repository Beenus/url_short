<template>
  <div class="wrapper">
    <v-snackbar v-model="showTip" color="#000" top>
      URL copied to clipboard
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="showTip = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <div class="content">
      <h1>URL Shortener</h1>
      <div class="form" v-if="!this.newUrl">
        <v-text-field :rules="[rules.required, rules.email]" placeholder="Your link (http://... or https://...)"
                      v-model="originalUrl"/>
        <v-btn @click="loadData" :loading="isLoading">Generate</v-btn>
      </div>

      <div class="result" v-else>
        <div class="result-wrapper">
          <v-text-field @click="copyUrl" :value="fullUrl" solo readonly/>
          <v-icon size="30" class="copy-icon" @click="copyUrl">{{ icons.mdiContentCopy }}</v-icon>
        </div>
        <nuxt-link to="/" @click.native="reset">Generate new link</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { isValidURL } from '../utils/validation'
import { mdiContentCopy } from '@mdi/js'

export default {
  data () {
    return {
      icons: {
        mdiContentCopy,
      },
      originalUrl: null,
      newUrl: null,
      isLoading: false,
      isError: false,
      showTip: false
    }
  },
  methods: {
    async loadData () {
      if (this.isValid) {
        this.isError = false
        this.isLoading = true
        this.newUrl = await this.$store.dispatch('createUrl', this.originalUrl)
        this.isLoading = false
      } else {
        this.isError = true
      }
    },
    copyUrl () {
      this.showTip = true
      navigator.clipboard.writeText(this.fullUrl)
    },
    reset () {
      this.originalUrl = null
      this.newUrl = null
      this.showTip = false
    }
  },
  computed: {
    isValid () {
      return isValidURL(this.originalUrl)
    },
    rules () {
      return {
        required: value => !!value || 'Required.',
        email: value => isValidURL(value) || 'Invalid url.'
      }
    },
    fullUrl () {
      return `https://${this.$store.state.host}/s/${this.newUrl.shortUrl}`
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 15px;

  .content {
    display: flex;
    justify-content: center;
    flex-flow: column;
    width: 100%;
    max-width: 500px;

    h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    .form {
      display: flex;
      justify-content: center;
      flex-flow: column;
    }

    .result {
      &-wrapper {
        display: flex;
      }

      .copy-icon {
        margin: 10px 0 0 10px;
      }
    }
  }
}
</style>
