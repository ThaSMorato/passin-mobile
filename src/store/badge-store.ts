import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface BadgeStore {
  id: string
  name: string
  email: string
  eventTitle: string
  checkInURL: string
  image?: string
}

interface StateProps {
  data: BadgeStore | null
  save: (badge: BadgeStore) => void
  remove: () => void
  updateAvatar: (imageUri: string) => void
}

export const useBadgeStore = create(
  persist<StateProps>(
    (set) => ({
      data: null,
      save: (badge) => set(() => ({ data: badge })),
      remove: () => set(() => ({ data: null })),
      updateAvatar: (imageUri) =>
        set(({ data }) => ({
          data: data
            ? {
                ...data,
                image: imageUri,
              }
            : data,
        })),
    }),
    {
      name: 'nlw-unite:badge',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
