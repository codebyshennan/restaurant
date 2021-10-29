import { Heading, HStack, VStack, Image, AspectRatio, Text, Divider, Stack, Button } from '@chakra-ui/react'
import { useColorModeValue, useColorMode } from '@chakra-ui/color-mode'

const Cart = () => {
  const { toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50')
  const secondaryTextColor = useColorModeValue('gray.600','gray.400')

  return (
    <VStack w="full" h="full" p={10} spacing={6} align="flex-start" bg={bgColor}>
      <Button onClick={toggleColorMode} variant="link" colorScheme="black"> Change Theme </Button>
      <VStack alignItems="flex-start" spacing={3}>
        <Heading size="2xl">Your Cart</Heading>
      </VStack>


      <HStack spacing={6} alignItems="center" w="full">
        <AspectRatio ratio={1} w="24">
          {/* populate with image */}
        </AspectRatio>
        <Stack spacing={0} w="full" direction={row} justifyContent="space-between" alignItems="center">
          <VStack w="full" spacing={0} alignItems="flex-start">
            <Heading size="md">
              {/* item name */}
            </Heading>
            <Text color={secondaryTextColor}>
              {/* item PID */}
            </Text>
          </VStack>
          <Heading size="sm" textAlign="end">
            {/* price */}
          </Heading>
        </Stack>
      </HStack>

      <VStack spacing={4} alignItems="stretch" w="full">
        <HStack justifyContent="space-between">
          <Text color={secondaryTextColor}>
            Subtotal
          </Text>
          <Heading size="sm">
            {/* subtotal price */}
          </Heading>
        </HStack>
      </VStack>


    </VStack>

  )
}


export default Cart