import { colors } from "@/styles/colors"
import { ReactNode } from "react"
import { TextInput, View, TextInputProps } from "react-native"

interface InputProps {
  children: ReactNode
}

const Input = ({children}: InputProps) => {
  return (
    <View className="w-full h-14 items-center flex-row gap-3 p-3 border border-green-400 rounded-lg">
      { children }
    </View>
  )
}

const Field = (props: TextInputProps) => {
  return (
    <TextInput
      className="flex-1 text-white text-base font-regular"
      placeholderTextColor={colors.gray[200]}
      {...props}
    />
  )
}

Input.Field = Field

export { Input }
