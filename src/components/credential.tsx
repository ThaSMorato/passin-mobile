import { Feather } from '@expo/vector-icons'
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { colors } from '@/styles/colors'

import { QRCode } from './qrcode'

interface CredentialProps {
  image?: string
  onChangeAvatar?: () => void
  onShowQRCode?: () => void
}

export const Credential = ({
  onChangeAvatar,
  onShowQRCode,
  image,
}: CredentialProps) => {
  return (
    <View className="w-full self-stretch items-center">
      <Image
        source={require('@/assets/ticket/band.png')}
        className="w-24 h-52 z-10"
        alt="teste"
      />
      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground
          source={require('@/assets/ticket/header.png')}
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">Unite Sumit</Text>
            <Text className="text-zinc-50 text-sm font-bold">#ww123</Text>
          </View>

          <View className="h-40 w-40 bg-black rounded-full" />
        </ImageBackground>

        {image ? (
          <TouchableOpacity activeOpacity={0.9} onPress={onChangeAvatar}>
            <Image
              source={{ uri: image }}
              alt="user image"
              className="w-36 h-36 rounded-full -mt-24"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center"
            onPress={onChangeAvatar}
          >
            <Feather name="camera" color={colors.green[400]} size={32} />
          </TouchableOpacity>
        )}

        <Text className="font-bold text-2xl text-zinc-50 mt-4">
          Thales Morato
        </Text>
        <Text className="font-regular text-base text-zinc-300 mb-4">
          tha.s.morato@gmail.com
        </Text>

        <QRCode value="teste" size={120} />

        <TouchableOpacity
          onPress={onShowQRCode}
          className="mt-6"
          activeOpacity={0.7}
        >
          <Text className="font-bold text-orange-500 text-sm">
            Ampliar QRCode
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
