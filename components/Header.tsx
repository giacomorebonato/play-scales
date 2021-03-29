import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { MyLink } from './MyLink'

export const Header: React.FC = () => (
  <Flex
    as='header'
    flexDirection={{
      base: 'column',
      md: 'row',
    }}
    alignItems='center'
    mb='4'
  >
    <Text fontWeight='bold' fontSize='2xl' as='h1' color='pink.300' flex='1'>
      Play scales
    </Text>

    <Box
      fontSize={{
        base: 'sm',
        md: 'normal',
      }}
    >
      <MyLink href='https://github.com/giacomorebonato/play-scales'>
        GitHub
      </MyLink>{' '}
      | <MyLink href='http://giacomorebonato.com/'>Giacomo Rebonato</MyLink>
    </Box>
  </Flex>
)
