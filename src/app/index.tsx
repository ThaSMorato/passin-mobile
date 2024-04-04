import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link, Redirect } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, StatusBar, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { api } from '@/server/api'
import { BadgeStore, useBadgeStore } from '@/store/badge-store'
import { colors } from '@/styles/colors'

interface BadgeResponseData {
  badge: BadgeStore
}

export default function Home() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const badgeStore = useBadgeStore()

  const handleAccessCredential = async () => {
    try {
      setIsLoading(true)

      if (!code.trim()) {
        return Alert.alert('Ingresso', 'Informe o código do ingresso')
      }

      const { data } = await api.get<BadgeResponseData>(
        `/attendees/${code}/badge`,
      )

      badgeStore.save(data.badge)
    } catch (error) {
      Alert.alert('Ingresso', 'Ingresso nao encontrado')
    } finally {
      setIsLoading(false)
    }
  }

  if (badgeStore.data?.checkInURL) {
    return <Redirect href="/ticket" />
  }

  return (
    <View className="flex-1 bg-green-500 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />
      <Image
        alt="Logo"
        source={require('@/assets/logo.png')}
        className="h-16"
        resizeMode="contain"
      />
      <View className="w-full mt-12 gap-3">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="Código do ingresso"
            onChangeText={setCode}
          />
        </Input>
        <Button
          title="Acessar credencial"
          onPress={handleAccessCredential}
          isLoading={isLoading}
        />
        <Link
          href="/register"
          className="text-gray-100 text-base text-center font-bold mt-8 "
        >
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  )
}
