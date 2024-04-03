/* eslint-disable camelcase */
import '@/styles/global.css'

import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { Slot } from 'expo-router'

import { Loading } from '@/components/loading'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return <Slot />
}
