<template>
  <div class="list-wrapper">
    <q-list
      no-border
    >
      <q-item
        v-if="users.length > 15"
      >
        <q-search v-model="filterTerm" />
      </q-item>
      <q-item
        v-for="user in activeUsers"
        :key="user.id"
        link
        highlight
        :to="{name: 'user', params: { userId: user.id }}"
      >
        <q-item-side>
          <ProfilePicture
            :key="user.id"
            :user="user"
            :size="30"
            class="profilePic"
          />
        </q-item-side>
        <q-item-main>
          <q-item-tile label>
            {{ user.displayName }}
          </q-item-tile>
          <q-item-tile sublabel>
            <i18n
              path="GROUP.JOINED"
            >
              <DateAsWords
                place="relativeDate"
                style="display: inline"
                :date="user.membershipInCurrentGroup.createdAt"
              />
            </i18n>
            <template v-if="user.membershipInCurrentGroup.addedBy">
              ·
              <i18n
                path="GROUP.ADDED_BY"
              >
                <router-link
                  place="userName"
                  :to="{name: 'user', params: { userId: user.membershipInCurrentGroup.addedBy.id }}"
                >
                  {{ user.membershipInCurrentGroup.addedBy.displayName }}
                </router-link>
              </i18n>
            </template>
          </q-item-tile>
        </q-item-main>
      </q-item>
      <q-item-separator />
      <q-collapsible
        v-if="inactiveUsers.length > 0"
        icon="fas fa-bed"
        :label="$t('GROUP.INACTIVE')"
        :sublabel="inactiveSublabel"
        @show="showInactive = true"
        @hide="showInactive = false"
      >
        <template v-if="showInactive">
          <q-item
            v-for="user in inactiveUsers"
            :key="user.id"
            link
            highlight
            :to="{name: 'user', params: { userId: user.id }}"
            class="inactive"
          >
            <q-item-side>
              <ProfilePicture
                :key="user.id"
                :user="user"
                :size="30"
                class="profilePic"
              />
            </q-item-side>
            <q-item-main>
              <q-item-tile label>
                {{ user.displayName }}
              </q-item-tile>
            </q-item-main>
          </q-item>
        </template>
      </q-collapsible>
    </q-list>
  </div>
</template>

<script>
import {
  QList,
  QItemSeparator,
  QItem,
  QItemMain,
  QItemTile,
  QItemSide,
  QCollapsible,
  QSearch,
} from 'quasar'

import ProfilePicture from './ProfilePicture'
import DateAsWords from '@/components/General/DateAsWords'

export default {
  components: {
    ProfilePicture,
    DateAsWords,
    QList,
    QItemSeparator,
    QItem,
    QItemMain,
    QItemTile,
    QItemSide,
    QCollapsible,
    QSearch,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
    sorting: {
      type: String,
      default: 'joinDate',
    },
  },
  data () {
    return {
      showInactive: false,
      filterTerm: '',
    }
  },
  methods: {
    sort (list) {
      const getJoinDate = a => a.membershipInCurrentGroup.createdAt
      const sortByJoinDate = (a, b) => getJoinDate(b) - getJoinDate(a)
      const sortByName = (a, b) => a.displayName.localeCompare(b.displayName)
      return list.slice().sort(this.sorting === 'joinDate' ? sortByJoinDate : sortByName)
    },
    filterByTerms (list) {
      if (!this.filterTerm || this.filterTerm === '') return list
      return list.filter(u => u.displayName.toLowerCase().includes(this.filterTerm.toLowerCase()))
    },
  },
  computed: {
    inactiveSublabel () {
      return this.inactiveUsers.length + ' ' + this.$tc('JOINGROUP.NUM_MEMBERS', this.inactiveUsers.length)
    },
    activeUsers () {
      return this.sort(this.filterByTerms(this.users.filter(u => u.membershipInCurrentGroup.active)))
    },
    inactiveUsers () {
      return this.sort(this.filterByTerms(this.users.filter(u => !u.membershipInCurrentGroup.active)))
    },
  },
}
</script>

<style scoped lang="stylus">
.list-wrapper
  .profilePic
    margin-right .5em
.inactive
  opacity 0.5
.q-item-sublabel > span
  font-weight initial
</style>
