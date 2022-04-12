import { Container } from '@chakra-ui/react'
import React from 'react'

export const PageView: React.FC = ({ children }) => (
  <Container
    pt='4'
    pb='4'
    pl='2'
    pr='2'
    maxW={{ base: 'container.sm', md: 'container.md', lg: 'container.md' }}
  >
    {children}
  </Container>
)
