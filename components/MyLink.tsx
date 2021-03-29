import { Link } from '@chakra-ui/react'
import React from 'react'

type MyLinkProps = {
  href: string
}

export const MyLink: React.FC<MyLinkProps> = ({ children, href }) => (
  <Link
    fontWeight='normal'
    fontSize='md'
    color='pink.50'
    _hover={{
      color: 'pink.200',
    }}
    variant='link'
    isExternal
    href={href}
  >
    {children}
  </Link>
)
