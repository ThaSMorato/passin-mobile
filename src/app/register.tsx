import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, StatusBar, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { api, EVENT_ID } from '@/server/api'
import { BadgeStore, useBadgeStore } from '@/store/badge-store'
import { colors } from '@/styles/colors'

interface BadgeResponseData {
  badge: BadgeStore
}

export default function Register() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const badgeStore = useBadgeStore()

  const handleAccessRegister = async () => {
    try {
      setIsLoading(true)

      if (!name.trim() || !email.trim()) {
        return Alert.alert('Inscrição', 'Preencha todos os campos')
      }

      const registerResponse = await api.post<{ attendeeId: string }>(
        `/events/${EVENT_ID}/attendees`,
        {
          email,
          name,
        },
      )

      if (registerResponse.status === 201) {
        const code = registerResponse.data.attendeeId

        const { data } = await api.get<BadgeResponseData>(
          `/attendees/${code}/badge`,
        )

        badgeStore.save(data.badge)

        Alert.alert('Inscrição', 'Inscrição realizada com sucesso!', [
          { text: 'OK', onPress: () => router.push('/ticket') },
        ])
      }
    } catch (error) {
      console.log(error)

      if (axios.isAxiosError(error)) {
        if (error.response?.data.errors[0].details) {
          return Alert.alert(
            'Inscrição',
            error.response?.data.errors[0].details,
          )
        }
      }

      Alert.alert('Inscrição', 'Nao foi possivel fazer a inscricao')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-green-500 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />
      <Image
        alt="none"
        source={require('@/assets/logo.png')}
        className="h-16"
        resizeMode="contain"
      />
      <View className="w-full mt-12 gap-3">
        <Input>
          <FontAwesome6
            name="user-circle"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field placeholder="Nome completo" onChangeText={setName} />
        </Input>
        <Input>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </Input>
        <Button
          title="Realizar inscrição"
          onPress={handleAccessRegister}
          isLoading={isLoading}
        />
        <Link
          href="/"
          className="text-gray-100 text-base text-center font-bold mt-8 "
        >
          {' '}
          Já possui ingresso?
        </Link>
      </View>
    </View>
  )
}
