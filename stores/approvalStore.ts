// stores/approvalStore.ts
import { defineStore } from 'pinia'

export const useApprovalStore = defineStore('approval', {
  state: () => ({
    items: [] as ApprovalItem[],
    selectedItems: [] as number[],
  }),
  actions: {
    async fetchItems() {
      // Simulando dados da API
      this.items = [
        { id: 1, name: 'Item 1', type: 'Documento', status: 'PENDING' },
        { id: 2, name: 'Item 2', type: 'Imagem', status: 'PENDING' },
        { id: 3, name: 'Item 3', type: 'Vídeo', status: 'PENDING' },
        { id: 4, name: 'Item 4', type: 'Documento', status: 'PENDING' },
        { id: 5, name: 'Item 5', type: 'Áudio', status: 'PENDING' },
      ]
    },
    approveItem(id: number) {
      const item = this.items.find(item => item.id === id)
      if (item) {
        item.status = 'APPROVED'
      }
    },
    approveSelected() {
      this.selectedItems.forEach(id => {
        this.approveItem(id)
      })
      this.selectedItems = []
    },
    toggleSelectItem(id: number) {
      const index = this.selectedItems.indexOf(id)
      if (index === -1) {
        this.selectedItems.push(id)
      } else {
        this.selectedItems.splice(index, 1)
      }
    },
    isSelected(id: number) {
      return this.selectedItems.includes(id)
    }
  },
  // persist: {
  //   storage: persistedState.localStorage,
  // },
})

export interface ApprovalItem{
  id: number
  name: string
  type: string
  status: 'PENDING' | 'APPROVED'
}