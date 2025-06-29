<template>

  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Central de Aprovações</h1>
    
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold">Itens Pendentes</h2>
      <UButton
        color="primary"
        :disabled="selectedItems.length === 0"
        @click="openBulkApproveModal"
      >
        Aprovar Selecionados ({{ selectedItems.length }})
      </UButton>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <UTable
        :columns="columns"
        :data="pendingItems"
        class=" table-auto w-5 text-md border border-gray-50 rounded-md shadow divide-y divide-gray-50"
  >
        <template #id-data="{ row }">
          <input 
            type="checkbox" 
            :checked="isSelected(parseInt(row.id))"
            @change="toggleSelect(parseInt(row.id))"
            class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
        </template>

        <template #status-data="{ row }">
          <UBadge 
            :label="row.status" 
            :color="row.status === 'APPROVED' ? 'green' : 'gray'" 
          />
        </template>

        <template #actions-data="{ row }">
          <UButton
            v-if="row.status === 'PENDING'"
            color="primary"
            variant="outline"
            size="sm"
            @click="approveItem(parseInt(row.id))"
          >
            Aprovar
          </UButton>
        </template>
      </UTable>
    </div>

    <!-- Modal de Confirmação -->

  </div>
</template>

<script setup lang="ts">
import { useApprovalStore } from '~/stores/approvalStore'
import { h, resolveComponent, onMounted, computed} from 'vue'
import type { TableColumn } from '@nuxt/ui'
const approvalStore = useApprovalStore()

type ApprovalItem={
  id: number
  name: string
  type: string
  status: 'PENDING' | 'APPROVED'
}
// Carrega os itens quando o componente é montado
onMounted(() => {
  approvalStore.fetchItems()
})
const UBadge = resolveComponent('UBadge')
// Estado do modal

const columns: TableColumn<ApprovalItem>[] = [
  {
    accessorKey: 'id',
    header: '#',
   
  },
  {
    accessorKey: 'name',
    header: 'Nome'
  },
  {
    accessorKey: 'type',
    header: 'Tipo'
  },
  {
  accessorKey: 'status',
  header: 'Status',
  
},
  {
    accessorKey: 'actions',
    header: 'Ações',
    
  },
  ]
const isBulkApproveModalOpen = ref(false)

// Computed properties
const pendingItems = computed(() => approvalStore.items)
const selectedItems = computed(() => approvalStore.selectedItems)

// Métodos
const toggleSelect = (id: number) => {
  approvalStore.toggleSelectItem(id)
}

const isSelected = (id: number) => {
  return approvalStore.isSelected(id)
}

const approveItem = (id: number) => {
  approvalStore.approveItem(id)
}

const openBulkApproveModal = () => {
  if (selectedItems.value.length > 0) {
    isBulkApproveModalOpen.value = true
  }
}

const bulkApprove = () => {
  approvalStore.approveSelected()
  isBulkApproveModalOpen.value = false
}
</script>

<style scoped>


</style> 