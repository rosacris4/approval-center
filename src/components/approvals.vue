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
        :rows="pendingItems"
        :columns="columns"
      >
        <template #id-data="{ row }">
          <input 
            type="checkbox" 
            :checked="isSelected(row.id)"
            @change="toggleSelect(row.id)"
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
            color="green"
            variant="outline"
            size="sm"
            @click="approveItem(row.id)"
          >
            Aprovar
          </UButton>
        </template>
      </UTable>
    </div>

    <!-- Modal de Confirmação -->
    <UModal v-model="isBulkApproveModalOpen">
      <UCard>
        <template #header>
          Confirmar Aprovação em Massa
        </template>

        <p>Deseja aprovar {{ selectedItems.length }} itens selecionados?</p>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton 
              color="gray" 
              variant="ghost" 
              @click="isBulkApproveModalOpen = false"
            >
              Cancelar
            </UButton>
            <UButton 
              color="primary" 
              @click="bulkApprove"
            >
              Confirmar
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { useApprovalStore } from '~/stores/approvalStore'

const approvalStore = useApprovalStore()

// Carrega os itens quando o componente é montado
onMounted(() => {
  approvalStore.fetchItems()
})

// Colunas da tabela
const columns = [
  { key: 'id', label: 'Selecionar' },
  { key: 'name', label: 'Nome' },
  { key: 'type', label: 'Tipo' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Ações' }
]

// Estado do modal
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
/* Estilos adicionais podem ser adicionados aqui */
</style> 