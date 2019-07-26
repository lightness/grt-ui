<template>
  <div class="q-pa-md">
    <q-table
      title="Packages"
      :data="packages"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import _ from 'lodash';

export default {
  name: 'PackagesTable',
  computed: {
    ...mapState({
      packages: state => state.package.packages,
    }),
    columns() {
      const columns = this.packages.map(pkg => Object.keys(pkg));
      const uniqColumns = _.uniq(_.flatten(columns));

      return uniqColumns.map(uColumn => ({
        name: uColumn,
        label: uColumn,
        sortable: true,
        align: 'left',
        field: uColumn,
        format: (item) => {
          if (Array.isArray(item)) {
            return item.join('\n');
          }

          return item;
        },
        __index: undefined,
      }));
    },
  },
};
</script>

<style>
  .q-pa-md {
    width: 100%;
  }
</style>
